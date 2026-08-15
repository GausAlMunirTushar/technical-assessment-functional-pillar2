import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 flex flex-col justify-between animate-pulse">
      <div>
        {/* Image skeleton */}
        <div className="w-full h-48 rounded-2xl bg-white/10 mb-4" />
        {/* Category skeleton */}
        <div className="w-20 h-3 bg-white/10 rounded-full mb-2" />
        {/* Title skeleton */}
        <div className="w-3/4 h-6 bg-white/10 rounded-md" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="w-16 h-8 bg-white/10 rounded-md" />
        <div className="w-28 h-10 bg-white/10 rounded-full" />
      </div>
    </div>
  );
};
