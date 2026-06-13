"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Reveals children with a soft rise the first time they scroll into view. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "200px 0px 200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
