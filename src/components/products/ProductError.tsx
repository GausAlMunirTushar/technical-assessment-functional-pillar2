import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ProductErrorProps {
  message?: string;
  onRetry: () => void;
}

export const ProductError: React.FC<ProductErrorProps> = ({
  message = "Something went wrong while fetching products.",
  onRetry,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-red-200 rounded-3xl p-8 flex flex-col items-center text-center gap-4 my-8">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Failed to Load Products</h3>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 px-6 py-2.5 rounded-full bg-[#FD853A] hover:bg-[#FD853A]/90 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Retry</span>
      </button>
    </div>
  );
};
