// components/PieChartSkeleton.tsx
"use client";

export default function PieChartSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[250px] h-[250px] rounded-full bg-gray-300 animate-pulse" />
    </div>
  );
}