import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between animate-pulse">
      <div>
        {/* Image skeleton */}
        <div className="w-full h-48 rounded-2xl bg-slate-100 mb-4" />
        {/* Category skeleton */}
        <div className="w-20 h-3 bg-slate-200 rounded-full mb-2" />
        {/* Title skeleton */}
        <div className="w-3/4 h-6 bg-slate-200 rounded-md" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div className="w-16 h-8 bg-slate-200 rounded-md" />
        <div className="w-28 h-10 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
