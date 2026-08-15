import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pillar 2 — Functional E-Commerce Dashboard",
  description: "Next.js App Router, Auth.js v5 Google OAuth, Zustand optimistic cart, and simulated checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans antialiased`}>
      <body className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

