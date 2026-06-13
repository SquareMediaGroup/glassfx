"use client";

const LINKS = [
  { label: "Demo", href: "#demo" },
  { label: "Shapes", href: "#shapes" },
  { label: "Playground", href: "#playground" },
  { label: "Install", href: "#install" },
];

export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass glass-strong glass-pill pointer-events-auto flex items-center gap-1 py-1.5 pl-3 pr-1.5">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight text-white"
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full bg-white"
            style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6)" }}
          />
          GlassFX
        </a>
        <span className="mx-1 hidden h-4 w-px bg-white/15 sm:block" />
        <div className="hidden items-center sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="https://github.com/SquareMediaGroup/glassfx"
          target="_blank"
          rel="noreferrer"
          className="glass glass-pill ml-1 rounded-full px-4 py-1.5 text-sm font-medium text-white transition hover:brightness-125"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
