# me

First-person 3D portfolio museum, built as a desktop-first Vite + React + TypeScript + React Three Fiber app.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Preview

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Use `/?forceFallback=1` to verify the non-WebGL contact path. Development-only QA routes include `/?scene=interior`, `/?spawn=garden`, `/?spawn=signal`, `/?spawn=archive`, `/?qaTransition=entry`, `/?qaTransition=exit`, `/?qaPointer=locked`, `/?qaPointer=paused`, and `/?content=signal-fragment`. Production always starts at the exterior Museum Plaza.

## Vercel

Deploy as a static Vite project with:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: current Vercel LTS

Hashed files under `dist/assets/` can use immutable caching. `index.html` should remain revalidated by Vercel so new deployments pick up the latest asset hashes.

## Runtime Assets

Place optimized runtime GLB files under `public/assets/models/` and reference them from exhibit media data. Standard and Meshopt-compressed GLB files are supported through the optional local model-loader chunk; Draco remains disabled. See `docs/ASSET_PIPELINE.md` for naming, size, geometry, and transform rules.

Outdoor zones, landmarks, and easter eggs are maintained in `src/content/exteriorWorld.ts`. Add future hidden content to `worldDiscoveries`; no new render component is required.

The Signal Yard uses `public/assets/models/landmark-signal-tower.v1.glb`, with the former primitive tower retained as its loading and error fallback. Regenerate the model with `node scripts/generate-signal-tower.mjs`; asset measurements and A/B results are recorded in `docs/ASSET_PIPELINE.md` and `docs/PERFORMANCE_NOTES.md`.

The museum entrance uses `public/assets/models/landmark-museum-entrance.v1.glb` for its decorative frame while retaining the original facade and colliders. Regenerate it with `node scripts/generate-museum-entrance.mjs`.

The Garden Overlook uses `public/assets/models/prop-garden-bench.v1.glb` with one invisible primitive collider and a visible primitive fallback. Regenerate it with `node scripts/generate-garden-bench.mjs`.

## Project Notes

- Architecture decision: `docs/ARCHITECTURE_DECISION.md`
- Product spec: `docs/PRODUCT_SPEC.md`
- Linear issue drafts: `docs/LINEAR_ISSUES.md`
- World completion plan: `docs/WORLD_COMPLETION_PLAN.md`
- Launch checklist: `docs/LAUNCH_CHECKLIST.md`
