"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { Loader2 } from "lucide-react";

const ProductGrid = dynamic(
  () => import("@/components/products/ProductGrid").then((module) => module.ProductGrid),
  {
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    ),
  }
);

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((module) => module.CartDrawer),
  { loading: () => null }
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#FD853A]" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#FD853A] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Dashboard Content Container */}
      <main className="flex-1 max-w-300 w-full mx-auto px-4 py-8 flex flex-col gap-8">

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

