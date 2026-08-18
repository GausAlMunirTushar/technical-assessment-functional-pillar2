import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center">
        {/* Brand Logo */}
        <Logo size="md" showText={false} />

        {/* 404 Header & Message */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#FD853A]">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/dashboard"
            className="w-full py-3 px-5 rounded-full bg-[#FD853A] hover:bg-[#FD853A]/90 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
          <Link
            href="/login"
            className="w-full py-3 px-5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
