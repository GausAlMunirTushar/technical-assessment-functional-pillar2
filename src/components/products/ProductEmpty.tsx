import React from "react";
import { PackageX, RefreshCw } from "lucide-react";

interface ProductEmptyProps {
  onRetry: () => void;
}

export const ProductEmpty: React.FC<ProductEmptyProps> = ({ onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-[#171717] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-4 my-8">
      <div className="w-12 h-12 rounded-full bg-white/10 text-white/60 flex items-center justify-center">
        <PackageX className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">No Products Available</h3>
        <p className="text-sm text-white/70">
          There are currently no products to display in the inventory.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 px-6 py-2.5 rounded-full bg-[#FD853A] hover:bg-[#FD853A]/90 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reload Products</span>
      </button>
    </div>
  );
};
