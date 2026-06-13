"use client";

import { useState } from "react";

/** A glass code panel with a copy button. */
export default function CodeBlock({
  code,
  label,
  className = "",
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be blocked; no-op */
    }
  };

  return (
    <div
      className={`glass glass-sm glass-refract overflow-hidden rounded-2xl ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-haze-dim">
          {label ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[11px] font-medium tracking-wide text-haze transition hover:text-white"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[12.5px] leading-relaxed text-haze/90">
          {code}
        </code>
      </pre>
    </div>
  );
}
