"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, ArrowUpRight } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy email address:", email);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Interactive Copy Button */}
      <button
        onClick={handleCopy}
        className="btn-press group relative inline-flex items-center gap-3 px-5 py-3 rounded-full border border-zinc-700/80 bg-studio-900/80 text-zinc-200 font-mono text-xs hover:border-zinc-500 hover:text-white transition-colors"
        aria-label="Copy email address"
      >
        <Mail className="w-4 h-4 text-accent-warm" />
        <span className="font-sans font-medium text-sm text-ivory-100">{email}</span>
        <span className="text-zinc-600">|</span>
        <span className="flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-200">
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </span>
      </button>

      {/* Direct Mailto */}
      <a
        href={`mailto:${email}`}
        className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-full border border-hairline bg-studio-950 text-zinc-400 font-sans text-xs hover:text-white hover:border-zinc-700 transition-colors"
      >
        <span>Open Mail Client</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
