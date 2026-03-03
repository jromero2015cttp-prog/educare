"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Send, Loader2, User, ImagePlus, Trash2, Sparkles } from "lucide-react";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

interface AIChatbotProps {
  courseTitle: string;
  lessonTitle: string;
  lessonContent: string;
  onClose: () => void;
}

// Render LaTeX math in a string
function renderLatex(text: string): string {
  if (!text) return "";
  
  let result = text;
  
  // Handle display math ($$...$$)
  result = result.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
    try {
      // Clean up the math - remove \boxed and \text commands that might slip through
      let cleanMath = math.trim()
        .replace(/\\boxed\{([^}]+)\}/g, '$1')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathrm\{([^}]+)\}/g, '$1');
      
      return katex.renderToString(cleanMath, {
        displayMode: true,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return match;
    }
  });
  
  // Handle inline math ($...$)
  result = result.replace(/(?<!\$)\$(?!\$)([^$\n]+)(?<!\$)\$(?!\$)/g, (match, math) => {
    try {
      // Clean up the math
      let cleanMath = math.trim()
        .replace(/\\boxed\{([^}]+)\}/g, '$1')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathrm\{([^}]+)\}/g, '$1');
      
      return katex.renderToString(cleanMath, {
        displayMode: false,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return match;
    }
  });
  
  return result;
}

// Parse and render markdown tables
function renderTable(tableText: string): string {
  const lines = tableText.trim().split('\n');
  if (lines.length < 2) return tableText;
  
  const rows = lines.filter(line => line.trim().startsWith('|'));
  if (rows.length < 2) return tableText;
  
  let html = '<table class="math-table"><thead><tr>';
  
  // Header row
  const headerCells = rows[0].split('|').filter(cell => cell.trim());
  headerCells.forEach(cell => {
    html += `<th>${renderLatex(cell.trim())}</th>`;
  });
  html += '</tr></thead><tbody>';
  
  // Skip separator row (index 1), process data rows
  for (let i = 2; i < rows.length; i++) {
    const cells = rows[i].split('|').filter(cell => cell.trim());
    if (cells.length > 0) {
      // Check if this is an arrow row (connector between steps)
      const firstCell = cells[0]?.trim() || '';
      const isArrowRow = firstCell.includes('\\downarrow') || firstCell.includes('\\Downarrow') || firstCell === '$$\\downarrow$$';
      
      html += `<tr class="${isArrowRow ? 'arrow-row' : ''}">`;
      cells.forEach((cell, idx) => {
        const cellClass = idx === 0 ? 'math-cell' : 'explanation-cell';
        html += `<td class="${cellClass}">${renderLatex(cell.trim())}</td>`;
      });
      html += '</tr>';
    }
  }
  
  html += '</tbody></table>';
  return html;
}

// Clean LaTeX commands that might not render
function cleanLatexText(text: string): string {
  return text
    .replace(/\\boxed\{([^}]+)\}/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1');
}

// Render LaTeX math expressions in text
function renderMathInText(text: string): string {
  if (!text) return "";
  
  let result = text;
  
  // First, clean any LaTeX commands that might appear outside of $ delimiters
  result = result.replace(/\\boxed\{([^}]+)\}/g, '$1');
  
  // Check if text contains a markdown table
  const tableRegex = /\|[^\n]+\|\n\|[-:\s|]+\|\n(\|[^\n]+\|\n?)+/g;
  result = result.replace(tableRegex, (match) => renderTable(match));
  
  // Handle display math ($$...$$) outside tables
  result = result.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
    try {
      const cleanMath = cleanLatexText(math.trim());
      const rendered = katex.renderToString(cleanMath, {
        displayMode: true,
        throwOnError: false,
        trust: true,
        strict: false,
      });
      return `<div class="katex-display-wrapper">${rendered}</div>`;
    } catch {
      return match;
    }
  });
  
  // Handle inline math ($...$)
  result = result.replace(/(?<!\$)\$(?!\$)([^$\n]+)(?<!\$)\$(?!\$)/g, (match, math) => {
    try {
      const cleanMath = cleanLatexText(math.trim());
      const rendered = katex.renderToString(cleanMath, {
        displayMode: false,
        throwOnError: false,
        trust: true,
        strict: false,
      });
      return rendered;
    } catch {
      return match;
    }
  });
  
  // Handle markdown-style bold (**text**)
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Handle markdown-style italic (*text*)
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  
  // Handle line breaks (but not inside tables)
  result = result.replace(/\n/g, '<br />');
  
  return result;
}

// Message content component with math rendering
function MessageContent({ content }: { content: string }) {
  const renderedContent = useMemo(() => renderMathInText(content), [content]);
  
  return (
    <div 
      className="message-content text-sm"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

export function AIChatbot({
  courseTitle,
  lessonTitle,
  lessonContent,
  onClose,
}: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size must be less than 10MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage;
    
    setInput("");
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const newUserMessage: ChatMessage = {
      role: "user",
      content: userMessage || (currentImage ? "Please analyze this image" : ""),
      imageUrl: currentImage || undefined,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage || "Please analyze this image and help me understand it in the context of this lesson.",
          courseTitle,
          lessonTitle,
          lessonContent,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          imageBase64: currentImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed?.choices?.[0]?.delta?.content ?? "";
                assistantMessage += content;

                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages.length > 0) {
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: assistantMessage,
                    };
                  }
                  return newMessages;
                });
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[700px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              👩‍🏫
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                Maya <Sparkles className="h-4 w-4 text-yellow-300" />
              </h3>
              <p className="text-sm text-white/80 truncate max-w-[200px]">Your AI Math Tutor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages?.length ?? 0) === 0 && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-4 text-4xl">
                👩‍🏫
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Hi! I&apos;m Maya 👋</h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto mb-4">
                I&apos;m your personal AI tutor. Ask me anything about <strong>{lessonTitle}</strong> - I&apos;ll explain it with clear steps and beautiful math notation!
              </p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm text-gray-600 mb-3">
                  I can help you with:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Solving equations step by step
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Analyzing photos of your work
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Explaining difficult concepts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Checking your answers
                  </li>
                </ul>
              </div>
            </div>
          )}

          {(messages ?? []).map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message?.role === "user" ? "justify-end" : ""}`}
            >
              {message?.role === "assistant" && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  👩‍🏫
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  message?.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
                }`}
              >
                {message?.imageUrl && (
                  <div className="mb-3 relative w-full max-w-[280px] aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={message.imageUrl}
                      alt="Uploaded image"
                      fill
                      className="object-contain bg-white"
                    />
                  </div>
                )}
                {message?.role === "user" ? (
                  <p className="whitespace-pre-wrap text-sm">{message?.content ?? ''}</p>
                ) : (
                  <MessageContent content={message?.content ?? ''} />
                )}
              </div>
              {message?.role === "user" && (
                <div className="flex-shrink-0 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (messages?.length ?? 0) > 0 && (messages?.[messages.length - 1]?.content ?? '').length === 0 && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                👩‍🏫
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-gray-500">Maya is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Image attached</p>
                <p className="text-xs text-gray-400">{imageFile?.name}</p>
              </div>
              <button
                onClick={removeImage}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
              disabled={isLoading}
              title="Upload an image (math problem, graph, diagram, etc.)"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedImage ? "Describe what you need help with..." : "Ask a question or upload an image..."}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Upload photos of math problems, handwritten work, graphs, or diagrams for help
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
