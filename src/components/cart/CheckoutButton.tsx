"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CheckoutButtonProps {
  onSuccess?: () => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onSuccess }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const handleCheckout = async (simulateFailure = false) => {
    // Step 2: Verify Session (Redirect to /login if unauthenticated)
    if (!session?.user) {
      toast.error("Please sign in to complete checkout");
      router.push("/login");
      return;
    }

    if (items.length === 0) return;

    // Step 3: Loading State
    setIsProcessing(true);
    setHasFailed(false);

    try {
      // Step 4 & 5: Simulated 1500ms processing delay API call
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ simulateFailure }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Checkout transaction failed");
      }

      // Step 6: Success -> Toast + Clear Cart
      toast.success(`Checkout successful! Txn: ${data.transactionId}`);
      clearCart();
      if (onSuccess) onSuccess();
    } catch (err) {
      // Step 7: Failure -> Toast + Retry option
      setHasFailed(true);
      const errorMsg = err instanceof Error ? err.message : "Checkout transaction failed";
      
      toast.error(errorMsg, {
        action: {
          label: "Retry",
          onClick: () => handleCheckout(false),
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {hasFailed ? (
        <div className="flex gap-2">
          <button
            onClick={() => handleCheckout(false)}
            disabled={isProcessing}
            className="flex-1 py-3 px-4 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Retry Checkout</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleCheckout(false)}
          disabled={isProcessing || items.length === 0}
          className="w-full py-3.5 px-6 rounded-full bg-[#FD853A] hover:bg-[#FD853A]/90 text-white font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing... (1.5s)</span>
            </>
          ) : (
            <>
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      )}

      {/* Evaluator toggle for testing simulated failure */}
      <button
        onClick={() => handleCheckout(true)}
        disabled={isProcessing || items.length === 0}
        className="w-full py-1 text-center text-xs text-white/50 hover:text-white/80 transition-colors underline cursor-pointer"
      >
        [Evaluator Test] Simulate Checkout Failure
      </button>
    </div>
  );
};
