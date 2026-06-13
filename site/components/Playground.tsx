"use client";

import { useMemo, useState, type CSSProperties } from "react";
import CodeBlock from "./CodeBlock";

function hexToRgb(hex: string): string {
  const m = hex.replace("#", "");
  const n = parseInt(
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m,
    16
  );
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

type Backdrop = "stripes" | "spectrum" | "photo";

const BACKDROPS: Record<Backdrop, CSSProperties> = {
  stripes: {},
  spectrum: {
    background:
      "conic-gradient(from 0deg, #ff5d3b, #ffb23b, #34e0a1, #2fa9ff, #8b5cf6, #ff4d8d, #ff5d3b)",
  },
  photo: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=70')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-haze-dim">
          {label}
        </span>
        <span className="font-mono text-[11px] text-haze">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        className="glass-range w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

export default function Playground() {
  const [tint, setTint] = useState("#1e2630");
  const [alpha, setAlpha] = useState(0.5);
  const [blur, setBlur] = useState(14);
  const [bloom, setBloom] = useState("#ffffff");
  const [bloomSize, setBloomSize] = useState(200);
  const [rim, setRim] = useState(0.5);
  const [radius, setRadius] = useState(28);
  const [backdrop, setBackdrop] = useState<Backdrop>("stripes");

  const style = useMemo<CSSProperties>(
    () =>
      ({
        "--glass-tint": hexToRgb(tint),
        "--glass-alpha": alpha,
        "--glass-blur": `${blur}px`,
        "--glass-bloom": hexToRgb(bloom),
        "--glass-bloom-size": `${bloomSize}px`,
        "--glass-rim": rim,
        "--glass-radius": `${radius}px`,
      }) as CSSProperties,
    [tint, alpha, blur, bloom, bloomSize, rim, radius]
  );

  const code = useMemo(
    () =>
      `<div\n  class="glass glass-refract"\n  style="\n    --glass-tint: ${hexToRgb(
        tint
      )};\n    --glass-alpha: ${alpha};\n    --glass-blur: ${blur}px;\n    --glass-bloom: ${hexToRgb(
        bloom
      )};\n    --glass-bloom-size: ${bloomSize}px;\n    --glass-rim: ${rim};\n    --glass-radius: ${radius}px;\n  "\n>…</div>`,
    [tint, alpha, blur, bloom, bloomSize, rim, radius]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Live preview */}
      <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-3xl">
        <div
          className={`absolute inset-0 ${backdrop === "stripes" ? "stage-stripes" : ""}`}
          style={BACKDROPS[backdrop]}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="glass glass-refract relative grid h-44 w-72 place-items-center text-center"
          style={style}
        >
          <div>
            <p className="font-display text-2xl">Live glass</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-haze/70">
              hover · drag the sliders
            </p>
          </div>
        </div>

        {/* backdrop switch */}
        <div className="glass glass-strong glass-pill absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 p-1">
          {(["stripes", "spectrum", "photo"] as Backdrop[]).map((b) => (
            <button
              key={b}
              onClick={() => setBackdrop(b)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition ${
                backdrop === b ? "bg-white text-black" : "text-haze/70 hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Controls + live code */}
      <div className="flex flex-col gap-5">
        <div className="glass glass-strong rounded-3xl p-5">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-haze-dim">
                  tint
                </span>
                <input
                  type="color"
                  value={tint}
                  onChange={(e) => setTint(e.target.value)}
                  className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-haze-dim">
                  bloom
                </span>
                <input
                  type="color"
                  value={bloom}
                  onChange={(e) => setBloom(e.target.value)}
                  className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                />
              </label>
            </div>
            <Slider label="alpha" value={alpha} min={0} max={1} step={0.01} onChange={setAlpha} />
            <Slider label="blur" value={blur} min={0} max={40} step={1} unit="px" onChange={setBlur} />
            <Slider label="bloom size" value={bloomSize} min={60} max={400} step={10} unit="px" onChange={setBloomSize} />
            <Slider label="rim" value={rim} min={0} max={1} step={0.05} onChange={setRim} />
            <Slider label="radius" value={radius} min={0} max={120} step={2} unit="px" onChange={setRadius} />
          </div>
        </div>
        <CodeBlock code={code} label="your glass" />
      </div>
    </div>
  );
}
