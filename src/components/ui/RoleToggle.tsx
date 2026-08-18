"use client";

import React from "react";
import { UserRole } from "@/types/auth";

interface RoleToggleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  disabled?: boolean;
}

export const RoleToggle: React.FC<RoleToggleProps> = ({
  currentRole,
  onRoleChange,
  disabled = false,
}) => {
  return (
    <div className="relative inline-flex items-center bg-[#EEF2F6] p-1 rounded-full border border-slate-200/80 select-none">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRoleChange("admin")}
        className={`relative z-10 py-1.5 px-5 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 ${
          currentRole === "admin"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label="Switch role to Admin"
      >
        Admin
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onRoleChange("manager")}
        className={`relative z-10 py-1.5 px-5 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 ${
          currentRole === "manager"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label="Switch role to Manager"
      >
        Manager
      </button>
    </div>
  );
};
