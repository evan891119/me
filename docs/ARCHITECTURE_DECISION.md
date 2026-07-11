# Architecture Decision: First-Person 3D Portfolio Museum

## Status

Accepted for Phase 1. This document is the implementation contract until a later ADR replaces it.

## Confirmed Decisions

- Phase 1 stack: Vite + React + TypeScript + React Three Fiber.
- Package manager: npm.
- Deployment target: Vercel.
- Visual direction: small interactive game-like museum scene, not a traditional portfolio page.
- Mobile strategy: fallback experience for Phase 1, not touch-first navigation.
- First exhibit inventory: six launch exhibits covering lobby, background, project, skills, ideas, and contact.

## Product Context

The project is a desktop-first, browser-based, first-person 3D personal introduction site. Visitors enter a small interactive museum, move with WASD and mouse look, and discover exhibits about background, work, skills, experience, ideas, and contact information.

The first runnable version should prioritize stable movement, readable content, collision, and performance on normal laptops. It should not attempt a full art pass, complex post-processing stack, or large open world.

## Final Recommended Stack

- Build tool: Vite
- UI framework: React
- Language: TypeScript
- 3D renderer: Three.js through React Three Fiber
- Helpers: Drei
- Physics: Rapier through `@react-three/rapier`
- State: Zustand
- Content data: versioned TypeScript or JSON data modules under `src/content/`
- Asset format: GLB / glTF, optimized before commit
- Package manager: npm
- Deployment: static build hosted on Vercel

## Why This Stack

Vite + React Three Fiber is the best fit for this specific product because it balances interactive 3D control with React-based maintainability.

Vite keeps the app as a static front-end site with fast local iteration and a simple production build. The official Vite guide describes Vite as a dev server plus optimized production bundler for modern web projects, which matches this site better than a server-heavy framework.

React Three Fiber lets the 3D scene be composed as React components while still exposing the Three.js ecosystem. Its docs position it as a React renderer for Three.js, and it keeps scene objects declarative and componentized. For this project, that matters because the museum will have many repeatable content-driven exhibit objects.

Drei provides useful camera, loading, controls, text, environment, and helper primitives without requiring custom Three.js plumbing for every basic feature.

Rapier is a good first physics choice because this project needs deterministic character collision, static colliders, simple trigger volumes, and museum-scale movement rather than full game simulation. `@react-three/rapier` also fits the R3F component model.

Zustand is appropriate for local client state that should stay outside React component prop chains: active exhibit, interaction prompt, UI overlay state, pointer lock state, visited exhibits, settings, and debug flags.

## Option Comparison

| Option | Performance | Development Speed | Maintainability | Asset Pipeline | First-Person Interaction | Deployment Difficulty | Fit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vite + React Three Fiber | High if scene is budgeted carefully; minimal app shell overhead | Fast; React components, Drei, Rapier integration | Strong; component boundaries and data-driven exhibits | Strong; Three.js GLB/glTF ecosystem | Strong; custom camera and Rapier character controller possible | Low; static build | Recommended |
| Pure Three.js | Highest ceiling and least abstraction | Slower; more imperative scene wiring | Medium; can become hard to organize as content grows | Strong; native Three.js loaders and tools | Strong but more custom code | Low; static build | Good for engine-heavy work, not best for this content site |
| Babylon.js | High; full engine with many built-ins | Medium-fast for game-like features | Strong inside Babylon patterns, weaker if the rest of site is React-first | Strong; good glTF support and tooling | Strong; engine-level cameras, collisions, inspector | Low-medium; static but engine conventions differ | Viable alternative, but heavier ecosystem switch |
| Next.js + React Three Fiber | Good runtime, more framework overhead | Medium; routing/SSR constraints around canvas | Strong for content/SEO pages, more complex for full-screen client 3D | Strong, same R3F pipeline | Strong after client-only boundaries are handled | Medium; static export or Vercel app config | Better if SEO/content routes become central |
| WebGPU-first | Potentially excellent on supported devices | Slow; ecosystem and fallbacks add complexity | Risky; APIs and library support still maturing | Medium; pipeline still evolving | Possible, but overkill for phase 1 | Medium-high; HTTPS and support constraints | Not recommended for first launch |

## Why Not the Other Options

### Pure Three.js

Pure Three.js gives the most direct control and avoids React abstraction. The downside is project shape. A personal museum site will likely evolve through many content and layout changes. Without the React component model, exhibit composition, overlay UI, interaction state, and content-driven rendering would need more custom architecture. It is a good escape hatch for low-level pieces, not the default app architecture.

### Babylon.js

Babylon.js is a serious browser 3D engine and is strong for game-like scenes, built-in tooling, and engine-level systems. It is not the first choice here because the surrounding site, content overlays, and future UI will be easier to maintain in a React-first stack. Choosing Babylon would be reasonable if the project becomes more like a standalone game with engine tools, advanced materials, editor workflows, or WebXR as a main feature.

### Next.js + React Three Fiber

Next.js is useful when the project needs server-rendered content routes, SEO-heavy pages, API routes, auth, CMS previews, or incremental content publishing. This project starts as an immersive single-page 3D experience. A client-heavy canvas also requires careful SSR boundaries in Next.js. Vite is simpler and keeps early complexity lower. Next.js can be reconsidered if the site later needs separate article pages, a CMS, or server features.

### WebGPU-First

WebGPU is promising and more modern than WebGL, but it is not yet the conservative baseline for a personal site that should run broadly on normal laptops. MDN currently marks WebGPU as limited availability and secure-context only. For this project, WebGPU should be treated as a future optimization path, not the foundation.

## Target Devices

- Primary: desktop and laptop browsers with keyboard and mouse.
- Baseline hardware: ordinary recent laptop with integrated graphics.
- Secondary: tablet/mobile should show a graceful fallback in Phase 1. Touch navigation is deferred unless explicitly prioritized later.
- Browser baseline: modern Chromium, Safari, Firefox, and Edge versions supported by the static host and the chosen library versions.

## Performance Budget

The site should feel responsive before it looks expensive.

- Initial JS budget target: keep the first production build under 500 KB gzipped for app code where feasible, excluding 3D assets.
- Initial asset payload target: under 8 MB compressed for the first playable museum prototype.
- Launch asset payload target: under 15-20 MB compressed unless there is an explicit reason and progressive loading is implemented.
- Frame rate target: 60 fps on normal laptops for the phase 1 world; minimum acceptable sustained frame rate is 45 fps during normal navigation.
- Draw calls target: under 150 visible draw calls in the first prototype; under 250 for launch unless profiling proves acceptable.
- Triangle budget: under 150k visible triangles for the first prototype; under 300k for launch.
- Texture budget: prefer 1K textures for props and exhibits; use 2K only for hero assets that visitors inspect closely.
- Physics budget: static colliders for architecture and exhibits; avoid dynamic rigid bodies unless an interaction requires them.
- Post-processing: none in phase 1; only add later after profiling.
- Loading: show a simple loading state; preload only the first room and stream or lazy-load secondary exhibit assets later.

## Asset Pipeline

Detailed asset conventions are documented in `docs/ASSET_PIPELINE.md`.

Recommended source-to-runtime pipeline:

1. Create or collect source assets in Blender, Figma, image tools, or generated image tools.
2. Export runtime assets as GLB.
3. Optimize GLB assets before commit or release:
   - remove unused meshes, cameras, lights, and materials;
   - merge static meshes where it reduces draw calls without hurting culling;
   - compress geometry with Draco or Meshopt when appropriate;
   - compress textures to KTX2/Basis when the toolchain is ready;
   - keep collision meshes simple and separate from visual meshes.
4. Store source assets outside the runtime bundle if they are large. Commit only runtime-ready assets unless source files are small and useful.
5. Keep content metadata separate from render components:
   - exhibit title, body, tags, links, positions, rotations, asset references, interaction copy, and section membership live in data files;
   - rendering code consumes typed data and does not hard-code portfolio content inside components.

Proposed directories for implementation later:

```text
src/
  app/
  content/
    museum.ts
    exhibits.ts
  world/
    MuseumScene.tsx
    PlayerController.tsx
    physics/
    exhibits/
  ui/
  state/
  assets/
public/
  assets/
    models/
    textures/
docs/
```

## Visual Direction

The accepted prototype visual direction is documented in `docs/VISUAL_DIRECTION.md`.

Summary:

- small interactive game-like museum scene;
- restrained dark architecture with warm exhibit accents;
- readable HTML content overlays instead of long 3D text;
- simple geometry and lightweight GLB assets before final art;
- no complex post-processing in Phase 1;
- visual additions must preserve the performance budget.

## Deployment Strategy

The first launch should be a static deployment:

- `npm run build` produces static assets.
- Static host serves `dist/`.
- Use long-lived cache headers for hashed JS, CSS, textures, and GLB files.
- Keep `index.html` uncached or short-cached.
- Use HTTPS because pointer lock, fullscreen, and future WebGPU/WebXR-related APIs behave best in secure contexts.
- Add lightweight analytics only after the core experience is stable.
- Add error monitoring only if it does not meaningfully increase bundle size.

Deployment target:

- Vercel is the selected Phase 1 deployment target.
- Use Vercel preview deployments for review.
- Keep the build static unless a later requirement introduces server-side behavior.

## Risks and Limits

- Laptop GPU variance: integrated GPUs can struggle with high-poly assets, large textures, shadows, and post-processing.
- Pointer lock UX: users need an obvious way to enter and exit first-person mode.
- Motion sickness: movement speed, camera acceleration, FOV, and head bob must be conservative.
- Accessibility: a full 3D site must still provide readable content and fallback paths for users who cannot comfortably navigate 3D.
- Content maintainability: hard-coded exhibit text inside components would slow iteration and make the site brittle.
- Asset weight: GLB assets can silently become the main performance problem.
- Physics complexity: dynamic interactions are tempting but should wait until the static museum experience is smooth.
- SEO: a canvas-first site is weaker for text discoverability unless important content is mirrored in HTML overlays or static metadata.
- Mobile: first-person controls are desktop-first; Phase 1 should provide fallback instead of implementing touch navigation.

## References Checked

- Vite guide: https://vite.dev/guide/
- React Three Fiber introduction: https://r3f.docs.pmnd.rs/getting-started/introduction
- Three.js docs: https://threejs.org/docs/
- Next.js installation docs: https://nextjs.org/docs/app/getting-started/installation
- MDN WebGPU API: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
