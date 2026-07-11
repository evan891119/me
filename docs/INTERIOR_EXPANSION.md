# Interior Expansion

## Outcome

The museum interior is now an independent 16 x 22 x 5.2 world. It is larger than the exterior facade suggests by design because exterior and interior geometry are mounted as separate locations.

The plan replaces the former single-room shell with a readable sequence:

1. Entrance lobby and orientation console
2. Central Project Gallery
3. Left Ideas Gallery
4. Right Skills Gallery
5. Rear Contact / Exit Gallery

Background Timeline remains in content data with `enabled: false`.

## Plan And Circulation

- The entrance opens onto a long central axis with the Project artifact as the first focal point.
- Divider walls and framed openings conceal the side galleries until the visitor turns into them.
- Ideas and Skills occupy distinct side rooms with their own material accents.
- The rear portal creates a final spatial transition into Contact / Exit.
- The route is legible without becoming a corridor maze, and the entrance spawn does not focus an exhibit.

## Data And Rendering

`src/content/interiorLayout.ts` owns the typed layout. It defines module pieces, collider pieces, exhibit transforms, QA previews, and interior guidance.

`src/world/interior/InteriorShell.tsx` only renders that data. Repeated modules are grouped by material and rendered with shared box geometry through instancing.

Reusable module kinds include:

- wall, floor, ceiling, column, doorway, and gallery divider;
- plinth, wall panel, light fixture, and floor inlay.

Portfolio copy and model media remain in `src/content/exhibits.ts`; layout data contains no exhibit body copy.

## Collision Strategy

- Only floor, perimeter walls, divider walls, doorway edges, and major exhibit obstacles receive static cuboid colliders.
- Decorative ceiling layers, lights, panels, columns, and inlays do not add physics bodies.
- Visual pieces and invisible collider pieces are separate typed arrays, so visual detail does not silently grow the physics scene.

## Lighting Strategy

- Four real point lights cover the entrance, central gallery, and two side galleries.
- Twelve repeated fixtures use emissive materials as fake light sources.
- The interior uses no real-time shadows, post-processing, bloom, SSAO, depth of field, or volumetric effects.

## Browser QA

Checked in one hardware-accelerated in-app browser tab on 2026-07-11:

- entrance, Project, Ideas, Skills, and Contact compositions render without exterior geometry;
- all five enabled exhibits focus and open with `E`;
- every exhibit dialog closes correctly;
- the entrance preview focuses no exhibit;
- exterior-to-interior resolves to `interior`;
- interior-to-exterior resolves to `exterior`;
- the clean development session reports no application or material warning;
- the remaining warning comes from Rapier's deprecated initialization signature.

Representative screenshots:

- `/tmp/me-interior-expansion-entrance-v2.png`
- `/tmp/me-interior-expansion-project-final.png`
- `/tmp/me-interior-expansion-ideas-v1.png`
- `/tmp/me-interior-expansion-skills-v1.png`
- `/tmp/me-interior-expansion-contact-final.png`

## Performance Result

The final Contact / Exit sample measured:

| Metric | Result | Budget |
| --- | ---: | ---: |
| FPS | 144 | at least 60 |
| Frame time | 6.9 ms | below 16.7 ms |
| Draw calls | 14 | below 100 |
| Visible triangles | 1,320 | below 100,000 |
| Dev transfer | 253.1 KB | diagnostic only |

The entrance sample measured 136 FPS, 44 calls, and 3,664 visible triangles. The final central Project sample measured 144 FPS, 34 calls, and 3,256 visible triangles. All samples stay comfortably within the laptop budget.

Final production bundle after the expansion:

| Chunk | Minified | Gzip |
| --- | ---: | ---: |
| App | 62.13 KB | 17.18 KB |
| CSS | 7.06 KB | 1.97 KB |
| Optional model loader | 66.18 KB | 18.77 KB |
| React vendor | 201.12 KB | 63.47 KB |
| Three/R3F vendor | 856.87 KB | 229.52 KB |
| Rapier physics vendor | 2,261.61 KB | 843.82 KB |

## Intentional Limits

- Desktop-first controls; no mobile first-person control scheme.
- No doors, elevators, dynamic props, NPCs, puzzles, or room streaming.
- No baked text or long-form copy in the 3D world.
- No texture payload, real-time shadows, or post-processing stack.
- Pointer Lock restoration still requires a manual real-browser regression check before public deployment because automated browser policy can block Pointer Lock.
