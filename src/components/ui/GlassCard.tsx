"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  accentBorder?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowOnHover = true,
  accentBorder = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-xl border border-hairline bg-studio-900/50 backdrop-blur-sm p-6
        ${glowOnHover ? "hover:border-zinc-700/80 transition-colors duration-200" : ""}
        ${accentBorder ? "border-t-zinc-600/50" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
