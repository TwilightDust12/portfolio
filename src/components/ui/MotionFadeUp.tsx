"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface MotionFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleFrom?: number;
  className?: string;
  viewportOnce?: boolean;
  immediate?: boolean;
}

// Emil Kowalski custom deceleration curve
const EMIL_EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function MotionFadeUp({
  children,
  delay = 0,
  duration = 0.35,
  yOffset = 16,
  scaleFrom = 0.98,
  className = "",
  viewportOnce = true,
  immediate = false,
}: MotionFadeUpProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={immediate ? { opacity: 1 } : undefined}
        whileInView={!immediate ? { opacity: 1 } : undefined}
        viewport={!immediate ? { once: viewportOnce } : undefined}
        transition={{ duration: 0.2, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const initialProps = {
    opacity: 0,
    transform: `translateY(${yOffset}px) scale(${scaleFrom})`,
  };

  const targetProps = {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
  };

  const transitionProps = {
    duration,
    delay,
    ease: EMIL_EASE_OUT,
  };

  if (immediate) {
    return (
      <motion.div
        initial={initialProps}
        animate={targetProps}
        transition={transitionProps}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initialProps}
      whileInView={targetProps}
      viewport={{ once: viewportOnce, margin: "-60px" }}
      transition={transitionProps}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MotionFadeUp;
