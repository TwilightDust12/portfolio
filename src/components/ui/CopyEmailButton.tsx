"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts
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
      toast.success("Email address copied", {
        description: email,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Graceful fallback attempt
      try {
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Silently fail if both methods fail
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      {/* Email Address Display Pill */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-ink/15 bg-bg/80 text-ink font-mono text-sm shadow-sm select-all">
        <Mail className="w-4 h-4 text-accent-text shrink-0" />
        <span className="tracking-tight">{email}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`btn-press px-4 py-2 rounded-xl text-xs font-mono font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out inline-flex items-center gap-2 border select-none ${
            copied
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              : "bg-accent-text/10 border-accent-text/25 text-accent-text hover:bg-accent-text/20"
          }`}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Copied to clipboard ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Address</span>
            </>
          )}
        </button>

        {/* Direct Mailto Secondary Action */}
        <a
          href={`mailto:${email}`}
          className="btn-press px-4 py-2 rounded-xl text-xs font-mono font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out inline-flex items-center gap-1.5 border border-ink/15 bg-ink/5 hover:bg-ink/10 text-ink"
          aria-label="Compose email via mailto link"
        >
          <span>Direct Mail</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default CopyEmailButton;
