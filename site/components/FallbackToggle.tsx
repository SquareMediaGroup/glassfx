"use client";

import { useState } from "react";

/**
 * Previews what Safari/Firefox (no `backdrop-filter: url()`) render: flip the
 * `.force-fallback` class so the refraction surfaces inside drop to the frost
 * fallback. Proves nothing breaks — they stay frosted and legible.
 */
export default function FallbackToggle() {
  const [fallback, setFallback] = useState(false);

  return (
    <div className={fallback ? "force-fallback" : ""}>
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => setFallback((v) => !v)}
          role="switch"
          aria-checked={fallback}
          className="glass glass-sm glass-refract glass-pill flex items-center gap-3 py-1.5 pl-2 pr-4 text-sm"
        >
          <span
            className={`grid h-6 w-11 place-items-start rounded-full p-0.5 transition ${
              fallback ? "bg-white/25" : "bg-white/10"
            }`}
          >
            <span
              className="h-5 w-5 rounded-full bg-white transition-transform"
              style={{ transform: fallback ? "translateX(20px)" : "translateX(0)" }}
            />
          </span>
          <span className="font-medium text-white">
            Preview Safari / Firefox fallback
          </span>
        </button>
        <span className="font-mono text-[11px] text-haze-dim">
          {fallback ? "frost (no lens)" : "full refraction"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {["card", "pill", "panel"].map((b) => (
          <div
            key={b}
            className="glass glass-sm glass-refract relative grid h-36 place-items-center overflow-hidden rounded-2xl"
          >
            <div className="stage-stripes absolute inset-0 -z-[1] opacity-70" />
            <p className="font-mono text-[11px] uppercase tracking-widest text-haze/80">
              {fallback ? "frost fallback" : "real refraction"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
