// components/PieChartSkeleton.tsx
"use client";
const COLORS = [
  '#FF6B6B', // Red for lowest range
  '#FFA07A', // Light salmon
  '#FFD166', // Yellow
  '#06D6A0', // Green
  '#118AB2', // Blue
  '#8EC6C5'  // Light teal for highest range
];
export default function PieChartSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[250px] h-[250px] rounded-full animate-pulse"
        style={{
          background: `linear-gradient(135deg, ${COLORS.join(", ")})`,
        }}
      />
    </div>
  );
}