import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionHeaderProps {
  chapter: string;
  tag: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  chapter,
  tag,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* Top line: Monospace index pill */}
      <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
        [{chapter}] // {tag}
      </span>

      {/* Title: Editorial serif heading */}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-100">
        {title}
      </h2>

      {/* Subtitle: Clean sans-serif description */}
      {subtitle && (
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
