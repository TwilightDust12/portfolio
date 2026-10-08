import type { ReactNode } from "react";

export interface MotionFadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleFrom?: number;
  className?: string;
  viewportOnce?: boolean;
  immediate?: boolean;
}

// Content stays visible on first render. Motion belongs to interactions,
// rather than repeating an entrance animation for every section.
export function MotionFadeUp({ children, className = "" }: MotionFadeUpProps) {
  return <div className={className}>{children}</div>;
}

export default MotionFadeUp;
