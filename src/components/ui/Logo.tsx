"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  animated = false,
  className = "",
}) => {
  const sizeMap = {
    sm: { circle: "w-8 h-8 text-xs", text: "text-base" },
    md: { circle: "w-10 h-10 text-sm", text: "text-lg" },
    lg: { circle: "w-14 h-14 text-xl", text: "text-2xl" },
    xl: { circle: "w-20 h-20 text-3xl", text: "text-4xl" },
  };

  const { circle, text } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Optional animated glow/ring for loading states */}
        {animated && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#FD853A]/30 animate-ping" />
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#FD853A] animate-spin duration-3000" />
          </>
        )}

        {/* Main Logo Circle */}
        <div
          className={`${circle} rounded-full bg-[#FD853A] flex items-center justify-center font-extrabold text-white tracking-tight shadow-md transition-transform duration-300 relative z-10`}
        >
          JC
        </div>
      </div>

      {showText && (
        <span className={`${text} font-extrabold tracking-wider text-slate-900`}>
          JCREA
        </span>
      )}
    </div>
  );
};
