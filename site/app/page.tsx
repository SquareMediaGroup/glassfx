import Nav from "@/components/Nav";
import HeroLens from "@/components/HeroLens";
import Reveal from "@/components/Reveal";
import Controls from "@/components/Controls";
import Playground from "@/components/Playground";
import EffectsLab from "@/components/EffectsLab";
import FallbackToggle from "@/components/FallbackToggle";
import CodeBlock from "@/components/CodeBlock";
import Backdrop from "@/components/Backdrop";
import { Glass } from "glassfx/react";
import ModifiersShowcase from "@/components/ModifiersShowcase";

const SHAPES: { label: string; cls: string; style?: React.CSSProperties }[] = [
  { label: "circle", cls: "rounded-full h-32 w-32" },
  { label: "pill", cls: "glass-pill h-20 w-44" },
  { label: "squircle", cls: "h-32 w-32 rounded-[34%]" },
  {
    label: "hexagon",
    cls: "h-32 w-32",
    style: {
      clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
      borderRadius: 0,
    },
  },
  {
    label: "blob",
    cls: "h-32 w-36",
    style: { borderRadius: "62% 38% 54% 46% / 49% 56% 44% 51%" },
  },
];

const CLASS_TABLE: [string, string][] = [
  ["glass", "Base material: depth, frost, rim, bloom."],
  ["glass-refract", "Real backdrop lensing + chromatic dispersion (Chromium)."],
  ["glass-strong", "Frosted dark slab — strong, legible."],
  ["glass-sm / -md / -xl", "Frost-amount presets."],
  ["glass-pill", "border-radius: 9999px."],
  ["glass-opaque", "Near-opaque — dropdowns over busy content."],
  ["glass-translucent", "Lighter, more see-through fill."],
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />

      <main id="top" className="relative mx-auto max-w-7xl px-5 pb-40 pt-24 sm:px-8">

        {/* ── HERO: Demo first ─────────────────────────────────────────── */}
        <section className="relative pt-16">
          {/* Faint radial gradient background anchor */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[140vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,rgba(139,92,246,0.08)_30%,transparent_70%)] opacity-70" />

          <Reveal>
            <div className="mx-auto max-w-5xl">
              <HeroLens />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-14 max-w-2xl text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                GlassFX
              </h1>
              <p className="mt-4 text-lg text-white/50">
                Real refraction, chromatic dispersion, depth &amp; bloom.<br />
                One class. ~1 KB. Zero dependencies.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <div className="glass glass-strong glass-pill flex items-center gap-3 px-6 py-3 font-mono text-[14px] text-white/80">
                  <span className="text-white/30">$</span> npm i glassfx
                </div>
                <a
                  href="https://github.com/SquareMediaGroup/glassfx"
                  target="_blank"
                  rel="noreferrer"
                  className="glass glass-pill px-6 py-3 text-[14px] font-medium text-white/80 transition hover:text-white"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── DEMO GRID: The effect speaks ────────────────────────────── */}
        <section id="demo" className="section-cv mt-40">
          <Reveal>
            <Label>The effect</Label>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-12">
            {/* Large refraction card */}
            <Reveal className="md:col-span-8">
              <Glass tilt refract className="relative flex h-[480px] flex-col justify-end overflow-hidden rounded-3xl p-10">
                <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
                <div className="relative">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Refraction
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    Light actually bends.
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-white/50">
                    SVG displacement warps the backdrop with R/G/B pushed apart — real chromatic dispersion, not a blurred overlay.
                  </p>
                </div>
              </Glass>
            </Reveal>

            {/* Stacked right column */}
            <div className="flex flex-col gap-4 md:col-span-4">
              <Reveal delay={80}>
                <Glass tilt strong className="relative flex h-[230px] flex-col justify-end overflow-hidden rounded-3xl p-8">
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Depth</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    Specular edges, real shadow.
                  </h3>
                </Glass>
              </Reveal>
              <Reveal delay={160}>
                <Glass tilt strong className="relative flex h-[230px] flex-col justify-end overflow-hidden rounded-3xl p-8">
                  <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Bloom</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    Cursor-tracking hotspot.
                  </h3>
                  <p className="mt-1 text-sm text-white/40">Hover this card.</p>
                </Glass>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SHAPES ─────────────────────────────────────────────────── */}
        <section id="shapes" className="section-cv mt-40">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <Label>Any shape</Label>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                It follows the silhouette.
              </h2>
              <p className="mt-4 text-sm text-white/40">
                The specular edges, bloom, and displacement automatically trace the contour of the shape. From squircle to pill to custom SVG paths, the glass matches the edge perfectly.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <div className="relative flex flex-wrap items-center justify-center gap-8 overflow-hidden rounded-[40px] px-6 py-16">
                <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
                {SHAPES.map((s) => (
                  <div key={s.label} className="relative flex flex-col items-center gap-3">
                    <Glass
                      tilt
                      refract
                      className={`grid place-items-center ${s.cls}`}
                      style={s.style}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTROLS ───────────────────────────────────────────────── */}
        <section className="section-cv mt-40">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal delay={100} className="order-2 lg:order-1 lg:col-span-8">
              <div className="relative flex min-h-[320px] items-center overflow-hidden rounded-[40px] px-8 py-16">
                <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
                <Controls />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2 lg:col-span-4">
              <Label>Real UI</Label>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Buttons, toggles, fields.
              </h2>
              <p className="mt-4 text-sm text-white/40">
                Turn interactive controls into beautiful, tactile glass hardware.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── MODIFIERS ──────────────────────────────────────────────── */}
        <section className="section-cv mt-40">
          <Reveal>
            <Label>Modifiers</Label>
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One base, many moods.
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ModifiersShowcase />
          </Reveal>
        </section>

        {/* ── PLAYGROUND ─────────────────────────────────────────────── */}
        <section id="playground" className="section-cv mt-40">
          <Reveal>
            <Label>Live playground</Label>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Tune it. Copy it. Ship it.
            </h2>
            <p className="mt-6 max-w-md text-sm text-white/40">
              Every knob is a CSS custom property. Drag the sliders, copy the code.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <Playground />
          </Reveal>
        </section>

        {/* ── EFFECTS LAB ────────────────────────────────────────────── */}
        <section className="section-cv mt-40">
          <Reveal>
            <Label>Effects lab</Label>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Modals, toasts, chrome.
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <div className="relative overflow-hidden rounded-[40px] px-6 py-12">
              <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover" />
              <EffectsLab />
            </div>
          </Reveal>
          {/* chip marquee */}
          <Reveal delay={60} className="mt-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] py-5">
              <div className="relative flex w-max marquee-track gap-3">
                {[...Array(2)].flatMap((_, k) =>
                  ["refraction", "dispersion", "depth", "bloom", "frost", "rim", "tilt", "~1KB", "MIT"].map(
                    (t) => (
                      <span
                        key={`${k}-${t}`}
                        className="glass glass-strong glass-pill whitespace-nowrap px-5 py-2 text-sm text-white/70"
                      >
                        {t}
                      </span>
                    )
                  )
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── INSTALL ────────────────────────────────────────────────── */}
        <section id="install" className="section-cv mt-40">
          <Reveal>
            <Label>Install</Label>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Two lines, any stack.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <CodeBlock
                label="npm"
                code={`import "glassfx";           // injects the lens + bloom\nimport "glassfx/glass.css";  // the styles\n\n<div class="glass glass-refract">…</div>`}
              />
            </Reveal>
            <Reveal delay={80}>
              <CodeBlock
                label="cdn — no build"
                code={`<link rel="stylesheet"\n  href="https://unpkg.com/glassfx/src/glass.css" />\n<script type="module">\n  import "https://unpkg.com/glassfx";\n</script>`}
              />
            </Reveal>
            <Reveal delay={40}>
              <CodeBlock
                label="react"
                code={`import { GlassFilter, Glass } from "glassfx/react";\nimport "glassfx/glass.css";\n\n<GlassFilter />\n<Glass strong refract tilt className="rounded-2xl p-6">\n  Frosted, lensed, tilting.\n</Glass>`}
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="glass glass-strong rounded-2xl p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                  classes
                </p>
                <ul className="mt-3 divide-y divide-white/[0.06]">
                  {CLASS_TABLE.map(([c, d]) => (
                    <li key={c} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
                      <code className="min-w-[150px] font-mono text-[12.5px] text-white">
                        {c}
                      </code>
                      <span className="text-sm text-white/40">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* browser support */}
          <Reveal delay={60} className="mt-12">
            <Label>Browser support — honest about it</Label>
            <p className="mb-6 max-w-2xl text-sm text-white/40">
              Depth, frost, rim and bloom work everywhere with{" "}
              <code className="font-mono text-[13px] text-white/60">backdrop-filter</code>. Real
              refraction is Chromium-only today; Safari and Firefox fall back to a
              clean frost — never a broken box.
            </p>
            <FallbackToggle />
          </Reveal>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="mt-40 border-t border-white/[0.06] pt-10 pb-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-semibold text-white">GlassFX</p>
              <p className="mt-1 text-sm text-white/30">
                Real glass for the web. MIT licensed.
              </p>
            </div>
            <div className="flex items-center gap-5 font-mono text-[12px] text-white/30">
              <a
                href="https://github.com/SquareMediaGroup/glassfx"
                className="transition hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/glassfx"
                className="transition hover:text-white"
              >
                npm
              </a>
              <a href="#top" className="transition hover:text-white">
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
