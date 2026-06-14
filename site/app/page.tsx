import Nav from "@/components/Nav";
import HeroLens from "@/components/HeroLens";
import Reveal from "@/components/Reveal";
import Controls from "@/components/Controls";
import Playground from "@/components/Playground";

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

        {/* ── HERO: Typography first, floating lens ─────────────────────────── */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center py-20">
          {/* Faint radial gradient background anchor */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[140vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,rgba(139,92,246,0.08)_30%,transparent_70%)] opacity-70" />

          {/* The floating draggable lens stage */}
          <HeroLens />

          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-6xl font-extrabold leading-none tracking-tight text-white sm:text-8xl lg:text-[120px]">
                Glass<span className="text-white/40">FX</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-white/50 sm:text-2xl">
                Real refraction, chromatic dispersion, depth &amp; bloom.<br />
                One class. ~1 KB. Zero dependencies.
              </p>
              <div className="relative z-30 mt-12 flex flex-wrap items-center justify-center gap-4">
                <div className="glass glass-sm glass-refract glass-pill flex items-center gap-3 px-8 py-4 font-mono text-[15px] text-white/80">
                  <span className="text-white/30">$</span> npm i glassfx
                </div>
                <a
                  href="https://github.com/SquareMediaGroup/glassfx"
                  target="_blank"
                  rel="noreferrer"
                  className="glass glass-pill px-8 py-4 text-[15px] font-medium text-white/80 transition hover:text-white"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          </Reveal>
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


        {/* ── RECIPES / COMPONENTS ─────────────────────────────────────── */}
        <section id="recipes" className="section-cv mt-40">
          <Reveal>
            <Label>Recipes</Label>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Copy & paste.
            </h2>
            <p className="mt-6 max-w-2xl text-sm text-white/40">
              Drop these snippets into your project to get up and running faster. Includes our custom <code>&lt;Reveal&gt;</code> component and an AI Agent prompt.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <details className="group rounded-3xl border border-white/10 bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between px-8 py-6 font-mono text-[13px] uppercase tracking-widest text-white/60 outline-none transition-colors group-hover:text-white">
                <span>AI Agent Prompt (e.g. .cursorrules)</span>
                <span className="text-white/40 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <div className="grid gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
                <CodeBlock
                  label=".cursorrules / Agent Instructions"
                  code={`You are an expert AI assistant. This project uses \`glassfx\` for glassmorphism.\n\nInstallation:\nRun \`npm install glassfx\`\n\nUsage in React/Next.js:\n1. Ensure \`<GlassFilter />\` is rendered near the root (e.g. in layout.tsx):\n\`\`\`tsx\nimport { GlassFilter } from "glassfx/react";\nimport "glassfx/glass.css";\n\nexport default function Layout({ children }) {\n  return (\n    <body>\n      <GlassFilter />\n      {children}\n    </body>\n  );\n}\n\`\`\`\n\n2. Use the \`<Glass>\` component for elements that need the glass effect:\n\`\`\`tsx\nimport { Glass } from "glassfx/react";\n\n<Glass strong refract className="rounded-2xl p-6">\n  Content here\n</Glass>\n\`\`\`\n\nNotes:\n- Use \`refract\` for the real refraction effect.\n- Modifiers: \`strong\`, \`sm\`, \`md\`, \`xl\`, \`pill\`, \`opaque\`, \`translucent\`, \`legible-text\`.\n- Elements MUST have a \`border-radius\` for the rim and bloom to follow correctly.\n- Defaults to \`<div>\`; use \`as="button"\` (or other tags) for different tags.`}
                />
              </div>
            </details>
          </Reveal>
          <Reveal delay={150} className="mt-4">
            <details className="group rounded-3xl border border-white/10 bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
              <summary className="flex cursor-pointer items-center justify-between px-8 py-6 font-mono text-[13px] uppercase tracking-widest text-white/60 outline-none transition-colors group-hover:text-white">
                <span>View Component Code (&lt;Reveal&gt;)</span>
                <span className="text-white/40 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <div className="grid gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
                <CodeBlock
                  label="Reveal.tsx"
                  code={`"use client";\n\nimport { useEffect, useRef, useState, type ReactNode } from "react";\n\nexport default function Reveal({\n  children,\n  className = "",\n  delay = 0,\n  as: Tag = "div",\n}: {\n  children: ReactNode;\n  className?: string;\n  delay?: number;\n  as?: "div" | "section" | "li";\n}) {\n  const ref = useRef<HTMLElement>(null);\n  const [seen, setSeen] = useState(false);\n\n  useEffect(() => {\n    const el = ref.current;\n    if (!el || seen) return;\n    const io = new IntersectionObserver(\n      ([entry]) => {\n        if (entry.isIntersecting) {\n          setSeen(true);\n          io.disconnect();\n        }\n      },\n      { threshold: 0.05, rootMargin: "200px 0px 200px 0px" }\n    );\n    io.observe(el);\n    return () => io.disconnect();\n  }, [seen]);\n\n  const Comp = Tag as any;\n  return (\n    <Comp\n      ref={ref}\n      className={\`reveal \${seen ? "is-in" : ""} \${className}\`}\n      style={{ animationDelay: \`\${delay}ms\` }}\n    >\n      {children}\n    </Comp>\n  );\n}`}
                />
                <CodeBlock
                  label="globals.css"
                  code={`.reveal {\n  opacity: 0;\n  transform: translateY(24px);\n}\n.reveal.is-in {\n  animation: rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n\n@keyframes rise {\n  from { opacity: 0; transform: translateY(24px); }\n  to { opacity: 1; transform: translateY(0); }\n}`}
                />
              </div>
            </details>
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
