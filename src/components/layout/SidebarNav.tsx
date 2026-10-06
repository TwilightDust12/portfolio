"use client";

import React, { useState, useEffect } from "react";
import { Home, User, Folder, Layers, Bookmark, Send, Copy, Check, Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import ChimkenMinigameModal from "@/components/ui/ChimkenMinigameModal";

interface SidebarNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function SidebarNav({ activeSection, onNavigate }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chimkenOpen, setChimkenOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [beatClock, setBeatClock] = useState("03236");

  // Dynamic beat clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const beats = Math.floor(((now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()) / 86.4)) % 100000;
      setBeatClock(beats.toString().padStart(5, "0"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "stack", label: "Stack", icon: Layers },
    { id: "certifications", label: "Certifications", icon: Bookmark },
    { id: "contact", label: "Contact", icon: Send },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
        <div className="font-sans font-bold text-sm tracking-tight text-white">
          {portfolioData.personal.name}
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Persistent Left Sidebar */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#08080a] border-r border-zinc-800/80
          flex flex-col justify-between p-6 transition-transform duration-200 ease-out
          lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top Section */}
        <div>
          {/* Brand Name */}
          <div className="pb-8 pt-2">
            <h1 className="font-sans font-bold text-base text-zinc-100 tracking-tight">
              {portfolioData.personal.name}
            </h1>
          </div>

          {/* Menu */}
          <div className="space-y-1">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-600 mb-3 px-3">
              MENU
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-xs font-medium transition-all text-left
                    ${
                      isActive
                        ? "bg-zinc-850 text-white border border-zinc-700/80 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Widgets */}
        <div className="space-y-4 pt-6 border-t border-zinc-800/80">
          {/* Play chimken button */}
          <button
            onClick={() => setChimkenOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-zinc-700/80 bg-zinc-900/40 text-zinc-300 font-mono text-xs hover:border-zinc-500 hover:text-white transition-all group"
          >
            <span className="text-sm group-hover:animate-bounce">🐥</span>
            <span>Play chimken</span>
          </button>

          {/* Copyable Email Snippet */}
          <button
            onClick={handleCopyEmail}
            className="w-full flex items-center justify-between text-left text-zinc-400 hover:text-zinc-200 font-mono text-[11px] group transition-colors"
            title="Click to copy email"
          >
            <span className="truncate max-w-[170px]">{portfolioData.personal.email}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 flex-shrink-0" />
            )}
          </button>

          {/* Beat Clock & Mode Footer */}
          <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-600">
            <div>
              BEAT CK <span className="text-zinc-400">{beatClock}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <div className="flex-1 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-400 flex items-center gap-1.5">
              <span>🌙</span>
              <span>[MODE: DARK]</span>
            </div>
            <div className="px-2 py-1 rounded border border-zinc-800 bg-zinc-900/60 text-zinc-500 select-none">
              [&lt;&lt;]
            </div>
          </div>
        </div>
      </aside>

      {/* Chimken Interactive Minigame Modal */}
      <ChimkenMinigameModal
        isOpen={chimkenOpen}
        onClose={() => setChimkenOpen(false)}
      />
    </>
  );
}
