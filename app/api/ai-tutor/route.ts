import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/lib/auth");

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
      con
