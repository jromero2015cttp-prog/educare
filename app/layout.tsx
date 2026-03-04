import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

function getMetadataBase() {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return new URL(`${protocol}://${host}`);
}

export const metadata: Metadata = {
  title: "Educare - AI-Powered Learning Platform",
  description: "Master new skills with self-paced courses and AI tutoring. Learn programming, marketing, data science, and more.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Educare - AI-Powered Learning Platform",
    description: "Master new skills with self-paced courses and AI tutoring.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
