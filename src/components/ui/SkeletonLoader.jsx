import React from "react";

export function StoryCardSkeleton() {
  return (
    <div className="bg-white/60 rounded-xl p-5 border border-[#E8E2D8] animate-pulse space-y-4">
      <div className="h-48 bg-[#E8E2D8]/60 rounded-lg w-full"></div>
      <div className="h-4 bg-[#E8E2D8]/60 rounded w-1/4"></div>
      <div className="h-6 bg-[#E8E2D8]/80 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-full"></div>
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-5/6"></div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <div className="w-9 h-9 rounded-full bg-[#E8E2D8]/70"></div>
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 bg-[#E8E2D8]/70 rounded w-1/3"></div>
          <div className="h-3 bg-[#E8E2D8]/40 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

export function PoemCardSkeleton() {
  return (
    <div className="bg-white/50 rounded-xl p-6 border border-[#E8E2D8] animate-pulse space-y-4 text-center">
      <div className="h-3 bg-[#E8E2D8]/60 rounded w-16 mx-auto"></div>
      <div className="h-6 bg-[#E8E2D8]/80 rounded w-1/2 mx-auto"></div>
      <div className="space-y-2 max-w-sm mx-auto pt-2">
        <div className="h-3.5 bg-[#E8E2D8]/50 rounded w-3/4 mx-auto"></div>
        <div className="h-3.5 bg-[#E8E2D8]/50 rounded w-2/3 mx-auto"></div>
        <div className="h-3.5 bg-[#E8E2D8]/50 rounded w-4/5 mx-auto"></div>
      </div>
      <div className="h-3.5 bg-[#E8E2D8]/60 rounded w-24 mx-auto pt-2"></div>
    </div>
  );
}

export function StoryDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse space-y-8">
      <div className="h-4 bg-[#E8E2D8]/70 rounded w-24 mx-auto"></div>
      <div className="h-10 bg-[#E8E2D8]/90 rounded w-3/4 mx-auto"></div>
      <div className="flex justify-center items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#E8E2D8]/70"></div>
        <div className="h-4 bg-[#E8E2D8]/60 rounded w-32"></div>
      </div>
      <div className="h-80 bg-[#E8E2D8]/60 rounded-2xl w-full"></div>
      <div className="space-y-4 pt-6">
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-full"></div>
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-11/12"></div>
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-full"></div>
        <div className="h-4 bg-[#E8E2D8]/50 rounded w-4/5"></div>
      </div>
    </div>
  );
}
