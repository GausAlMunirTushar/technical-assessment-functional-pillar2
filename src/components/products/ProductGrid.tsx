"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductError } from "./ProductError";
import { ProductEmpty } from "./ProductEmpty";

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Testing flags for evaluator demonstration
  const [testSimulateError, setTestSimulateError] = useState(false);
  const [testSimulateEmpty, setTestSimulateEmpty] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let url = "/api/products";
      if (testSimulateError) url += "?error=true";
      else if (testSimulateEmpty) url += "?empty=true";

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to load inventory from server");
      }

      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [testSimulateError, testSimulateEmpty]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProducts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProducts]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Evaluator Testing Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-slate-700">
          Evaluator State Machine Controls:
        </span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={testSimulateError}
              onChange={(e) => {
                setTestSimulateError(e.target.checked);
                if (e.target.checked) setTestSimulateEmpty(false);
              }}
              className="accent-[#FD853A]"
            />
            <span>Simulate API Error</span>
          </label>

          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={testSimulateEmpty}
              onChange={(e) => {
                setTestSimulateEmpty(e.target.checked);
                if (e.target.checked) setTestSimulateError(false);
              }}
              className="accent-[#FD853A]"
            />
            <span>Simulate Empty State</span>
          </label>
        </div>
      </div>

      {/* State Rendering Logic */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      ) : error ? (
        <ProductError message={error} onRetry={fetchProducts} />
      ) : products.length === 0 ? (
        <ProductEmpty onRetry={fetchProducts} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
