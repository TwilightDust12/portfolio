"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  accentBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function GlassCard({
  children,
  className,
  glowOnHover = true,
  accentBorder = false,
  onClick,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "glass-panel rounded-2xl relative overflow-hidden",
        glowOnHover && "glass-panel-hover",
        className
      )}
      {...props}
    >
      {accentBorder && (
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-ethereal-violet/40 to-transparent absolute top-0 left-0 right-0 pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
}

export default GlassCard;
