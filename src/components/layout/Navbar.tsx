"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, LogOut, User as UserIcon, ShieldCheck, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { UserRole } from "@/types/auth";
import { Logo } from "@/components/ui/Logo";
import { RoleToggle } from "@/components/ui/RoleToggle";

interface NavbarProps {
  onOpenCart: () => void;
}

const emptySubscribe = () => () => {};

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { data: session, update } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const rawCartCount = useCartStore((state) => state.getCartCount());
  const cartCount = isMounted ? rawCartCount : 0;

  const currentRole: UserRole = session?.user?.role === "manager" ? "manager" : "admin";

  const handleRoleToggle = async (newRole: UserRole) => {
    if (newRole === currentRole) return;
    await update({ role: newRole });
  };

  return (
    <>
      <header className="w-full bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-300 mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation & Controls (md and up) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Segmented Role Toggle Component */}
            {session?.user && (
              <RoleToggle currentRole={currentRole} onRoleChange={handleRoleToggle} />
            )}

            {/* Cart Button with Counter */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#FD853A] hover:bg-[#FD853A]/90 text-white px-4 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 cursor-pointer shadow-xs"
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
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-sm text-slate-900">
                    {session.user.name || "Authenticated User"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#FD853A]">
                    <ShieldCheck className="w-3 h-3" />
                    {currentRole}
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
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Controls (< md screen sizes) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 bg-[#FD853A] hover:bg-[#FD853A]/90 text-white px-3 py-1.5 rounded-full font-bold text-xs transition-transform active:scale-95 cursor-pointer shadow-xs"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
              aria-label="Open side menu drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop Click Target */}
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white text-slate-900 h-full flex flex-col justify-between border-l border-slate-200 p-6 shadow-2xl animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu Drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <Logo size="md" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
              {session?.user ? (
                <>
                  {/* User Profile Card */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        width={44}
                        height={44}
                        className="rounded-full border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-base text-slate-900 truncate">
                        {session.user.name || "Authenticated User"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#FD853A] mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {currentRole}
                      </span>
                    </div>
                  </div>

                  {/* Active Role Mode Switcher */}
                  <div className="flex flex-col gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Role Control Panel
                    </span>
                    <div className="w-full flex justify-center pt-1">
                      <RoleToggle currentRole={currentRole} onRoleChange={handleRoleToggle} />
                    </div>
                  </div>

                  {/* Quick Cart Actions */}
                  <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Shopping Bag
                    </span>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenCart();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-[#FD853A] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingBag className="w-4 h-4 text-[#FD853A]" />
                        <span className="text-sm font-bold text-slate-900">View Cart</span>
                      </div>
                      <span className="bg-[#FD853A] text-white px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                        {cartCount}
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 text-center py-8">
                  <p className="text-sm text-slate-600">Log in to manage your inventory and cart.</p>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl bg-[#FD853A] text-white font-bold text-sm hover:bg-[#FD853A]/90 transition-colors shadow-xs"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Drawer Footer - Logout Button */}
            {session?.user && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-sm transition-colors cursor-pointer border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
