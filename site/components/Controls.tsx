"use client";

import { useState } from "react";

export default function Controls() {
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState("Week");

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* buttons */}
      <button className="glass glass-sm glass-refract glass-pill px-6 py-3 text-sm font-semibold text-white transition hover:brightness-125">
        Action
      </button>
      <button className="glass glass-pill px-6 py-3 text-sm font-medium text-white transition hover:brightness-125">
        Ghost
      </button>
      <button
        aria-label="Play"
        className="glass glass-sm glass-refract grid h-12 w-12 place-items-center rounded-full text-white transition hover:brightness-125"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.5 5c2 0 3.4 1.2 4.5 2.6C11.1 6.2 12.5 5 14.5 5 18 5 19.6 8.6 22 11.8 19.5 16.4 12 21 12 21z" />
        </svg>
      </button>

      {/* toggle */}
      <button
        onClick={() => setOn((v) => !v)}
        role="switch"
        aria-checked={on}
        className="glass glass-sm glass-refract glass-pill flex items-center gap-2 py-1.5 pl-2 pr-4"
      >
        <span
          className={`grid h-6 w-11 place-items-start rounded-full p-0.5 transition ${
            on ? "bg-emerald-400/40" : "bg-white/12"
          }`}
        >
          <span
            className="h-5 w-5 rounded-full bg-white transition-transform"
            style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
          />
        </span>
        <span className="text-sm font-medium text-white">{on ? "On" : "Off"}</span>
      </button>

      {/* segmented */}
      <div className="glass glass-sm glass-refract glass-pill flex gap-1 p-1">
        {["Day", "Week", "Month"].map((s) => (
          <button
            key={s}
            onClick={() => setSeg(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              seg === s ? "bg-white text-black" : "text-haze/70 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* search field */}
      <div className="glass glass-sm glass-refract glass-pill flex min-w-[240px] flex-1 items-center gap-2 px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-haze/60">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Search the spectrum…"
          className="w-full bg-transparent text-sm text-white placeholder:text-haze/45 focus:outline-none"
        />
      </div>
    </div>
  );
}
