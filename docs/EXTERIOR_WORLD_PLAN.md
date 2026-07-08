# Exterior World Plan

This document defines how the area outside the museum should work without turning the site into a heavy open-world scene.

## Status

Accepted as the exterior implementation boundary.

Chosen first direction: Option A, exterior as the first scene, implemented as a narrow arrival plaza that leads directly into the current museum interior.

## Decision

Build a lightweight exterior arrival scene, not a full outdoor world.

The exterior should feel like the visitor has arrived at a small museum in a larger world, but only the immediate arrival area needs to be physically present. Distant context should be faked with low-cost background techniques.

## Product Role

The exterior exists to do three things:

- establish atmosphere before the visitor enters the museum;
- make the museum feel like a place instead of an isolated room;
- give visitors a short first-person movement moment before the main content.

It should not compete with the exhibits. The museum content remains the core product.

## Recommended Experience

The first exterior version should be a small bounded arrival plaza:

- visitor starts facing the museum entrance;
- a simple museum facade frames the first view;
- a short path or courtyard leads to the entrance;
- the door or portal leads into the current museum interior;
- distant scenery gives the impression of a larger city or landscape;
- invisible or physical boundaries prevent visitors from wandering too far.

The scene should be readable within the first 5-10 seconds. Visitors should immediately understand where to go.

## Exterior Structure

### Real Geometry

Keep real walkable geometry small:

- ground plane or plaza;
- museum facade;
- entry doorway or portal;
- a few low-poly architectural props;
- simple boundary walls, railings, planters, or elevation changes;
- static colliders for the floor, entrance, and boundaries.

### Fake Distance

Represent the world beyond the plaza with cheap visual layers:

- sky color or lightweight sky dome;
- distant skyline silhouettes;
- flat billboard planes for far buildings or hills;
- fog or depth fade to hide the small playable area;
- low-detail shapes with no physics.

Do not build explorable streets, terrain, traffic, crowds, foliage fields, or large city blocks in the first exterior pass.

## Performance Budget

The exterior must preserve the project goal: desktop first, but smooth on normal laptops.

Initial exterior budget:

| Metric | Target | Hard Cap |
| --- | ---: | ---: |
| Exterior draw calls | 30-60 | 100 |
| Exterior visible triangles | 20k-50k | 100k |
| Exterior texture payload | 1-2 MB | 3 MB |
| Dynamic lights | 0-1 | 1 |
| Real-time shadows | 0 | 1 only after profiling |
| Dynamic physics bodies | 0 | 0 |
| Static colliders | Minimal | Ground, entry, boundaries only |

Current prototype baseline from `docs/PERFORMANCE_NOTES.md` is much lower than this, so exterior work should be measured as soon as the first scene shell exists.

## Rendering Rules

- No complex post-processing in the first exterior pass.
- Avoid real-time shadows unless the measured frame time still has enough room.
- Prefer baked-looking lighting through materials, vertex colors, simple gradients, and placed lights.
- Use instancing or merged geometry when repeating objects.
- Do not add animated grass, particle weather, crowd agents, or vehicle movement in the first pass.
- Use fog or background color to limit perceived draw distance.
- Keep the camera path and playable boundary intentionally small.

## Asset Pipeline

### Phase 1 Exterior Assets

Start with primitives and simple local geometry:

- museum facade blockout;
- entry portal;
- plaza floor;
- boundary pieces;
- 2-3 landmark silhouettes.

This can be implemented without new GLB files if needed.

### Phase 2 Exterior Assets

Replace selected primitives with optimized GLB assets:

- low-poly facade kit;
- door or entrance frame;
- 1-2 repeated prop types;
- background skyline strip or grouped silhouette mesh.

Asset rules:

- GLB files live under `public/assets/models/`.
- Texture files live under `public/assets/textures/`.
- Runtime assets must be optimized before commit.
- Prefer 1K textures or smaller.
- Use WebP for simple image textures first.
- Consider KTX2/Basis only if texture memory or payload becomes a real issue.
- Use `gltf-transform inspect` and `gltf-transform optimize` for model review.

## Loading Strategy

There are two possible approaches.

### Option A: Exterior As First Scene

The visitor starts outside, walks to the entrance, then enters the museum.

Pros:

- strongest sense of place;
- makes the first minute feel more like a small game;
- gives the museum a clearer reveal.

Cons:

- increases initial scene complexity;
- delays direct access to portfolio content;
- requires stronger guidance so visitors do not miss the entrance.

This is the accepted first direction, as long as the first implementation stays small and performance remains stable.

### Option B: Exterior As Optional Side Area

The visitor starts inside the museum, and the exterior is accessible through an exit.

Pros:

- safest for launch;
- content remains immediately available;
- exterior can be lazy-loaded later.

Cons:

- weaker first impression;
- less game-like arrival experience.

This remains the fallback if exterior work creates performance or launch-readiness risk.

## Recommended First Implementation

Implement Option A as a narrow arrival scene.

The first implementation should include:

- one outdoor spawn point;
- one museum facade;
- one obvious entrance;
- one transition trigger into the existing interior;
- static boundary colliders;
- distant background silhouettes;
- no new interaction system beyond entering the museum.

The transition can be a simple state switch at first. It does not need streaming, portals, animated doors, or cutscenes.

## First Implementation Issue

Use `Issue 7.6: Implement primitive exterior arrival blockout` as the first code issue.

The first code issue should still use primitives and local geometry. It should not introduce final GLB assets, post-processing, dynamic shadows, or a large outdoor map.

## Content and Code Boundaries

Exterior configuration should not be hard-coded inside render components.

Suggested data boundary:

- `src/content/world.ts` for scene-level metadata;
- `src/content/locations.ts` if exterior/interior locations grow;
- render components under `src/world/exterior/`;
- shared transition state in Zustand only if needed.

Keep exhibit content separate from exterior scene layout. The exterior introduces place and orientation, not portfolio copy.

## Linear Issue Recommendation

The planning issue is:

`Issue 7.5: Design lightweight exterior arrival scene`

The first implementation issue is:

`Issue 7.6: Implement primitive exterior arrival blockout`

## Risks

### Scope Creep

The phrase "outside world" can easily become a large environment. The first version must stay as an arrival plaza with fake distance.

### Performance Regression

The current prototype is very light. Adding even a small number of unoptimized GLBs or large textures can dominate the page payload.

### Navigation Confusion

If the visitor starts outside, the entrance must be obvious. The exterior should not make users search before they can see portfolio content.

### Asset Debt

Temporary primitives are acceptable, but any committed GLB assets need naming, optimization, and size discipline from the beginning.

### Pointer Lock Flow

Entering a building from first-person controls must not regress the stabilized pointer-lock and overlay lifecycle.

## Non-Goals

- full open world;
- explorable city;
- vehicle movement;
- NPCs or crowds;
- dynamic weather;
- day/night cycle;
- advanced shaders;
- complex post-processing;
- mobile first-person controls;
- final custom environment art.

## Acceptance Checklist For Future Implementation

- Exterior is visually understandable within 5-10 seconds.
- Visitor can reach the museum entrance without instructions.
- Player cannot walk into empty or unfinished space.
- Performance panel stays within the exterior budget.
- No large unoptimized assets are committed.
- Existing exhibit overlay and pointer-lock recovery still work.
- Fallback experience still works with `/?forceFallback=1`.
