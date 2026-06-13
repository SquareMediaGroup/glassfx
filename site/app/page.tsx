import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import HeroLens from "@/components/HeroLens";
import Reveal from "@/components/Reveal";
import Controls from "@/components/Controls";
import Playground from "@/components/Playground";
import EffectsLab from "@/components/EffectsLab";
import FallbackToggle from "@/components/FallbackToggle";
import CodeBlock from "@/components/CodeBlock";
import { Glass } from "glassfx/react";

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

const MODIFIERS = [
  { cls: "glass", name: "glass", note: "the base material" },
  { cls: "glass glass-refract", name: "glass-refract", note: "real lensing" },
  { cls: "glass glass-strong", name: "glass-strong", note: "frosted dark slab" },
  { cls: "glass glass-strong glass-opaque", name: "glass-opaque", note: "near-solid" },
  { cls: "glass glass-translucent", name: "glass-translucent", note: "see-through" },
  { cls: "glass glass-sm", name: "glass-sm", note: "less frost" },
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-haze-dim">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />

      <main id="top" className="relative mx-auto max-w-6xl px-5 pb-40 pt-48 sm:px-8">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="pt-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-haze-dim">
              MIT · ~1KB · drop-in · zero deps
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-4xl text-[16vw] leading-[0.9] tracking-tighter sm:text-[110px]">
              Real glass.
              <br />
              <span className="italic text-[#ff3b30]">One class.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-haze/80">
              GlassFX bends light for real — refraction, chromatic dispersion,
              depth and a cursor-tracking bloom. Add{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px]">
                glass
              </code>{" "}
              to any element. That&rsquo;s the whole API.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#playground"
                className="glass glass-strong glass-pill px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-125"
              >
                Try the playground
              </a>
              <a
                href="#install"
                className="glass glass-pill px-7 py-3.5 text-sm font-medium text-white transition hover:brightness-125"
              >
                Install
              </a>
              <div className="glass glass-strong glass-pill flex items-center gap-3 px-5 py-3 font-mono text-[13px] text-haze">
                <span className="text-haze-dim">$</span> npm i glassfx
              </div>
            </div>
          </Reveal>

          <HeroLens />
        </section>

        {/* ── Pillars ──────────────────────────────────────────────────── */}
        <section id="showcase" className="section-cv mt-32">
          <Reveal>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">
              Three things, none of them faked.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <Reveal delay={0}>
              <Glass tilt refract className="relative h-full overflow-hidden rounded-3xl p-7">
                <div className="stage-stripes absolute inset-0 -z-[1] opacity-70" />
                <h3 className="text-2xl text-white">Refraction</h3>
                <p className="mt-2 text-sm text-haze/85">
                  An SVG displacement lens warps the actual backdrop, with R/G/B
                  pushed apart for true chromatic dispersion. The stripes behind
                  this card bend — they aren&rsquo;t painted on.
                </p>
              </Glass>
            </Reveal>
            <Reveal delay={90} className="md:mt-12">
              <Glass tilt strong className="h-full rounded-3xl p-7">
                <h3 className="text-2xl text-white">Depth</h3>
                <p className="mt-2 text-sm text-haze/85">
                  A specular top edge, a lit gradient rim and a layered elevation
                  shadow give the surface real thickness — not a flat blur.
                </p>
              </Glass>
            </Reveal>
            <Reveal delay={180} className="md:mt-24">
              <Glass tilt strong className="h-full rounded-3xl p-7">
                <h3 className="text-2xl text-white">Bloom</h3>
                <p className="mt-2 text-sm text-haze/85">
                  A soft specular hotspot follows your cursor across the surface,
                  with a keyboard-focus equivalent. Hover this card and move
                  around.
                </p>
              </Glass>
            </Reveal>
          </div>
        </section>

        {/* ── Shapes ───────────────────────────────────────────────────── */}
        <section id="shapes" className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Any shape</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">
              It follows the silhouette.
            </h2>
            <p className="mt-4 max-w-xl text-haze/75">
              The rim and bloom inherit the border-radius — or any{" "}
              <code className="font-mono text-[13px]">clip-path</code>. Circles,
              pills, squircles, blobs, polygons.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="stage-stripes relative mt-10 flex flex-wrap items-center justify-center gap-8 overflow-hidden rounded-3xl px-6 py-14">
              <div className="absolute inset-0 bg-black/15" />
              {SHAPES.map((s) => (
                <div key={s.label} className="relative flex flex-col items-center gap-3">
                  <Glass
                    tilt
                    refract
                    className={`grid place-items-center ${s.cls}`}
                    style={s.style}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Buttons & controls ───────────────────────────────────────── */}
        <section className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Real UI</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">Buttons, toggles, fields.</h2>
            <p className="mt-4 max-w-xl text-haze/75">
              Not just decoration — usable controls with the bloom on hover and
              focus. Every element below is plain markup plus a glass class.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="stage-stripes relative mt-10 overflow-hidden rounded-3xl px-6 py-12">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative">
                <Controls />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Modifier matrix ──────────────────────────────────────────── */}
        <section className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Modifiers</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">One base, many moods.</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="stage-stripes relative mt-10 grid gap-4 overflow-hidden rounded-3xl p-6 sm:grid-cols-3">
              <div className="absolute inset-0 bg-black/25" />
              {MODIFIERS.map((m) => (
                <div
                  key={m.name}
                  className={`${m.cls} relative grid h-32 place-items-center rounded-2xl text-center`}
                >
                  <div>
                    <p className="font-mono text-[12px] text-white">{m.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
                      {m.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Playground ───────────────────────────────────────────────── */}
        <section id="playground" className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Live playground</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">Tune it. Copy it. Ship it.</h2>
            <p className="mt-4 max-w-xl text-haze/75">
              Every knob is a CSS custom property the package exposes. Drag the
              sliders, switch the backdrop, copy the exact code.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <Playground />
          </Reveal>
        </section>

        {/* ── Effects lab ──────────────────────────────────────────────── */}
        <section className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Effects lab</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">Modals, toasts, chrome.</h2>
            <p className="mt-4 max-w-xl text-haze/75">
              Drop it on overlays and chrome too. Open a glass dialog over a
              dimmed scrim, or fire a frosted toast.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="stage-stripes relative mt-10 overflow-hidden rounded-3xl px-6 py-12">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative">
                <EffectsLab />
              </div>
            </div>
          </Reveal>
          {/* chip marquee */}
          <Reveal delay={60} className="mt-5">
            <div className="relative overflow-hidden rounded-3xl py-6">
              <div className="stage-stripes absolute inset-0 opacity-70" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative flex w-max marquee-track gap-3">
                {[...Array(2)].flatMap((_, k) =>
                  ["refraction", "dispersion", "depth", "bloom", "frost", "rim", "themeable", "~1KB", "MIT"].map(
                    (t) => (
                      <span
                        key={`${k}-${t}`}
                        className="glass glass-strong glass-pill whitespace-nowrap px-5 py-2 text-sm text-white"
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

        {/* ── Install / code ───────────────────────────────────────────── */}
        <section id="install" className="section-cv mt-32">
          <Reveal>
            <Eyebrow>Install</Eyebrow>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">Two lines, any stack.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <CodeBlock
                label="npm"
                code={`import "glassfx";           // injects the lens + bloom\nimport "glassfx/glass.css";  // the styles\n\n<div class="glass glass-refract">…</div>`}
              />
            </Reveal>
            <Reveal delay={90}>
              <CodeBlock
                label="cdn — no build"
                code={`<link rel="stylesheet"\n  href="https://unpkg.com/glassfx/src/glass.css" />\n<script type="module">\n  import "https://unpkg.com/glassfx";\n</script>`}
              />
            </Reveal>
            <Reveal delay={60}>
              <CodeBlock
                label="react"
                code={`import { GlassFilter, Glass } from "glassfx/react";\nimport "glassfx/glass.css";\n\n<GlassFilter />\n<Glass strong refract className="rounded-2xl p-6">\n  Frosted, lensed, blooming.\n</Glass>`}
              />
            </Reveal>
            <Reveal delay={150}>
              <div className="glass glass-strong rounded-2xl p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-haze-dim">
                  classes
                </p>
                <ul className="mt-3 divide-y divide-white/8">
                  {CLASS_TABLE.map(([c, d]) => (
                    <li key={c} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
                      <code className="min-w-[150px] font-mono text-[12.5px] text-white">
                        {c}
                      </code>
                      <span className="text-sm text-haze/75">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* browser support + fallback toggle */}
          <Reveal delay={80} className="mt-12">
            <Eyebrow>Browser support — honest about it</Eyebrow>
            <p className="mb-6 max-w-2xl text-haze/75">
              Depth, frost, rim and bloom work everywhere with{" "}
              <code className="font-mono text-[13px]">backdrop-filter</code>. Real
              refraction is Chromium-only today; Safari and Firefox fall back to a
              clean frost — never a broken box. See for yourself:
            </p>
            <FallbackToggle />
          </Reveal>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="mt-32 border-t border-white/10 pt-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl">GlassFX</p>
              <p className="mt-1 text-sm text-haze/60">
                Real glass for the web. MIT licensed.
              </p>
            </div>
            <div className="flex items-center gap-5 font-mono text-[12px] text-haze/70">
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
