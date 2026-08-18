"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      icon,
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "w-full inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variantStyles = {
      primary: "bg-[#FD853A] hover:bg-[#FD853A]/90 text-white",
      secondary: "bg-slate-900 hover:bg-slate-800 text-white",
      outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    };

    const sizeStyles = {
      sm: "py-2 px-4 text-xs",
      md: "py-2.5 px-5 text-sm",
      lg: "py-3 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {icon && <span className="flex items-center justify-center text-lg">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
