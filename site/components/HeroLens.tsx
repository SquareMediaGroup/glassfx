"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The signature interactive: a draggable glass lens floating over the hero's
 * vivid backdrop. Drag it around to watch the colour behind it bend and split.
 * Floats gently when idle; the package's cursor-bloom tracks underneath.
 */
export default function HeroLens() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Centre the lens once we know the stage size.
  useEffect(() => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    const sr = stage.getBoundingClientRect();
    const lr = lens.getBoundingClientRect();
    setPos({ x: (sr.width - lr.width) / 2, y: (sr.height - lr.height) / 2 });
  }, []);

  const clamp = useCallback((x: number, y: number) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return { x, y };
    const sr = stage.getBoundingClientRect();
    const lr = lens.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(x, sr.width - lr.width)),
      y: Math.max(0, Math.min(y, sr.height - lr.height)),
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const sr = stage.getBoundingClientRect();
    const lr = lens.getBoundingClientRect();
    offset.current = { x: e.clientX - lr.left, y: e.clientY - lr.top };
    void sr;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const stage = stageRef.current;
    if (!stage) return;
    const sr = stage.getBoundingClientRect();
    setPos(
      clamp(
        e.clientX - sr.left - offset.current.x,
        e.clientY - sr.top - offset.current.y
      )
    );
  };

  const endDrag = () => setDragging(false);

  return (
    <div
      ref={stageRef}
      className="relative mt-12 h-[340px] w-full overflow-hidden rounded-[28px] sm:h-[420px]"
    >
      {/* Bright, high-frequency content for the lens to refract. */}
      <div className="stage-stripes absolute inset-0 opacity-90" />
      <div
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{
          background:
            "radial-gradient(40% 60% at 30% 40%, #fff8, transparent 60%), radial-gradient(40% 60% at 75% 70%, #2fa9ff88, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <p className="font-display text-[15vw] leading-none text-white/10 sm:text-[120px]">
          refract
        </p>
      </div>

      {/* The lens itself — real package classes. */}
      <div
        ref={lensRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`glass glass-refract absolute grid h-32 w-52 cursor-grab touch-none select-none place-items-center rounded-[26px] active:cursor-grabbing ${
          dragging ? "" : "animate-float"
        }`}
        style={
          pos
            ? { left: pos.x, top: pos.y }
            : { left: "50%", top: "50%", transform: "translate(-50%,-50%)" }
        }
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
          {dragging ? "lensing" : "drag me"}
        </span>
      </div>
    </div>
  );
}
