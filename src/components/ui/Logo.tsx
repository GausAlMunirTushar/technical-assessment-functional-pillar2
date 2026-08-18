"use client";

import React from "react";
import Image from "next/image";

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
    sm: { circle: "w-8 h-8", text: "text-base", dimensions: 32 },
    md: { circle: "w-10 h-10", text: "text-lg", dimensions: 40 },
    lg: { circle: "w-14 h-14", text: "text-2xl", dimensions: 56 },
    xl: { circle: "w-20 h-20", text: "text-4xl", dimensions: 80 },
  };

  const { circle, text, dimensions } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {animated && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#FD853A]/30 animate-ping" />
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#FD853A] animate-spin duration-3000" />
          </>
        )}

        {/* Main Logo SVG Image */}
        <div className={`${circle} flex items-center justify-center transition-transform duration-300 relative z-10 overflow-hidden rounded-full`}>
          <Image
            src="/logo.svg"
            alt="JCREA Logo"
            width={dimensions}
            height={dimensions}
            className="w-full h-full object-contain"
            priority
          />
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
