"use client";

import { useId, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, Monitor, Smartphone, X } from "lucide-react";
import type { Project } from "@/types/portfolio";

export function ProjectMedia({ project, compact = false, showVideo = false }: { project: Project; compact?: boolean; showVideo?: boolean }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const viewportId = useId();
  const screens = project.screenshots ?? [];
  const screen = screens[screenIndex] ?? screens[0];

  if (project.videoUrl && (showVideo || !screen)) {
    return (
      <figure className="project-media">
        <video src={project.videoUrl} controls playsInline preload="none" className="w-full max-h-[440px] bg-black" aria-label={`${project.title} demo video`} />
        <figcaption className="media-caption">{project.title} · Demo video</figcaption>
      </figure>
    );
  }
  if (!screen) return null;

  return (
    <figure className="project-media">
      <div className="media-toolbar">
        <div className="media-tabs" role="group" aria-label={`${project.title} screenshots`}>
          {screens.map((item, index) => (
            <button key={item.label} type="button" className="media-control" aria-pressed={screenIndex === index} aria-controls={viewportId} onClick={(event) => {
              setAnimate(event.detail !== 0);
              setScreenIndex(index);
              if (!item.mobileUrl) setDevice("desktop");
            }}>{item.label.replace(" Dashboard", "")}</button>
          ))}
        </div>
        {screen.mobileUrl && (
          <div className="media-tabs" role="group" aria-label={`${project.title} preview device`}>
            <button type="button" className="media-control inline-flex items-center gap-1.5" aria-pressed={device === "desktop"} aria-controls={viewportId} onClick={(event) => { setAnimate(event.detail !== 0); setDevice("desktop"); }}><Monitor size={13} aria-hidden="true" /> Desktop</button>
            <button type="button" className="media-control inline-flex items-center gap-1.5" aria-pressed={device === "mobile"} aria-controls={viewportId} onClick={(event) => { setAnimate(event.detail !== 0); setDevice("mobile"); }}><Smartphone size={13} aria-hidden="true" /> Mobile</button>
          </div>
        )}
      </div>
      <Dialog.Root open={viewerOpen} onOpenChange={setViewerOpen}>
        <Dialog.Trigger asChild>
          <button type="button" id={viewportId} className={`media-viewport media-expand ${compact ? "media-viewport-compact" : ""}`} data-motion={animate} aria-label={`Enlarge ${project.title}: ${screen.label}, ${device} view`} onClick={(event) => setAnimate(event.detail !== 0)}>
            {screens.flatMap((item, index) => (["desktop", ...(item.mobileUrl ? ["mobile"] : [])] as const).map((view) => (
              <span key={`${index}-${view}`} className={`media-image-frame ${view === "mobile" ? "mobile" : ""}`} data-active={screenIndex === index && device === view} aria-hidden="true">
                <Image src={view === "mobile" ? item.mobileUrl! : item.desktopUrl} alt="" fill sizes={view === "mobile" ? "190px" : "(max-width: 767px) 90vw, 700px"} className="media-image" />
              </span>
            )))}
            <span className="media-expand-hint" aria-hidden="true"><Expand size={14} /> View full screenshot</span>
          </button>
        </Dialog.Trigger>
        {/* Unmount immediately when keyboard dismissal skips the Radix exit animation. */}
        {(viewerOpen || animate) && <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay fixed inset-0 z-[60]" data-motion={animate} />
          <Dialog.Content className="dialog-content screenshot-dialog fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-2xl" data-motion={animate} onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              setAnimate(false);
              setViewerOpen(false);
            }
          }}>
            <div className="screenshot-heading">
              <div>
                <Dialog.Title className="font-mono text-sm">{project.title}</Dialog.Title>
                <Dialog.Description className="text-xs text-muted mt-1">{screen.label} · {device} view. Scroll to explore the full screenshot.</Dialog.Description>
              </div>
              <Dialog.Close asChild><button type="button" className="dialog-close btn-press" aria-label="Close screenshot" onClick={(event) => setAnimate(event.detail !== 0)}><X size={20} aria-hidden="true" /></button></Dialog.Close>
            </div>
            {/* Native size preserves long screenshots without cropping or allocating a huge optimized image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={device === "mobile" ? screen.mobileUrl ?? screen.desktopUrl : screen.desktopUrl} alt={`${project.title}: ${screen.label}, ${device} view`} className={`screenshot-full ${device === "mobile" ? "mobile" : ""}`} />
          </Dialog.Content>
        </Dialog.Portal>}
      </Dialog.Root>
      <figcaption className="media-caption">{screen.label} · {device === "mobile" ? "Mobile" : "Desktop"} view</figcaption>
    </figure>
  );
}
