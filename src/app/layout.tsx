import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pillar 2 - Functional E-Commerce Dashboard",
  description: "Next.js App Router, Auth.js v5 Google OAuth, Zustand optimistic cart, and simulated checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} font-sans antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 flex flex-col" suppressHydrationWarning>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
