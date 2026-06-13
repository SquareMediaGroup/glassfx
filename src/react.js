/**
 * glassfx/react — thin React bindings over the vanilla core.
 *
 * Authored with React.createElement (no JSX) so the package ships buildless
 * and runs straight from npm or a CDN. React is an optional peer dependency.
 *
 *   import { GlassFilter, Glass } from "glassfx/react";
 *   import "glassfx/glass.css";
 *
 *   <GlassFilter />                      // mount once, near the app root
 *   <Glass strong refract className="rounded-2xl p-6">…</Glass>
 *
 * @license MIT
 */

import { createElement, useEffect, useMemo } from "react";
import { ensureFilter, initBloomTracker } from "./index.js";

/**
 * Ensures the refraction filter is injected and the bloom tracker is running.
 * Render once, anywhere in the tree. Renders nothing.
 */
export function GlassFilter() {
  useEffect(() => {
    ensureFilter();
    const stop = initBloomTracker();
    return stop;
  }, []);
  return null;
}

/**
 * Hook form of <GlassFilter/> for apps that prefer effects over elements.
 */
export function useGlass() {
  useEffect(() => {
    ensureFilter();
    return initBloomTracker();
  }, []);
}

/**
 * Build the glassfx className string from boolean props.
 * @param {object} [opts]
 * @returns {string}
 */
export function glassClassName(opts = {}) {
  const {
    refract = false,
    strong = false,
    pill = false,
    opaque = false,
    translucent = false,
    size, // "sm" | "md" | "xl"
    className = "",
  } = opts;
  return [
    "glass",
    refract && "glass-refract",
    strong && "glass-strong",
    pill && "glass-pill",
    opaque && "glass-opaque",
    translucent && "glass-translucent",
    size && `glass-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Convenience element. Defaults to a <div>; pass `as` for any tag/component.
 * All boolean modifier props map to the matching glass-* class.
 *
 * Props: as, refract, strong, pill, opaque, translucent, size, className,
 * plus any standard element props (children, style, onClick, …).
 */
export function Glass(props) {
  const {
    as = "div",
    refract,
    strong,
    pill,
    opaque,
    translucent,
    size,
    className,
    ...rest
  } = props;

  const cls = useMemo(
    () =>
      glassClassName({ refract, strong, pill, opaque, translucent, size, className }),
    [refract, strong, pill, opaque, translucent, size, className]
  );

  return createElement(as, { className: cls, ...rest });
}

export default Glass;
