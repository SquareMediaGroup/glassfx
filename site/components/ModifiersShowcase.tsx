"use client";

import { useState } from "react";
import { Glass } from "glassfx/react";

const MODIFIERS = [
  { cls: "glass", name: "glass", note: "base material" },
  { cls: "glass glass-refract", name: "glass-refract", note: "real lensing" },
  { cls: "glass glass-sm", name: "glass-sm", note: "less frost" },
  { cls: "glass glass-sm glass-refract", name: "glass-sm refract", note: "light & lensed" },
];

export default function ModifiersShowcase() {
  const [active, setActive] = useState(MODIFIERS[1]); // Default to glass-refract

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
      {/* Main Preview */}
      <div className="relative flex-1 overflow-hidden rounded-[32px] p-8 lg:h-[440px] lg:p-10">
        <img
          src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=1200&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 -z-[1] h-full w-full object-cover"
        />
        <div className="flex h-full flex-col justify-end">
          <div className={`${active.cls} rounded-2xl p-6 sm:p-8`} style={{ transition: "backdrop-filter 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease" }}>
            <p className="font-mono text-[14px] font-semibold text-white">{active.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/60">
              {active.note}
            </p>
          </div>
        </div>
      </div>

      {/* Preset Selectors */}
      <div className="flex w-full flex-col gap-2 lg:w-80">
        {MODIFIERS.map((m) => {
          const isActive = active.name === m.name;
          return (
            <button
              key={m.name}
              onClick={() => setActive(m)}
              className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-left transition-all ${
                isActive
                  ? "bg-white/[0.08] ring-1 ring-inset ring-white/20"
                  : "bg-transparent ring-1 ring-inset ring-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div>
                <p className={`font-mono text-[12.5px] transition-colors ${isActive ? "text-white" : "text-white/60 group-hover:text-white/80"}`}>
                  {m.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {m.note}
                </p>
              </div>
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
