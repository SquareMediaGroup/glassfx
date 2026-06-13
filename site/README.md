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

The repo is an **npm workspace** (root `package.json` declares
`"workspaces": ["site"]`), and this app depends on the package one level up
(`"glassfx": "file:.."`). Because of the workspace, Vercel detects a monorepo
and automatically includes the parent package in the build.

When importing the repo into Vercel:

1. **Set the project's Root Directory to `site`.** Vercel detects the workspace
   root above it and installs/links the `glassfx` package from there.
2. That's it — framework is auto-detected as Next.js (also pinned in
   `vercel.json`), no env vars, and `next.config.ts` sets
   `outputFileTracingRoot` to the repo root so the package source is bundled.

Pushing to `main` triggers a deploy.

CLI alternative:

```bash
cd site
vercel            # first run links the project; choose "site" as the root
vercel --prod
```
