"use client";

import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, LogOut, User as UserIcon, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

import { Logo } from "@/components/ui/Logo";

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { data: session } = useSession();
  const cartCount = useCartStore((state) => state.getCartCount());
  const roleLabel = session?.user?.role === "admin" ? "Admin" : "Manager";

  return (
    <header className="w-full bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-300 mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* User Profile & Cart Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button with Optimistic Counter */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#FD853A] hover:bg-[#FD853A]/90 text-white px-4 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 cursor-pointer"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({cartCount})</span>
          </button>

          {/* Authenticated User Session Info */}
          {session?.user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  width={32}
                  height={32}
                  className="rounded-full border border-slate-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-semibold text-sm text-slate-900">
                  {session.user.name || "Authenticated User"}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#FD853A]">
                  <ShieldCheck className="w-3 h-3" />
                  {roleLabel}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
