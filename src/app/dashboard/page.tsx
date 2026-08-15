"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ShieldCheck, Sparkles, Layers } from "lucide-react";

export default function DashboardPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col selection:bg-[#FD853A] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Dashboard Content Container */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Header Hero Banner */}
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col gap-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD853A]/20 border border-[#FD853A]/30 text-[#FD853A] text-xs font-bold w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Protected Dashboard (Auth.js v5)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Product Inventory &amp; Order Manager
            </h1>
            <p className="text-sm text-white/70 max-w-[600px] leading-relaxed">
              Explore inventory items, test stock rules (Out of Stock, Low Stock, Normal), experience optimistic cart updates, and trigger simulated 1500ms checkout.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <div className="flex items-center gap-2 text-xs text-white/60 bg-black/40 px-4 py-2 rounded-full border border-white/10">
              <Layers className="w-4 h-4 text-[#FD853A]" />
              <span>Zustand Global State</span>
            </div>
          </div>
        </div>

        {/* Product Inventory Grid */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Inventory <span className="text-[#FD853A]">Products</span>
          </h2>
          <ProductGrid />
        </section>
      </main>

      {/* Cart Drawer Slide-Over */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
