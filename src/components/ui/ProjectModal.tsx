"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { ProjectMedia } from "@/components/ui/ProjectMedia";

export interface ProjectModalProps {
  animate?: boolean;
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export function ProjectModal({ project, open, onOpenChange, onCloseAutoFocus, animate = true }: ProjectModalProps) {
  const [keyboardDismiss, setKeyboardDismiss] = useState(false);
  useEffect(() => { if (open) setKeyboardDismiss(false); }, [open]);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* Keyboard dismissal releases the portal immediately; pointer dismissal keeps the exit animation. */}
      {(open || (animate && !keyboardDismiss)) && <Dialog.Portal>
        <Dialog.Overlay data-motion={animate && !keyboardDismiss} className="dialog-overlay fixed inset-0 z-50" />
        <Dialog.Content data-motion={animate && !keyboardDismiss} onEscapeKeyDown={(event) => {
          if (event.target instanceof Element && event.target.closest(".screenshot-dialog")) {
            event.preventDefault();
            return;
          }
          event.stopImmediatePropagation();
          setKeyboardDismiss(true);
        }} className="dialog-content fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-2xl" onCloseAutoFocus={onCloseAutoFocus}>
          {project && <>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <Dialog.Title className="project-title">{project.title}</Dialog.Title>
                <Dialog.Description className="text-sm text-muted mt-2">{project.subtitle}</Dialog.Description>
              </div>
              <Dialog.Close asChild><button type="button" className="dialog-close btn-press" onClick={(event) => { if (event.detail === 0) setKeyboardDismiss(true); }} aria-label="Close case study"><X size={20} aria-hidden="true" /></button></Dialog.Close>
            </div>
            <ProjectMedia key={project.id} project={project} showVideo />
            <div className="dialog-details">
              <div><h3>The problem</h3><p>{project.problem}</p></div>
              <div><h3>My role</h3><p>{project.role}</p>{project.id === "webc" && <p className="mt-2">Built as part of a capstone team at STI College Lucena.</p>}</div>
              <div><h3>The result</h3><p>{project.outcome}</p></div>
              <div><h3>Built with</h3><p>{project.stack.join(" · ")}</p></div>
            </div>
            {project.longDescription && <div className="mb-6"><h3 className="text-sm font-semibold mb-2">Inside the project</h3><p className="text-sm text-muted leading-relaxed">{project.longDescription}</p></div>}
            {project.story?.contribution && <div className="mb-6"><h3 className="text-sm font-semibold mb-2">My contribution</h3><p className="text-sm text-muted leading-relaxed">{project.story.contribution}</p></div>}
            {project.story?.difficultDecision && <div className="mb-6"><h3 className="text-sm font-semibold mb-2">Difficult decision</h3><p className="text-sm text-muted leading-relaxed">{project.story.difficultDecision}</p></div>}
            {project.story?.learned && <div className="mb-6"><h3 className="text-sm font-semibold mb-2">What I learned</h3><p className="text-sm text-muted leading-relaxed">{project.story.learned}</p></div>}
            {project.story?.improvement && <div className="mb-6"><h3 className="text-sm font-semibold mb-2">What I would improve</h3><p className="text-sm text-muted leading-relaxed">{project.story.improvement}</p></div>}
            {project.highlights?.length ? <div className="mb-6"><h3 className="text-sm font-semibold mb-3">Implementation details</h3><ul className="space-y-2 pl-4 list-disc text-sm text-muted leading-relaxed">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div> : null}
            <div className="flex flex-wrap items-center gap-6 border-t fine-rule pt-4">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-link">{project.id === "wayland-rice" ? "GitHub profile" : "GitHub repository"} <ArrowUpRight size={16} aria-hidden="true" /></a>}
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-link">Live demo <ArrowUpRight size={16} aria-hidden="true" /></a>}
              <Dialog.Close asChild><button type="button" className="inline-link ml-auto" onClick={(event) => { if (event.detail === 0) setKeyboardDismiss(true); }}>Close</button></Dialog.Close>
            </div>
          </>}
        </Dialog.Content>
      </Dialog.Portal>}
    </Dialog.Root>
  );
}

export default ProjectModal;
