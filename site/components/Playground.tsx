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
  const [refractStrength, setRefractStrength] = useState(48);
  const [refractDispersion, setRefractDispersion] = useState(6);
  const [refractBlur, setRefractBlur] = useState(5);
  const [tiltMax, setTiltMax] = useState(6);
  const [grainOpacity, setGrainOpacity] = useState(0.025);
  const [backdrop, setBackdrop] = useState<Backdrop>("stripes");

  const grainUrl = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${grainOpacity}'/%3E%3C/svg%3E")`,
    [grainOpacity]
  );

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
        "--glass-refract-strength": refractStrength,
        "--glass-refract-dispersion": refractDispersion,
        "--glass-refract-blur": `${refractBlur}px`,
        "--glass-tilt-max": `${tiltMax}deg`,
        "--glass-grain": grainOpacity > 0 ? grainUrl : "none",
      }) as CSSProperties,
    [tint, alpha, blur, bloom, bloomSize, rim, radius, refractStrength, refractDispersion, refractBlur, tiltMax, grainOpacity, grainUrl]
  );

  const code = useMemo(
    () =>
      `<div\n  class="glass glass-refract"\n  style="\n    --glass-tint: ${hexToRgb(
        tint
      )};\n    --glass-alpha: ${alpha};\n    --glass-blur: ${blur}px;\n    --glass-bloom: ${hexToRgb(
        bloom
      )};\n    --glass-bloom-size: ${bloomSize}px;\n    --glass-rim: ${rim};\n    --glass-radius: ${radius}px;\n    --glass-refract-strength: ${refractStrength};\n    --glass-refract-dispersion: ${refractDispersion};\n    --glass-refract-blur: ${refractBlur}px;\n    --glass-tilt-max: ${tiltMax}deg;\n    --glass-grain: ${
        grainOpacity > 0
          ? `url('data:image/svg+xml,%3Csvg...opacity=\x22${grainOpacity}\x22...%3E')`
          : "none"
      };\n  "\n>…</div>`,
    [tint, alpha, blur, bloom, bloomSize, rim, radius, refractStrength, refractDispersion, refractBlur, tiltMax, grainOpacity]
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
        <div className="glass glass-sm glass-refract glass-pill absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 p-1">
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
      <div className="flex flex-col gap-6 md:col-span-5">
        <div className="glass glass-sm glass-refract rounded-[32px] p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white">Inspector</h3>
          </div>
          
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            
            {/* Core Settings */}
            <div className="flex flex-col gap-5">
              <div className="mb-2 flex items-center gap-6">
                <label className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-haze-dim">
                    Tint
                  </span>
                  <input
                    type="color"
                    value={tint}
                    onChange={(e) => setTint(e.target.value)}
                    className="apple-color"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-haze-dim">
                    Bloom
                  </span>
                  <input
                    type="color"
                    value={bloom}
                    onChange={(e) => setBloom(e.target.value)}
                    className="apple-color"
                  />
                </label>
              </div>
              <Slider label="Alpha" value={alpha} min={0} max={1} step={0.01} onChange={setAlpha} />
              <Slider label="Blur" value={blur} min={0} max={40} step={1} unit="px" onChange={setBlur} />
              <Slider label="Radius" value={radius} min={0} max={120} step={2} unit="px" onChange={setRadius} />
              <Slider label="Rim Light" value={rim} min={0} max={1} step={0.05} onChange={setRim} />
            </div>

            {/* Advanced Filters */}
            <div className="flex flex-col gap-5">
              <Slider label="Refract Strength" value={refractStrength} min={0} max={150} step={2} onChange={setRefractStrength} />
              <Slider label="Refract Dispersion" value={refractDispersion} min={0} max={30} step={1} onChange={setRefractDispersion} />
              <Slider label="Refract Blur" value={refractBlur} min={0} max={20} step={1} unit="px" onChange={setRefractBlur} />
              <div className="my-1 border-t border-white/5" />
              <Slider label="Bloom Size" value={bloomSize} min={60} max={400} step={10} unit="px" onChange={setBloomSize} />
              <Slider label="Hover Tilt (Max)" value={tiltMax} min={0} max={30} step={1} unit="deg" onChange={setTiltMax} />
              <Slider label="Film Grain" value={grainOpacity} min={0} max={0.1} step={0.005} onChange={setGrainOpacity} />
            </div>

          </div>
        </div>
        <CodeBlock code={code} label="Your Component Code" />
      </div>
    </div>
  );
}
