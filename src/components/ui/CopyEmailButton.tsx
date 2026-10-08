"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/clipboard";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function handleCopy() {
    setCopying(true);
    const success = await copyToClipboard(email);
    setCopying(false);
    if (!success) {
      toast.error("Couldn't copy the address", { description: "Select the email address or open your mail app." });
      return;
    }
    setCopied(true);
    toast.success("Email address copied");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div>
      <a href={`mailto:${email}`} className="contact-email hover:underline">{email}</a>
      <div className="flex flex-wrap items-center gap-5 mt-4">
        <button type="button" className="secondary-button min-w-[140px]" onClick={handleCopy} disabled={copying}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Copied" : copying ? "Copying…" : "Copy email"}</span>
        </button>
        <a href={`mailto:${email}`} className="inline-link">Open mail app <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
export default CopyEmailButton;
