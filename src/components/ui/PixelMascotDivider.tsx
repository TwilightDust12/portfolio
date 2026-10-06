import React from "react";

interface PixelMascotDividerProps {
  number: string;
  label: string;
}

export default function PixelMascotDivider({ number, label }: PixelMascotDividerProps) {
  return (
    <div className="my-16 sm:my-24 flex items-center justify-center gap-4 text-zinc-600 select-none">
      <span className="font-mono text-xs text-zinc-700">+</span>
      <div className="h-[1px] w-12 sm:w-28 bg-zinc-800" />
      
      {/* Pixel Bird Mascot */}
      <span className="text-sm transform -translate-y-0.5 inline-block animate-bounce">
        🐥
      </span>

      <div className="h-[1px] w-8 sm:w-16 bg-zinc-800" />
      <span className="font-mono text-xs text-zinc-400 tracking-wider">
        {number} <span className="text-zinc-600">//</span> {label}
      </span>
      <div className="h-[1px] w-12 sm:w-28 bg-zinc-800" />
      <span className="font-mono text-xs text-zinc-700">+</span>
    </div>
  );
}
