# GlassFX site

The marketing + playground site for [`glassfx`](../). A Next.js app that
dogfoods the package via a local `file:..` link, so it always reflects the
source in `../src`.

## Develop

```bash
cd site
npm install        # links glassfx from the parent dir
npm run dev
```

## Deploy to Vercel

This app lives in a subdirectory and depends on the package one level up
(`"glassfx": "file:.."`), so when importing the repo into Vercel:

1. **Set the project's Root Directory to `site`.**
2. Leave "Include files outside the Root Directory" **enabled** (the default) —
   Vercel needs the parent `../src` to resolve the `file:..` dependency.
   `next.config.ts` sets `outputFileTracingRoot` to the repo root so the package
   source is bundled.

Framework preset is auto-detected as Next.js (also pinned in `vercel.json`).
No env vars required. Pushing to `main` triggers a deploy.

CLI alternative:

```bash
cd site
vercel            # first run links the project; choose "site" as the root
vercel --prod
```
