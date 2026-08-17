import React from "react";
import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 selection:bg-[#FD853A] selection:text-white">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Animated Brand Logo Circle */}
        <Logo size="xl" showText={false} animated={true} />

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
            Welcome to <span className="text-[#FD853A]">JCREA</span>
          </h2>
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Loading application resources...
          </p>
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative mt-2">
          <div className="h-full bg-[#FD853A] rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
