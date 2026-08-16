import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className = "", ...props }, ref) => {
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
            className={`w-full py-3 text-sm rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:border-[#FD853A] focus:ring-2 focus:ring-[#FD853A]/20 transition-all ${
              icon ? "pl-11 pr-4" : "px-4"
            } ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
