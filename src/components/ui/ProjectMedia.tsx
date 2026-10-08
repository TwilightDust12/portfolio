"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";
import type { Project } from "@/types/portfolio";

export function ProjectMedia({ project, compact = false }: { project: Project; compact?: boolean }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const viewportId = useId();
  const screens = project.screenshots ?? [];
  const screen = screens[screenIndex] ?? screens[0];

  if (project.videoUrl) {
    return (
      <figure className="project-media">
        <video src={project.videoUrl} controls playsInline preload="none" className="w-full max-h-[440px] bg-black" aria-label={`${project.title} desktop recording`} />
        <figcaption className="media-caption">CachyOS / Hyprland · Desktop recording</figcaption>
      </figure>
    );
  }
  if (!screen) return null;

  return (
    <figure className="project-media">
      <div className="media-toolbar">
        <div className="media-tabs" role="group" aria-label={`${project.title} screenshots`}>
          {screens.map((item, index) => (
            <button key={item.label} type="button" className="media-control" aria-pressed={screenIndex === index} aria-controls={viewportId} onClick={() => {
              setScreenIndex(index);
              if (!item.mobileUrl) setDevice("desktop");
            }}>{item.label.replace(" Dashboard", "")}</button>
          ))}
        </div>
        {screen.mobileUrl && (
          <div className="media-tabs" role="group" aria-label={`${project.title} preview device`}>
            <button type="button" className="media-control inline-flex items-center gap-1.5" aria-pressed={device === "desktop"} aria-controls={viewportId} onClick={() => setDevice("desktop")}><Monitor size={13} aria-hidden="true" /> Desktop</button>
            <button type="button" className="media-control inline-flex items-center gap-1.5" aria-pressed={device === "mobile"} aria-controls={viewportId} onClick={() => setDevice("mobile")}><Smartphone size={13} aria-hidden="true" /> Mobile</button>
          </div>
        )}
      </div>
      <div id={viewportId} className={`media-viewport ${compact ? "media-viewport-compact" : ""}`}>
        <div className={`media-image-frame ${device === "mobile" ? "mobile" : ""}`}>
          <Image
            key={`${screenIndex}-${device}`}
            src={device === "mobile" ? screen.mobileUrl ?? screen.desktopUrl : screen.desktopUrl}
            alt={`${project.title}: ${screen.label}, ${device} view`}
            fill
            sizes={device === "mobile" ? "190px" : "(max-width: 767px) 90vw, 700px"}
            className="media-image"
          />
        </div>
      </div>
      <figcaption className="media-caption">{screen.label} · {device === "mobile" ? "Mobile" : "Desktop"} view</figcaption>
    </figure>
  );
}
