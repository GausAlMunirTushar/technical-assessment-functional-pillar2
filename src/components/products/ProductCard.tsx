"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Product, getStockStatus } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart, AlertCircle, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onDeleteSuccess?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDeleteSuccess }) => {
  const { data: session } = useSession();
  const addToCart = useCartStore((state) => state.addToCart);
  const stockStatus = getStockStatus(product.stock);

  const isOutOfStock = stockStatus === "OUT_OF_STOCK";
  const isLowStock = stockStatus === "LOW_STOCK";
  const isAdmin = session?.user?.role === "admin";

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`/api/products?id=${product.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      toast.success(data.message || `Deleted ${product.name}`);
      if (onDeleteSuccess) {
        onDeleteSuccess(product.id);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error deleting product");
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between hover:border-slate-400 transition-all duration-300 group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-4 flex items-center justify-center border border-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Stock Badges */}
          {isOutOfStock && (
            <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Out of Stock</span>
            </div>
          )}

          {isLowStock && (
            <div className="absolute top-3 left-3 bg-amber-500 text-black font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Low Stock ({product.stock} left)</span>
            </div>
          )}

          {/* RBAC: Delete & Manage actions rendered ONLY for Admin, completely hidden for Manager */}
          {isAdmin && (
            <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-[#FD853A] hover:text-white transition-colors cursor-pointer"
                title="Admin: manage stock"
                aria-label={`Manage stock for ${product.name}`}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                title="Admin: delete product"
                aria-label={`Delete ${product.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Category & Name */}
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FD853A]">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-1 tracking-wide">
          {product.name}
        </h3>
      </div>

      {/* Price & Add to Cart Action */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
        <div>
          <span className="block text-xs text-slate-500">Price</span>
          <span className="text-2xl font-extrabold text-slate-900">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            isOutOfStock
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              : "bg-[#FD853A] hover:bg-[#FD853A]/90 text-white active:scale-95"
          }`}
          aria-label={
            isOutOfStock
              ? `${product.name} is out of stock`
              : `Add ${product.name} to cart`
          }
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};
