import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { message, courseTitle, lessonTitle, lessonContent, history, imageBase64 } = body ?? {};

    if (!message && !imageBase64) {
      return new Response(JSON.stringify({ message: "Message or image is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const plainContent = (lessonContent ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const truncatedContent = plainContent.slice(0, 3000);

    const systemPrompt = `You are Maya, a friendly and expert AI tutor for Educare. You have a warm, encouraging personality and genuinely care about each student's success.

Course: ${courseTitle ?? "Unknown Course"}
Lesson: ${lessonTitle ?? "Unknown Lesson"}

Lesson Content Summary:
${truncatedContent}

LANGUAGE: Default is ENGLISH. Switch only if user requests or course is in another language.

MATHEMATICAL NOTATION:
ALL math expressions MUST use LaTeX with dollar signs:
- Inline: $expression$
- Display: $$expression$$

ALLOWED LaTeX: \\frac{a}{b}, \\sqrt{x}, x^{2}, x_{1}, \\alpha, \\beta, \\theta, \\pi, \\leq, \\geq, \\neq, \\approx, \\times, \\cdot, \\div, \\pm, \\sin, \\cos, \\tan, \\log, \\ln, \\downarrow, \\rightarrow

FORBIDDEN LaTeX (NEVER USE): \\boxed{}, \\text{}, \\mathrm{}

SOLUTION FORMAT - Always use this two-column table:

| Expression | Explanation |
|-----------|-------------|
| $$[original]$$ | Starting point |
| $$\\downarrow$$ | [Operation and WHY] |
| $$[result]$$ | [Explanation] |
| $$[final]$$ | ✅ Final Answer |

Always end with: "**Therefore, [restate problem] is [answer].**"
Always show fractions with decimals: $\\frac{3}{4}$ (0.75)

TEACHING: Be warm, encouraging. Introduce yourself as Maya in first message. Use table format for all solutions. Offer practice problems when student understands.`;

    // Build Anthropic messages
    const anthropicMessages: Array<{ role: "user" | "assistant"; content: unknown }> = [];

    if (history && Array.isArray(history)) {
      for (const m of history) {
        if (m?.role && m?.content) {
          anthropicMessages.push({ role: m.role, content: m.content });
        }
      }
    }

    if (imageBase64) {
      const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      const mediaType = matches?.[1] ?? "image/jpeg";
      const base64Data = matches?.[2] ?? imageBase64;

      anthropicMessages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Please analyze this image and help me understand it." },
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64Data } },
        ],
      });
    } else {
      anthropicMessages.push({ role: "user", content: message });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 2000,
        system: systemPrompt,
        messages: anthropicMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      return new Response(JSON.stringify({ message: "AI service error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Transform Anthropic SSE to OpenAI-compatible format for frontend
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        try {
          while (true) {
            const { done, value } = (await reader?.read()) ?? { done: true, value: undefined };
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter((l) => l.trim());

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
                    const openAIFormat = { choices: [{ delta: { content: parsed.delta.text } }] };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(openAIFormat)}\n\n`));
                  } else if (parsed.type === "message_stop") {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  }
                } catch { /* skip non-JSON */ }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI tutor error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
