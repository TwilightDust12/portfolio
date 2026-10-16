"use client";

import { memo, useEffect, useRef } from "react";

type BackgroundStar = {
  x: number;
  y: number;
  color: number;
  opacity: number;
  speed: number;
  phase: number;
};

type ShootingStar = { x: number; y: number; angle: number; speed: number };

// Adapted from UI Capsule's MIT-licensed Background Pixel Stars on 21st.dev.
export const BackgroundPixelStars = memo(function BackgroundPixelStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const surface = canvas;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: BackgroundStar[] = [];
    let shootingStars: ShootingStar[] = [];
    let colors: string[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastRender = 0;
    let lastRegeneration = 0;
    let nextShootingStar = 0;
    let visible = false;

    function createStar(): BackgroundStar {
      return {
        x: Math.floor(Math.random() * width / 3) * 3,
        y: Math.floor(Math.random() * height / 3) * 3,
        color: Math.floor(Math.random() * colors.length),
        opacity: 0.18 + Math.random() * 0.27,
        speed: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function draw(timestamp: number) {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.fillStyle = colors[star.color];
        ctx.globalAlpha = star.opacity * (reducedMotion.matches ? 1 : 0.65 + Math.sin(timestamp / 1000 / star.speed + star.phase) * 0.35);
        ctx.fillRect(star.x, star.y, 3, 3);
      }
      ctx.globalAlpha = 1;
      for (const star of shootingStars) {
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.angle);
        ctx.fillStyle = colors[2];
        for (let i = 0; i < 10; i++) {
          ctx.globalAlpha = (1 - i / 10) * 0.5;
          ctx.fillRect(-i * 5, 0, i === 0 ? 4 : 2, 2);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function animate(timestamp: number) {
      if (timestamp - lastRender >= 1000 / 16) {
        // Cap elapsed time so returning to the tab never jumps a shooting star.
        const step = Math.min((timestamp - lastRender) / (1000 / 16), 2);
        lastRender = timestamp;
        if (timestamp >= nextShootingStar) {
          shootingStars.push({ x: Math.random() * width, y: 0, angle: (45 + Math.random() * 90) * Math.PI / 180, speed: 8 + Math.random() * 5 });
          nextShootingStar = timestamp + 4000 + Math.random() * 4000;
        }
        if (timestamp - lastRegeneration >= 5000) {
          for (let i = 0; i < Math.floor(stars.length * 0.15); i++) {
            stars[Math.floor(Math.random() * stars.length)] = createStar();
          }
          lastRegeneration = timestamp;
        }
        shootingStars = shootingStars.filter((star) => {
          star.x += Math.cos(star.angle) * star.speed * step;
          star.y += Math.sin(star.angle) * star.speed * step;
          return star.x > -60 && star.x < width + 60 && star.y < height + 60;
        });
        draw(timestamp);
      }
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        shootingStars = [];
        draw(0);
      } else if (visible && !document.hidden && width && height) {
        lastRender = performance.now();
        nextShootingStar = lastRender + 4000;
        lastRegeneration = lastRender;
        frame = requestAnimationFrame(animate);
      }
    }

    function updatePalette() {
      const style = getComputedStyle(surface);
      colors = ["--accent-text", "--accent-pink", "--accent-sky"].map((name) => style.getPropertyValue(name).trim());
      draw(performance.now());
    }

    function resize() {
      width = surface.clientWidth;
      height = surface.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: Math.min(80, Math.floor(width * height * 0.000025)) }, createStar);
      shootingStars = [];
      draw(performance.now());
      syncAnimation();
    }

    updatePalette();
    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(surface);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    visibilityObserver.observe(surface);
    const themeObserver = new MutationObserver(updatePalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    reducedMotion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-stars pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
});

export default BackgroundPixelStars;
