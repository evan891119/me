# Exterior World Plan

## Status

Implemented as Phase 8. This decision supersedes the earlier narrow arrival-plaza boundary.

The site now uses a compact explorable outdoor hub. It is intentionally larger than the museum entrance but remains a small, bounded world rather than an open-world map.

## Product Role

The exterior should:

- make the museum feel like one destination inside a larger personal world;
- give visitors optional places to explore before or after the portfolio content;
- support hidden stories, links, and easter eggs without changing render components;
- remain immediately readable and smooth on normal laptops.

The museum is still the primary portfolio path. Outdoor exploration is optional and always loops back to a visible landmark.

## World Structure

The playable world is approximately `34 x 35` world units and contains four zones:

| Zone | Role | Landmark |
| --- | --- | --- |
| Museum Plaza | Arrival and primary route | Framed museum entrance |
| Garden Overlook | Quiet west-side detour | Low-poly trees, bench, memory discovery |
| Signal Yard | Strong east-side landmark | Abstract mast and signal discovery |
| Archive Grove | Southern optional destination | Archive plinth and cache discovery |

A broad front path and two side branches connect the zones. The museum remains visible from the main routes. Terraces, rocks, low planting, fog, and skyline silhouettes conceal the physical boundary.

## Navigation And Transitions

- The default spawn faces the museum from the southern plaza.
- WASD and mouse controls remain unchanged.
- The exterior-to-interior transition teleports the player to the museum entry.
- The interior doorway now returns the player to the exterior.
- A transition cooldown and separated target spawns prevent immediate bounce-back.
- Pointer Lock state is not changed by location transitions.

Development-only QA routes:

```text
/?spawn=garden
/?spawn=signal
/?spawn=archive
/?qaTransition=entry
/?qaTransition=exit
/?content=signal-fragment
```

Vite removes the behavior behind these query parameters from the production decision path through `import.meta.env.DEV` checks.

## Data Boundaries

Outdoor layout and content live in `src/content/exteriorWorld.ts`.

- `exteriorZones`: zone identity and map centers;
- `exteriorColliderPieces`: ground, boundaries, facade, and large obstacle colliders;
- `exteriorVisualPieces`: non-colliding architecture and landmarks;
- `exteriorPathPieces`: walkable visual routes;
- `exteriorTrees`, `exteriorLanterns`, `exteriorRocks`: instanced detail placement;
- `worldDiscoveries`: easter-egg title, copy, tags, position, visual style, and interaction radius.

To add an easter egg, add one object to `worldDiscoveries`. The discovery renderer, focus detector, interaction prompt, and overlay use the same typed data automatically.

## Rendering Strategy

- Primitive geometry and shared materials remain the complete baseline.
- Repeated boxes, trees, lanterns, and rocks use instancing.
- A one-draw-call shader sky supplies a dusk color gradient.
- Skyline silhouettes and fog provide fake distance.
- Only large navigation blockers receive Rapier colliders.
- No textures, GLB files, post-processing, real-time shadows, particles, or dynamic physics props are required.

## Performance Budget

| Metric | Target | Hard Cap |
| --- | ---: | ---: |
| Exterior draw calls | 50-80 | 100 |
| Exterior visible triangles | Under 20k | 100k |
| Exterior texture payload | 0-2 MB | 3 MB |
| Dynamic lights | 0-1 | 1 |
| Real-time shadows | 0 | 0 until separately profiled |
| Dynamic physics bodies | Player only | Player only |
| Static colliders | Large blockers only | Avoid per-detail colliders |

Current measurements are recorded in `docs/PERFORMANCE_NOTES.md`.

## Asset Pipeline

The exterior does not require final assets. Future GLB replacements must remain selective:

- replace one landmark at a time, not the full world;
- keep primitive fallback geometry until the asset is verified;
- use 1K-or-smaller textures where possible;
- inspect and optimize assets before commit;
- measure draw calls, triangles, payload, and frame time after every replacement.

## Risks And Limits

### Empty-World Risk

A larger map can feel empty. Add discoveries and landmarks to existing zones before increasing the boundary again.

### Content Distraction

Outdoor easter eggs must remain optional. The museum entrance should stay the strongest first-view landmark.

### Performance Regression

The primitive world is deliberately cheap. Dense foliage, unique materials, and unoptimized GLBs would consume the budget faster than the current geometry.

### Interaction Regression

Pointer Lock, overlays, and bidirectional transitions share player state. Any future transition or modal must run the same close/resume regression checks.

## Non-Goals

- seamless city-scale open world;
- procedural terrain or chunk streaming;
- vehicles, NPCs, crowds, or combat;
- dynamic weather or day/night simulation;
- dense animated foliage;
- advanced post-processing;
- mobile first-person controls;
- final bespoke environment asset pack.

## Acceptance Evidence

- Four exterior zones and connecting paths exist in data and render in the scene.
- Static boundaries enclose the full playable footprint.
- Three data-driven discovery slots render outside the museum.
- Entry and exit QA routes produce `interior` and `exterior` states respectively.
- A discovery overlay opens and closes through the shared content system.
- The museum exhibit overlay still opens after the content-state refactor.
- Runtime metrics remain below the hard caps with no texture or model payload.
