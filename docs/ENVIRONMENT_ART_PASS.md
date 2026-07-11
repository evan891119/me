# Environment Art Pass

## Reference

Primary visual reference:

```text
/Users/evan/Downloads/Generated image 1 (1).png
```

The reference is treated as an art-direction and world-density target, not as a flat background or a promise of pixel-identical first-person framing.

## Implemented Direction

The exterior now follows the reference's low-poly dusk museum language:

- a central dark-stone museum with a taller crown, stepped side wings, pale entrance frame, banners, vertical light strips, doors, and approach stairs;
- a broad South Arrival Plaza with modular paving joints, curbs, approach markers, planters, benches, and a clear axial view;
- a loop and branch-path system with distinct Garden, Signal, and Archive destinations;
- a West Garden with raised terraces, faceted trees, clustered low-poly plants, rocks, benches, lanterns, and a discovery alcove;
- an East Signal Courtyard with a dedicated station, framed entrance, facade emblem, rooftop tower, planting beds, rocks, lanterns, and a discovery alcove;
- an Archive Grove with a framed archive core, flanking planters, trees, lanterns, a rear threshold alcove, and two data-driven discoveries;
- three enclosed exploration niches with a back panel, floor, plinth, wall light, and discovery object;
- stepped perimeter caps and a single instanced skyline wrapping the rear and side horizons;
- a 360-degree procedural dawn sky, sun, cloud bands, matched fog, and aligned warm daylight.

## Reusable System

Environment placement remains in `src/content/exteriorWorld.ts`. Rendering consumes shared batches instead of hard-coding scene copy or one-off React components.

Reusable low-cost modules include:

- planters with stone bases and lawn inserts;
- benches assembled from shared box geometry;
- paving slabs, joints, curbs, steps, wall panels, banners, and boundary caps;
- instanced faceted trees, clustered plants, rocks, lantern posts, lantern heads, and radial light pools;
- instanced guidance markers and skyline blocks;
- simple invisible cuboid colliders only for major obstacles.

Nine GLBs remain optional visual layers. Primitive architecture, movement, collision, content overlays, and the non-WebGL fallback do not depend on those assets loading.

## Visual QA

The same in-app browser tab was reused for all exterior routes. Screenshots were compared against the reference for:

- central museum silhouette and entrance hierarchy;
- plaza width, paving rhythm, stairs, curbs, and planting frames;
- Garden density, faceted vegetation, seating, and warm path lighting;
- Signal station identity and tower placement;
- Archive destination framing and long sightline back to the museum;
- three small alcoves with readable interior surfaces and artifacts;
- skyline continuity, horizon coverage, and warm/cool palette balance.

The final multi-route capture encountered a browser screenshot timeout on Signal after Entry and Garden succeeded. The same Signal implementation had already been visually captured in the preceding pass; the timeout sample was not retried repeatedly or used for FPS claims.

## Performance Evidence

Representative hardware-accelerated development samples:

| View | FPS | Frame time | Draw calls | Visible triangles |
| --- | ---: | ---: | ---: | ---: |
| South Arrival / Museum entry | 134 | 7.4 ms | 81 | 11,008 |
| West Garden Overlook | 129 | 7.7 ms | 67 | 9,648 |
| East Signal Courtyard | 129 | 7.8 ms | 80 | 9,454 |
| Archive Grove worst sampled view | 99 | 10.1 ms | 94 | 12,456 |
| Garden niche | 138 | 7.3 ms | 27 | 6,484 |
| Signal niche | 138 | 7.3 ms | 29 | 6,504 |
| Archive niche | 137 | 7.3 ms | 31 | 7,108 |

All reliable samples remain above 60 FPS, below 100 draw calls, and below 100k visible triangles. Signal's final structural sample after facade details remained at 78 calls and 10,816 triangles; its FPS reading was discarded because the screenshot backend was stalled during that sample.

Final production app output is 57.88 KB minified / 16.07 KB gzip. The environment pass adds no new texture or model request; its geometry, placement data, and shader code ship inside the existing application and Three.js chunks.

## Fallback Evidence

The production preview at `?forceFallback=1` was checked after the art pass:

- Canvas count: 0;
- Email links: 1;
- GitHub links: 1;
- browser console errors or warnings: 0.

## Intentional Deviations

The browser scene does not reproduce the reference's offline-render features that would undermine the laptop budget:

- no real-time shadows or ambient-occlusion post-processing;
- no volumetric clouds, bloom, depth of field, or color-grading pass;
- no high-resolution stone, paving, or vegetation textures;
- lanterns use one instanced radial ground-glow shader instead of one point light per fixture;
- skyline buildings are instanced silhouettes rather than full city geometry;
- the reference's overhead route diagram is documentation, not an in-world first-person screen.

These deviations preserve the target composition, palette, landmarks, and density while keeping the world suitable for normal laptops.
