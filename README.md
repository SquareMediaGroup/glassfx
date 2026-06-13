# glassfx

**Real-refraction glassmorphism for any element.** Backdrop lensing, chromatic
dispersion, depth, a lit rim, and a cursor-tracking bloom — from one class.
Pure CSS plus ~1 KB of JS, framework-agnostic, with an automatic graceful
fallback where real refraction isn't supported.

```html
<div class="glass glass-refract" style="border-radius: 22px; padding: 24px">
  Anything behind this element bends and splits into colour at the edges.
</div>
```

- **Real refraction** — an SVG `feDisplacementMap` fed into `backdrop-filter`
  genuinely warps the backdrop, with R/G/B displaced separately for true
  chromatic dispersion (not a faked gradient).
- **Depth** — specular top edge, layered elevation shadow, a masked gradient rim.
- **Bloom** — a soft specular hotspot that follows the cursor (and a keyboard
  `:focus-within` equivalent).
- **Graceful by design** — real lensing runs on Chromium; Safari/Firefox fall
  back to depth + frost so a glass surface is never broken or empty. Refraction
  is dropped under 768px to keep phones cheap. Honors `prefers-reduced-motion`
  and `prefers-reduced-transparency`.
- **Tiny & buildless** — ships as plain CSS + ESM JS. No build step, CDN-ready.

> Refraction (`backdrop-filter: url()`) is currently Chromium-only. Everything
> else — depth, frost, rim, bloom — works in every browser with
> `backdrop-filter`.

---

## Install

```bash
npm install glassfx
```

```js
import "glassfx";            // injects the lens filter + starts the bloom
import "glassfx/glass.css";  // the styles
```

### Or from a CDN — no build, no npm

```html
<link rel="stylesheet" href="https://unpkg.com/glassfx/src/glass.css" />
<script type="module">
  import "https://unpkg.com/glassfx";
</script>
```

That's it. Now add the classes to any element.

---

## Usage

Add `glass` to any element **that has a `border-radius`** (the rim and bloom
follow it). Add `glass-refract` for real lensing.

```html
<div class="glass glass-refract" style="border-radius: 20px; padding: 24px">…</div>
```

### React

```jsx
import { GlassFilter, Glass } from "glassfx/react";
import "glassfx/glass.css";

function App() {
  return (
    <>
      <GlassFilter />               {/* mount once, near the root */}
      <Glass strong refract className="rounded-2xl p-6">
        Frosted, lensed, blooming.
      </Glass>
    </>
  );
}
```

`<Glass>` defaults to a `<div>`; pass `as` for any tag or component
(`<Glass as="button" pill>`). Boolean props map to the modifier classes below.

---

## Classes

| Class | Effect |
| --- | --- |
| `glass` | The base material: depth, frost, rim, bloom. |
| `glass-refract` | Adds real backdrop lensing + chromatic dispersion (Chromium). |
| `glass-strong` | Frosted dark slab — strong, legible (headers/toolbars). |
| `glass-sm` / `glass-md` / `glass-xl` | Frost amount presets. |
| `glass-pill` | `border-radius: 9999px`. |
| `glass-opaque` | Near-opaque fill — dropdowns/popovers over busy content. |
| `glass-translucent` | Lighter, more see-through fill. |
| `glass-legible-text` | Faint text-shadow to keep labels crisp on translucent glass. |

Combine freely: `glass glass-strong glass-refract glass-pill`.

---

## Theming

Override the custom properties on `:root`, on `.glass`, or per element.

```css
:root {
  --glass-tint: 30, 38, 48;   /* surface colour, "r, g, b" */
  --glass-alpha: 0.16;        /* surface opacity */
  --glass-blur: 14px;         /* frost amount */
  --glass-bloom: 255, 255, 255; /* bloom colour, "r, g, b" */
  --glass-bloom-size: 200px;  /* bloom radius */
  --glass-saturate: 1.4;
  --glass-brightness: 1.05;
  --glass-rim: 0.5;           /* lit-edge brightness */
  --glass-sheen: 0.14;        /* diagonal highlight */
}
```

```html
<!-- per-element brand tint -->
<div class="glass glass-refract" style="--glass-tint: 245,128,33; --glass-alpha:.5; border-radius:20px"></div>
```

### Tuning the refraction

The lens lives in `src/index.js`. The three `feDisplacementMap` `scale` values
(`42 / 48 / 54`) are the knobs: their **mean** (48) is refraction depth, their
**spread** (±6) is colour separation. Widen the spread for stronger fringing,
narrow it for subtler.

---

## How it works

- **Depth** is a `box-shadow` stack (inset specular + shade, plus elevation) and
  a masked-gradient `::before` rim. Pure CSS, every browser.
- **Refraction** is one shared SVG filter, injected once into the document by
  the JS. It builds a displacement map from filter primitives (edge-distance
  ramp → signed lens vectors), then displaces the backdrop three times at
  staggered strengths and recombines the R/G/B channels — so colours separate
  at the rim. It's applied via `backdrop-filter: url(#glassfx-refract)` behind
  an `@supports` gate.
- **Bloom** is a radial-gradient `::after`; the JS writes the pointer position
  into `--glass-mx/--glass-my` so the glow tracks the cursor. Without the JS it
  still blooms from the centre on hover.

CSS-only is fine for depth + frost + bloom. The JS is required only for real
refraction (it injects the filter) and for *cursor-tracked* (vs centred) bloom.

---

## Browser support

| | Depth · frost · rim · bloom | Real refraction |
| --- | --- | --- |
| Chrome / Edge / Chromium | ✅ | ✅ |
| Safari | ✅ | ⛔ → falls back to frost |
| Firefox | ✅ | ⛔ → falls back to frost |
| Mobile (<768px) | ✅ | dropped for GPU cost → frost |

Requires `backdrop-filter` (all current browsers).

---

## License

MIT © Square Media Group
