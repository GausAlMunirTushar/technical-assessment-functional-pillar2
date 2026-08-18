"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, type, className = "", disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={actualType}
            disabled={disabled}
            className={`w-full py-2.5 h-11 text-sm rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 placeholder:text-sm placeholder:tracking-wider focus:bg-white focus:outline-hidden focus:border-[#FD853A] focus:ring-2 focus:ring-[#FD853A]/20 transition-all ${
              icon ? "pl-11" : "px-4"
            } ${isPassword ? "pr-11" : "pr-4"} ${
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              className="absolute right-4 text-slate-400 hover:text-slate-600 flex items-center justify-center focus:outline-hidden transition-colors cursor-pointer disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              )}
            </button>
          )}
        </div>
        {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
