"use client";

import React from "react";
import { Logo } from "@/components/ui/Logo";

interface GlobalLoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  message = "Loading...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen w-full" : "w-full py-16"
      } bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 selection:bg-[#FD853A] selection:text-white`}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Animated Brand Logo */}
        <Logo size="xl" showText={false} animated={true} />

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
            Welcome to <span className="text-[#FD853A]">JCREA</span>
          </h2>
          {message && (
            <p className="text-sm font-medium text-slate-500 animate-pulse">{message}</p>
          )}
        </div>

        {/* Progress Bar / Spinner line */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative mt-2">
          <div className="h-full bg-[#FD853A] rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
