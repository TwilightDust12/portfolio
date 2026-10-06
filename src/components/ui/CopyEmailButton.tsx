"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check, Send, Sparkles } from "lucide-react";

export interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to copy email address:", err);
    }
  }, [email]);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
      {/* Frosted interactive pill container */}
      <div
        className={`relative inline-flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 pl-3.5 sm:pl-4 rounded-full backdrop-blur-md transition-all duration-500 ${
          copied
            ? "bg-emerald-950/30 border border-emerald-400/60 shadow-[0_0_25px_rgba(52,211,153,0.3),0_0_45px_rgba(168,85,247,0.25)] ring-1 ring-emerald-400/40"
            : "bg-white/[0.04] border border-white/[0.1] hover:border-ethereal-violet/40 hover:bg-white/[0.06] shadow-lg shadow-black/20"
        }`}
      >
        {/* Email Address Display with Mail Icon */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-200 select-all">
          <Mail className={`w-4 h-4 transition-colors ${copied ? "text-emerald-400" : "text-ethereal-lilac"}`} />
          <span>{email}</span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/[0.15] mx-0.5 sm:mx-1" />

        {/* Copy Trigger Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
          className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ethereal-violet cursor-pointer ${
            copied
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
              : "bg-white/[0.08] hover:bg-ethereal-violet/20 text-slate-300 hover:text-white border border-white/[0.08] hover:border-ethereal-violet/40"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied to clipboard ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-ethereal-lilac transition-colors" />
              <span>Copy Address</span>
            </>
          )}
        </button>

        {/* Starlight Particle Effect when copied */}
        <AnimatePresence>
          {copied && (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {[
                { x: "15%", y: "-30%", delay: 0, size: 6, color: "bg-emerald-300" },
                { x: "35%", y: "-50%", delay: 0.1, size: 4, color: "bg-ethereal-lilac" },
                { x: "60%", y: "-35%", delay: 0.05, size: 5, color: "bg-emerald-400" },
                { x: "85%", y: "-45%", delay: 0.15, size: 5, color: "bg-ethereal-cyan" },
                { x: "25%", y: "115%", delay: 0.1, size: 5, color: "bg-ethereal-violet" },
                { x: "75%", y: "120%", delay: 0.2, size: 4, color: "bg-emerald-300" },
              ].map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.4, 1, 0],
                    y: -24,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.6,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                  }}
                  className={`absolute rounded-full ${p.color} shadow-[0_0_8px_currentColor]`}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.2, 1] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute -top-3 -right-2 text-emerald-300 pointer-events-none"
              >
                <Sparkles className="w-4 h-4 animate-spin text-emerald-300" style={{ animationDuration: "3s" }} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Secondary Action: Direct mailto link button */}
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-ethereal-violet/40 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-mono group focus:outline-none focus-visible:ring-2 focus-visible:ring-ethereal-violet"
      >
        <Send className="w-3.5 h-3.5 text-ethereal-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        <span>Direct Transmission</span>
      </a>
    </div>
  );
}

export default CopyEmailButton;
