# Performance Notes

## Status

Phase 6.1 instrumentation is implemented for development builds.
Phase 6.2 baseline optimization is implemented for the first playable prototype.

## Development Panel

Run the site with:

```bash
npm run dev
```

The development build shows a small performance panel in the lower-left corner. It is hidden in production builds through `import.meta.env.DEV`.

The panel reports:

- FPS
- average frame time
- WebGL render calls
- rendered triangles
- rendered lines
- rendered points
- transferred resource bytes reported by the browser Resource Timing API

## Interpretation

The panel is intended for quick local review while changing scene complexity. It is not a replacement for a production bundle analyzer or a formal trace.

Use it to catch obvious regressions:

- draw calls rising after adding exhibit objects;
- triangle count rising after adding GLB assets;
- frame time crossing the project budget on a normal laptop;
- transferred bytes growing after adding models or textures.

## Known Limits

- Pointer lock behavior still requires manual browser testing.
- Development server transfer sizes can differ from production deployment sizes.
- Browser resource timing may report `0` transferred bytes for cached or locally served resources.
- Rapier is the dominant JavaScript cost. Replacing or deferring physics should be a deliberate product decision, not a cleanup task.

## Phase 6.2 Baseline

Build command:

```bash
npm run build
```

Production bundle after chunk splitting:

| Chunk | Minified | Gzip |
| --- | ---: | ---: |
| App | 14.09 KB | 4.95 KB |
| CSS | 6.27 KB | 1.77 KB |
| React vendor | 200.95 KB | 63.41 KB |
| Three/R3F vendor | 854.34 KB | 228.46 KB |
| Rapier physics vendor | 2,261.60 KB | 843.82 KB |

Runtime baseline captured from the development panel on the current test machine:

| Metric | Baseline |
| --- | ---: |
| FPS | 144 |
| Frame time | 6.9 ms |
| Draw calls | 15 |
| Triangles | 180 |
| Lines | 0 |
| Points | 0 |
| Dev transfer | 6.7 KB |

Current asset state:

- No committed GLB models.
- No committed texture payload.
- `public/assets` only contains placeholder `.gitkeep` files.

The Vite chunk warning limit is set to 2,300 KB to reflect the current Rapier vendor baseline. This keeps the build signal useful for this 3D app while still warning if the physics chunk grows materially beyond the baseline.

## Phase 6.2 Decisions

- App code is split from heavy vendor code through Vite manual chunks.
- `@react-three/drei` imports use the direct `PointerLockControls` entry instead of the package barrel.
- No post-processing is present.
- No model or texture optimization is required yet because no production assets are committed.
- Lazy loading is deferred until the first real GLB or texture assets exist; there is no meaningful asset payload to stream yet.
