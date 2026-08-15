"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { CheckoutButton } from "./CheckoutButton";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCartStore();

  if (!isOpen) return null;

  const total = getCartTotal();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#171717] text-white h-full flex flex-col justify-between shadow-2xl border-l border-white/10 p-6 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FD853A]" />
            <h2 className="text-xl font-bold tracking-wide">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-white/60 my-auto">
              <ShoppingBag className="w-12 h-12 stroke-1 opacity-50" />
              <p className="text-base font-semibold">Your cart is empty</p>
              <p className="text-xs text-white/40 max-w-50">
                Add some products from the dashboard to get started.
              </p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-3 flex items-center gap-3"
              >
                {/* Product Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate text-white">
                    {product.name}
                  </h4>
                  <span className="text-xs text-[#FD853A] font-semibold">
                    ${product.price.toLocaleString()}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${product.name} from cart`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Subtotal</span>
              <span className="text-xl font-extrabold text-white">
                ${total.toLocaleString()}
              </span>
            </div>

            <CheckoutButton onSuccess={onClose} />

            <button
              onClick={clearCart}
              className="text-xs text-white/50 hover:text-red-400 transition-colors text-center py-1 cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
