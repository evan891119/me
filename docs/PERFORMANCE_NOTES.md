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

## Fallback Check

Use this URL while the dev server or preview server is running:

```text
/?forceFallback=1
```

Expected result:

- the Canvas does not mount;
- the fallback message is visible;
- the contact link remains available;
- the page is not blank.

## Phase 6.2 Baseline

Build command:

```bash
npm run build
```

Production bundle after chunk splitting:

| Chunk | Minified | Gzip |
| --- | ---: | ---: |
| App | 20.69 KB | 7.03 KB |
| CSS | 7.01 KB | 1.91 KB |
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

## Exterior World Budget

The current exterior direction is a compact explorable hub, not a city-scale open world. New zones and discoveries must stay inside this budget until measured results justify changing it.

| Metric | Target | Hard Cap |
| --- | ---: | ---: |
| Exterior draw calls | 30-60 | 100 |
| Exterior visible triangles | 20k-50k | 100k |
| Exterior texture payload | 1-2 MB | 3 MB |
| Dynamic lights | 0-1 | 1 |
| Real-time shadows | 0 | 1 only after profiling |
| Dynamic physics bodies | 0 | 0 |

Implementation rules:

- use static colliders only for ground, entry, and boundaries;
- represent distant scenery with silhouettes, billboards, fog, or background color;
- avoid post-processing, particles, animated foliage, crowds, vehicles, and dynamic weather;
- measure the development panel immediately after the primitive exterior blockout lands;
- update this file with the measured draw calls, triangles, FPS, and frame time after implementation.

## Phase 7.6 Exterior Blockout Check

The primitive exterior arrival blockout was checked in Chrome headless with SwiftShader WebGL. This confirms render cost shape, but the FPS and frame time are not representative of a hardware-accelerated browser.

| Metric | Headless SwiftShader Result |
| --- | ---: |
| FPS | 9 |
| Frame time | 110.2 ms |
| Draw calls | 28 |
| Triangles | 326 |
| Lines | 0 |
| Points | 0 |
| Dev transfer | 8.18 MB |

Interpretation:

- draw calls and triangles remain far below the exterior hard caps;
- no GLB models or texture payload were added;
- FPS must be rechecked manually in a normal desktop browser because headless SwiftShader is CPU-bound and not comparable to the earlier hardware baseline.

## Phase 7.7 Exterior Atmosphere Check

The lightweight exterior atmosphere pass was checked in Chrome headless with SwiftShader WebGL. This pass added a sky dome, background distance layer, skyline silhouettes, path edge accents, and shared material tokens. No GLB models, textures, post-processing, particles, or dynamic shadows were added.

| Metric | Headless SwiftShader Result |
| --- | ---: |
| FPS | 60 |
| Frame time | 16.7 ms |
| Draw calls | 32 |
| Triangles | 1,322 |
| Lines | 0 |
| Points | 0 |
| Dev transfer | 8.19 MB |

Interpretation:

- draw calls and triangles remain well below the exterior hard caps;
- the app gzip size increased modestly to support reusable world materials and atmosphere components;
- no runtime asset payload was introduced;
- FPS should still be rechecked manually in a normal hardware-accelerated desktop browser before launch.

## Phase 7.8-7.10 World Completion Check

The interior material kit, shared primitive resources, spatial guidance, six exhibit display variants, and optional GLB loading layer were checked in the hardware-accelerated Codex in-app browser.

Runtime results at the default desktop viewport:

| Scene | FPS | Frame time | Draw calls | Triangles | Dev transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| Exterior spawn | 140 | 7.1 ms | 64 | 1,706 | 35.9 KB |
| Interior entry | 137 | 7.3 ms | 41 | 1,440 | 10.3 KB |

Laptop layout check at `1024x768`:

- 139 FPS and 7.2 ms at the exterior spawn;
- no overlap between the title HUD and exhibit index;
- no overlap between the performance panel and entry controls;
- six exhibit index entries remain visible;
- the entrance remains centered and readable.

Current production build:

| Chunk | Minified | Gzip | Initial preload |
| --- | ---: | ---: | --- |
| App | 26.03 KB | 8.58 KB | Yes |
| CSS | 7.30 KB | 1.99 KB | Yes |
| React vendor | 201.12 KB | 63.47 KB | Yes |
| Three/R3F vendor | 856.81 KB | 229.49 KB | Yes |
| Rapier physics vendor | 2,261.61 KB | 843.82 KB | Yes |
| Optional model loader with Meshopt | 66.18 KB | 18.77 KB | No |
| Optional model component | 0.90 KB | 0.54 KB | No |

Interpretation:

- the complete primitive world remains far below the draw-call and triangle hard caps;
- no GLB or texture runtime payload is committed;
- the GLB loader and model component are not module-preloaded and are requested only after model media is configured;
- standard and Meshopt-compressed GLB files use the bundled optional decoder with no remote Draco dependency;
- optional models retain the primitive exhibit and fail locally instead of replacing the entire site with the Canvas fallback;
- forced fallback passes with no Canvas and two working contact links;
- the in-app browser blocks Pointer Lock by policy, so movement, exterior-to-interior transition, Escape recovery, and overlay-close relock were verified through the manual production-preview walkthrough;
- the current Rapier dependency emits one deprecated initialization warning in development; no application error is present.

The manual Pointer Lock launch checks passed in the production preview on 2026-07-10, including movement, exterior-to-interior transition, Escape recovery, overlay-close relock, and Contact Terminal spawn behavior.

Production preview was also checked at `http://127.0.0.1:4173/` after the final build:

- one Canvas and all six exhibit index entries render on the normal route;
- the development performance panel is absent;
- the development-only `?scene=interior` parameter is ignored;
- the project overlay opens and closes correctly;
- forced fallback mounts no Canvas and preserves both contact links;
- the only console message is the known Rapier deprecated initialization warning.

## Meshopt Runtime Check

The optional model path was verified with a generated 1.24 KB GLB using required `EXT_meshopt_compression` buffer views for positions and indices.

- the bundled Meshopt decoder loaded the compressed GLB in the production preview;
- the test triangle rendered visibly above the project plinth;
- the project overlay still opened and closed correctly;
- no GLTF, Meshopt, asset, or application error appeared in the console;
- the only console message remained the known Rapier warning;
- the generated model, temporary content reference, and generator were removed after QA;
- the clean production build was regenerated and contains no runtime-test filename.

## Phase 8 Exterior Hub Check

The expanded exterior was checked in the hardware-accelerated Codex in-app browser at the default spawn plus the Garden Overlook, Signal Yard, and Archive Grove development preview routes.

Representative development measurements:

| View | FPS | Frame time | Draw calls | Triangles |
| --- | ---: | ---: | ---: | ---: |
| Museum Plaza spawn | 134 | 7.5 ms | 72 | 2,796 |
| Museum Plaza at `1024x768` | 135 | 7.4 ms | 68 | 2,748 |

The values vary slightly with frustum culling and the in-app browser workload. Garden, signal, and archive preview routes were also visually checked; every sampled view remained below the 100-call and 100k-triangle hard caps.

Phase 8 implementation evidence:

- repeated visual boxes, trees, lanterns, and rocks use instancing;
- the gradient sky is one shader draw call;
- only the player is dynamic; details have no Rapier bodies;
- no texture, GLB, post-processing, particle, or shadow payload was added;
- entry and exit QA routes changed active location to `interior` and `exterior` respectively;
- the Signal Fragment discovery overlay opened and closed successfully;
- the original project exhibit overlay still opened after the shared content-state refactor;
- the only console warning remains Rapier's known deprecated initialization warning.

Current production build after Phase 8:

| Chunk | Minified | Gzip | Initial preload |
| --- | ---: | ---: | --- |
| App | 37.26 KB | 11.54 KB | Yes |
| CSS | 7.30 KB | 1.99 KB | Yes |
| React vendor | 201.12 KB | 63.47 KB | Yes |
| Three/R3F vendor | 856.84 KB | 229.50 KB | Yes |
| Rapier physics vendor | 2,261.61 KB | 843.82 KB | Yes |
| Optional model loader with Meshopt | 66.18 KB | 18.77 KB | No |

The App chunk grew by about 2.96 KB gzip from the previous completed primitive-world baseline while adding four outdoor zones, bidirectional transitions, environment detail, development QA routes, and the discovery content system.

## Signal Tower GLB A/B Check

The first persistent runtime GLB replaces the five-piece primitive Signal Yard tower while preserving that primitive as the Suspense and error fallback.

Asset shape:

- `public/assets/models/landmark-signal-tower.v1.glb`;
- 69,948 bytes;
- 944 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, or shadow requirement.

Hardware-accelerated development samples at the same Signal Yard preview spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Primitive baseline | 133 | 7.5 ms | 64 | 2,716 |
| Signal Tower GLB | 132 | 7.6 ms | 65 | 3,600 |
| Missing-model fallback | 144 | 6.9 ms | 66 | 2,716 |

Interpretation:

- the GLB adds one visible draw call and 884 visible triangles at this camera angle;
- the 1 FPS and 0.1 ms differences are normal sample variation, not a material regression;
- the normal model route produced no asset or application error; only the known Rapier warning remained;
- the browser asset inventory confirmed a fetch for `landmark-signal-tower.v1.glb`;
- the intentional missing-model route rendered the primitive tower instead of failing the Canvas;
- no additional browser load test was run after the user requested that the test tabs be closed; final verification continued through terminal checks only.

Production build after the model addition:

| Chunk | Minified | Gzip | Initial preload |
| --- | ---: | ---: | --- |
| App | 37.95 KB | 11.71 KB | Yes |
| World model component | 0.82 KB | 0.49 KB | No |
| Optional model loader with Meshopt | 66.18 KB | 18.77 KB | No |
| Signal Tower GLB | 69.95 KB | Static asset | Requested by exterior scene |

The result is inside the exterior budget. Additional GLBs should still be introduced one at a time and measured with the same primitive/model/failure comparison.

## Museum Entrance GLB A/B Check

The second persistent GLB replaces three decorative entrance primitives while leaving facade geometry and colliders unchanged.

Asset shape:

- `public/assets/models/landmark-museum-entrance.v1.glb`;
- 19,240 bytes;
- 240 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, or shadows.

Single-tab hardware-accelerated samples at the same Museum Plaza spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Primitive entrance | 135 | 7.4 ms | 67 | 3,204 |
| Museum Entrance GLB | 137 | 7.3 ms | 67 | 3,408 |
| Missing-model fallback | 139 | 7.2 ms | 67 | 3,204 |

The entrance model adds 204 visible triangles and no draw calls at the measured camera. Normal loading produced no asset error, and the intentional missing route restored the primitive entrance. The one test tab and Vite server were closed immediately after measurement.

Production build after the entrance addition:

- App: 38.51 KB minified / 11.79 KB gzip;
- shared World Model component: 0.82 KB / 0.49 KB gzip;
- model loader remains an optional 66.18 KB / 18.77 KB gzip chunk;
- persistent GLB payload is now 89,188 bytes across Signal Tower and Museum Entrance.

## Garden Bench GLB A/B Check

The third persistent GLB replaces the visible garden seat block while retaining one invisible cuboid collider.

Asset shape:

- `public/assets/models/prop-garden-bench.v1.glb`;
- 18,176 bytes;
- 228 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, or shadows.

Single-tab hardware-accelerated samples at the same Garden Overlook spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Primitive bench | 137 | 7.3 ms | 64 | 2,900 |
| Garden Bench GLB | 137 | 7.3 ms | 64 | 3,104 |

The model adds 204 visible triangles with no measured change to FPS, frame time, or draw calls. The intentional missing route produced the expected local asset failure and used the shared fallback boundary. Its performance sample was discarded because the screenshot tool stalled during that navigation; no additional retry was run.

The garden lantern was moved from directly in front of the bench to the side of the path so the landmark remains readable. Total persistent GLB payload is now 107,364 bytes across three assets.

## Archive Core GLB A/B Check

The fourth persistent GLB adds a frame around the existing interactive Archive Cache without changing discovery content, focus behavior, or collision.

Asset shape:

- `public/assets/models/landmark-archive-core.v1.glb`;
- 45,460 bytes;
- 604 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or colliders.

Single-tab hardware-accelerated samples at the same Archive Grove spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Primitive core | 137 | 7.3 ms | 76 | 4,204 |
| Archive Core GLB | 138 | 7.2 ms | 77 | 4,796 |
| Missing-model fallback | 138 | 7.3 ms | 76 | 4,204 |

The GLB adds one draw call and 592 visible triangles. Normal loading produced no model error; the intentional missing route restored the primitive core. Total persistent GLB payload is now 152,824 bytes across four assets.

Production build after the Archive Core addition:

- App: 39.78 KB minified / 12.01 KB gzip;
- World Model and loader chunks remain shared across every environment GLB;
- no texture payload or additional physics body was introduced.

## Project Voice Relay GLB A/B Check

The fifth persistent GLB is the first model referenced directly from exhibit media data. It augments the existing project plinth, which remains the collider and visual fallback.

Asset shape:

- `public/assets/models/exhibit-project-voice-relay.v1.glb`;
- 71,316 bytes;
- 964 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or new collider.

Single-tab hardware-accelerated samples at the same interior preview spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Primitive project plinth | 132 | 7.5 ms | 48 | 2,664 |
| Voice Relay GLB | 137 | 7.3 ms | 50 | 3,628 |
| Missing-model fallback | 136 | 7.3 ms | 48 | 2,664 |

The artifact adds two draw calls and 964 visible triangles. The normal route produced no model error, and the intentional missing route retained the complete primitive plinth. Total persistent GLB payload is now 224,140 bytes across five assets.

Production build after the project artifact addition:

- App: 39.96 KB minified / 12.06 KB gzip;
- Exhibit Model component remains 0.90 KB / 0.54 KB gzip;
- environment and exhibit models share the same optional loader chunk.

## Skills Workbench GLB A/B Check

The sixth persistent GLB adds a modular three-panel tool rack to the Skills Workbench while retaining its primitive display and collider.

Asset shape:

- `public/assets/models/exhibit-skills-workbench.v1.glb`;
- 21,844 bytes;
- 276 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or new collider.

Targeted single-tab samples with the Project Artifact left enabled:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Skills primitive | 133 | 7.5 ms | 50 | 3,628 |
| Skills Workbench GLB | 136 | 7.3 ms | 52 | 3,904 |
| Targeted missing fallback | 135 | 7.4 ms | 50 | 3,628 |

The model adds two draw calls and 276 visible triangles. The targeted query changed only `skills-workbench`; the Project Artifact remained loaded in all samples. Total persistent GLB payload is now 245,984 bytes across six assets.

Production build after the Skills Workbench addition:

- App: 40.29 KB minified / 12.17 KB gzip;
- existing Exhibit Model and loader chunks remain shared;
- no additional physics or texture payload was introduced.

## Working Principles Relief GLB A/B Check

The seventh persistent GLB adds a three-branch decision compass to the Ideas wall display. The existing note display remains visible and owns collision.

Asset shape:

- `public/assets/models/exhibit-working-principles.v1.glb`;
- 43,464 bytes;
- 576 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or new collider.

Targeted single-tab samples at the same Ideas QA spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Ideas primitive | 144 | 6.9 ms | 35 | 2,540 |
| Working Principles GLB | 136 | 7.4 ms | 37 | 3,116 |
| Targeted missing fallback | 131 | 7.6 ms | 35 | 2,540 |

The model adds two draw calls and 576 visible triangles. FPS readings vary between sequential samples, while structural metrics return exactly to baseline on the intentional missing route. The normal model rendered without asset errors. Total persistent GLB payload is now 289,448 bytes across seven assets.

Production build after the Working Principles addition:

- App: 40.49 KB minified / 12.22 KB gzip;
- Exhibit Model component remains 0.90 KB / 0.54 KB gzip;
- the shared loader remains 66.18 KB / 18.77 KB gzip;
- no additional physics or texture payload was introduced.

## Contact Terminal GLB A/B Check

The eighth persistent GLB adds a dedicated communication terminal to the Contact display. Contact links remain in the accessible HTML overlay and collision remains primitive.

Asset shape:

- `public/assets/models/exhibit-contact-terminal.v1.glb`;
- 50,372 bytes;
- 672 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or new collider.

Targeted single-tab samples at the same Contact QA spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Contact primitive | 133 | 7.5 ms | 37 | 3,252 |
| Contact Terminal GLB | 136 | 7.3 ms | 39 | 3,924 |
| Targeted missing fallback | 137 | 7.3 ms | 37 | 3,252 |

The model adds two draw calls and 672 visible triangles. The normal route rendered without asset errors, and structural metrics returned exactly to baseline on the intentional missing route. Total persistent GLB payload is now 339,820 bytes across eight assets.

Production build after the Contact Terminal addition:

- App: 40.69 KB minified / 12.26 KB gzip;
- Exhibit Model component remains 0.90 KB / 0.54 KB gzip;
- the shared loader remains 66.18 KB / 18.77 KB gzip;
- no additional physics or texture payload was introduced.

## Welcome Console GLB A/B Check

The ninth persistent GLB completes dedicated model coverage for all five enabled interior exhibits. The Welcome Console remains a primitive collider with accessible HTML instructions.

Asset shape:

- `public/assets/models/exhibit-welcome-console.v1.glb`;
- 23,872 bytes;
- 304 triangles;
- 2 merged meshes and 2 materials;
- no textures, animation, transparency, shadows, or new collider.

Targeted single-tab samples at the same Welcome QA spawn:

| Variant | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Welcome primitive | 136 | 7.4 ms | 29 | 1,788 |
| Welcome Console GLB | 137 | 7.3 ms | 31 | 2,092 |
| Targeted missing fallback | 138 | 7.3 ms | 29 | 1,788 |

The model adds two draw calls and 304 visible triangles. The normal route rendered without asset errors, and structural metrics returned exactly to baseline on the intentional missing route. Total persistent GLB payload is now 363,692 bytes across nine assets.

Production build after the Welcome Console addition:

- App: 40.89 KB minified / 12.29 KB gzip;
- Exhibit Model component remains 0.90 KB / 0.54 KB gzip;
- the shared loader remains 66.18 KB / 18.77 KB gzip;
- no additional physics or texture payload was introduced.

## Procedural Dawn Sky Check

The original three-color dark dome met the minimum Phase A requirement but did not provide enough atmospheric depth to make the exterior read as a world. It was replaced with a richer procedural dawn sky while retaining the same one-mesh, one-draw-call architecture.

Visual additions:

- a 360-degree horizon-to-zenith color model;
- a visible sun disc and low-cost atmospheric glow;
- static procedural cloud bands with no texture or animation dependency;
- fog, skyline silhouettes, hemisphere light, and directional light aligned to the same dawn palette;
- no HDRI, texture, post-processing, particle, shadow, or weather system.

Single-tab hardware-accelerated samples after shader warm-up:

| View | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| Museum Plaza | 139 | 7.2 ms | 75 | 7,424 |
| Garden Overlook | 137 | 7.3 ms | 74 | 7,144 |
| Signal Yard | 137 | 7.3 ms | 75 | 7,844 |

The first Museum Plaza sample briefly measured 93 FPS while the shader and scene initialized; a repeat after the Garden and Signal checks measured 139 FPS. All steady samples remain below the 100-call and 100k-triangle hard caps and above the 60 FPS target on the test machine. The dome remains one draw call; the higher sphere tessellation only increases inexpensive background triangles.

Production build after the sky upgrade:

- App: 42.02 KB minified / 12.63 KB gzip;
- no new runtime asset request;
- no change to optional model, Three, React, or physics chunks.

## Reference-Driven Exterior Art Pass

The exterior was rebuilt against `/Users/evan/Downloads/Generated image 1 (1).png` using shared primitive geometry, instancing, optional GLBs, and one low-cost radial lantern-pool shader.

Representative hardware-accelerated samples:

| View | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| South Arrival / Museum entry | 134 | 7.4 ms | 81 | 11,008 |
| West Garden Overlook | 129 | 7.7 ms | 67 | 9,648 |
| East Signal Courtyard | 129 | 7.8 ms | 80 | 9,454 |
| Archive Grove worst sampled view | 99 | 10.1 ms | 94 | 12,456 |

Three niche samples measured 137-138 FPS, 27-31 calls, and 6,484-7,108 visible triangles. The final Signal structural sample measured 78 calls and 10,816 triangles, but its FPS was discarded because the browser screenshot backend stalled during capture.

Performance controls retained:

- repeated boxes are grouped by shared material into instanced batches;
- trees, plants, rocks, lantern components, light pools, guidance markers, and skyline blocks are instanced;
- only major planters, the Signal station, and existing landmarks add simple static cuboid colliders;
- lantern pools use one transparent radial shader draw call instead of per-lantern point lights;
- no texture, HDRI, shadow, post-processing, particle, or dynamic-weather payload was introduced;
- the clean development console contains only Rapier's existing deprecated initialization warning.

Detailed visual and fallback evidence is recorded in `docs/ENVIRONMENT_ART_PASS.md`.

Production build after the exterior environment pass:

- App: 57.88 KB minified / 16.07 KB gzip;
- CSS: 7.06 KB minified / 1.97 KB gzip;
- optional world and exhibit model components remain below 1 KB each;
- shared model loader remains 66.18 KB / 18.77 KB gzip and is not added to the initial preload graph;
- no new runtime texture or model request was introduced by the environment modules.
