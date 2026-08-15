"use client";

import React from "react";
import Image from "next/image";
import { Product, getStockStatus } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const stockStatus = getStockStatus(product.stock);

  const isOutOfStock = stockStatus === "OUT_OF_STOCK";
  const isLowStock = stockStatus === "LOW_STOCK";

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    toast.success(`✓ Added ${product.name} to cart`);
  };

  return (
    <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/40 mb-4 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Stock Badges */}
          {isOutOfStock && (
            <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Out of Stock</span>
            </div>
          )}

          {isLowStock && (
            <div className="absolute top-3 left-3 bg-amber-500 text-black font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Low Stock ({product.stock} left)</span>
            </div>
          )}
        </div>

        {/* Category & Name */}
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FD853A]">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-white mt-1 tracking-wide">
          {product.name}
        </h3>
      </div>

      {/* Price & Add to Cart Action */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <span className="block text-xs text-white/50">Price</span>
          <span className="text-2xl font-extrabold text-white">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            isOutOfStock
              ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
              : "bg-[#FD853A] hover:bg-[#FD853A]/90 text-white shadow-md active:scale-95"
          }`}
          aria-label={
            isOutOfStock
              ? `${product.name} is out of stock`
              : `Add ${product.name} to cart`
          }
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isOutOfStock ? "Unavailable" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};
