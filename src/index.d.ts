/** Inject the shared refraction filter once. Idempotent. SSR-safe. */
export function ensureFilter(): boolean;

/** Start the cursor-tracking bloom. Returns a teardown. Idempotent. SSR-safe. */
export function initBloomTracker(): () => void;

/** Inject the filter and start the bloom tracker. Returns the tracker teardown. */
export function init(): () => void;

/** Start 3D hover tilt tracking for a specific element. Returns a teardown. */
export function initTiltTracker(el: HTMLElement): () => void;

/** Check custom variables on a .glass-refract element and dynamically apply a custom SVG filter. */
export function updateElementRefraction(el: HTMLElement): void;

/** Watch for added or updated lensed glass elements and ensure they have custom filters applied. Returns a teardown. */
export function initRefractionTracker(): () => void;

export default init;
