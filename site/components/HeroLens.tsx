"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The signature interactive: a draggable glass lens floating over the hero text.
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
    // Offset it slightly upwards so it rests beautifully on the typography
    setPos({ x: (sr.width - lr.width) / 2, y: (sr.height - lr.height) / 2 - 40 });
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
    const lr = lens.getBoundingClientRect();
    offset.current = { x: e.clientX - lr.left, y: e.clientY - lr.top };
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
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {/* The lens itself — pointer-events-auto so it can be grabbed. */}
      <div
        ref={lensRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`glass glass-refract pointer-events-auto absolute grid h-48 w-72 cursor-grab touch-none select-none place-items-center rounded-[32px] active:cursor-grabbing ${
          dragging ? "" : "animate-float"
        }`}
        style={
          pos
            ? { left: pos.x, top: pos.y }
            : { left: "50%", top: "45%", transform: "translate(-50%,-50%)" }
        }
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
          {dragging ? "lensing" : "drag me"}
        </span>
      </div>
    </div>
  );
}
