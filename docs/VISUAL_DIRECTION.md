# Visual Direction: Prototype Museum

## Status

Accepted for the prototype phase. This document defines the restrained visual language for the small interactive game-like museum before the asset pipeline and art pass begin.

## Direction Summary

The museum should feel like a compact interactive game scene: spatial, explorable, and slightly stylized. It should not feel like a photorealistic gallery, a marketing landing page, or a shader demo.

The first visual target is a small nighttime interior with clear landmarks, warm exhibit highlights, simple architecture, and readable HTML overlays. The art should support orientation and content discovery before visual spectacle.

## Design Principles

- Keep the world small and readable.
- Use lighting and color to guide movement.
- Prefer a few strong landmarks over many decorative props.
- Use simple geometry until assets prove they are worth their weight.
- Keep UI text in HTML for readability.
- Avoid post-processing until profiling says there is headroom.
- Every visual detail should help orientation, content meaning, or interaction feedback.

## Architecture Mood

The prototype museum should feel like a small playable exhibition room rather than a real-world building.

Rules:

- Use simple rectangular rooms, short corridors, and clear sightlines.
- Keep ceiling height moderate so the space feels contained.
- Avoid maze-like layout in the first runnable version.
- Use one main lobby and one connected gallery before expanding.
- Add landmark objects only when they help visitors remember where they are.

Phase 1 architecture should be built from primitives or lightweight GLB pieces:

- floor planes or low-height floor boxes;
- wall modules;
- display plinths;
- sign panels;
- simple terminals;
- simple frames or shelves.

## Exterior Arrival Direction

The exterior should extend the same restrained visual language instead of becoming a separate open-world art direction.

Accepted direction:

- small arrival plaza outside the museum;
- simple museum facade as the first landmark;
- obvious entrance path into the existing interior;
- distant city or landscape implied through silhouettes, fog, and background layers;
- bounded movement area with no explorable streets or terrain.

Rules:

- Use the exterior to establish place, not to add portfolio content.
- Keep the first exterior pass primitive-based.
- Make the museum entrance visible from the spawn point.
- Use lighting, path shape, and facade contrast to guide the visitor.
- Avoid grass fields, crowds, traffic, weather, and dense props in the first pass.
- Keep outdoor style compatible with the interior palette: dark neutral architecture, warm entrance accents, muted background distance.

## Lighting Style

Lighting should be warm, directional, and performance-safe.

Rules:

- Use ambient light plus a small number of static local lights.
- Use exhibit-focused warm lights to imply points of interest.
- Avoid dynamic shadow-heavy setups in the prototype.
- Avoid flickering lights, animated volumetric effects, and bloom in the first pass.
- Keep contrast high enough that walls, floor, and exhibits are separable.

Recommended baseline:

- dark neutral background;
- warm amber exhibit accents;
- soft fill light so navigation remains readable;
- no post-processing bloom;
- no screen-space ambient occlusion until Phase 6 profiling.

## Material Palette

The palette should avoid a one-note dark slate look by pairing dark architecture with warm, muted exhibit accents.

Baseline colors:

- Background / void: `#121416`
- World fog / scene background: `#15181a`
- Floor: `#2a2a27`
- Walls: `#3a3730`
- Warm museum accent: `#c9a46d`
- Text: `#f4f0e8`
- Muted text: `#c9c4ba`

Exhibit accent families:

- Welcome / orientation: warm amber
- Projects: ochre / brass
- Skills: muted green
- Timeline / background: muted clay
- Contact: teal gray
- Ideas / notes: desaturated parchment

Rules:

- Use rough, mostly matte materials by default.
- Avoid reflective metal and glass until there is a specific exhibit reason.
- Use texture sparingly; a good material color plus geometry is enough for the prototype.
- Prefer 1K textures if textures are introduced.
- Do not use large tiled textures without checking visible repetition and file size.

## Exhibit Object Language

Exhibits should be visually distinct but part of one system.

Prototype object types:

- Plinth: physical object for projects or skills.
- Wall panel: flat object for welcome, notes, or timeline.
- Terminal: compact object for contact or navigation.
- Workbench: low object for grouped capabilities.

Rules:

- Each exhibit is driven by `src/content/exhibits.ts`.
- Transform data controls placement, scale, and rotation.
- `displayStyle` controls visual family, not final art.
- The 3D object should be scannable from a distance.
- The detailed text belongs in the HTML overlay, not baked into the 3D scene.

## Typography and UI

The 3D scene should not carry critical long-form text. HTML overlays carry readable content.

Rules:

- Keep HUD and overlay text in React/HTML.
- Use compact labels only where they help orientation.
- Avoid loading custom 3D fonts in the prototype unless there is a measured reason.
- Keep overlay panels calm and utilitarian: clear title, summary, body, tags, and links.
- Do not hide core content behind tiny in-world labels.

## Motion

Motion should make the world feel responsive, not busy.

Allowed in prototype:

- conservative first-person movement;
- subtle hover/focus UI states;
- simple overlay open/close transitions if they do not harm readability;
- static lights.

Deferred:

- head bob;
- sprint;
- camera shake;
- animated particles;
- animated doors;
- moving platforms;
- physics props;
- cinematic transitions.

## Asset Direction

The first art pass should create lightweight assets that replace primitives without changing the product scope.

Good first assets:

- display plinth variants;
- flat wall panel variants;
- contact terminal;
- simple sign frame;
- low-poly decorative landmark;
- compact room kit modules.

Asset rules:

- Export runtime assets as GLB.
- Keep collision meshes simple and separate from visual meshes when needed.
- Avoid committing large source assets into the runtime path.
- No single prototype prop should justify a large texture payload.
- A primitive fallback should remain possible for key exhibit types.

## Phase Boundaries

### In Scope Now

- restrained material palette;
- simple geometry;
- fixed lighting;
- data-driven exhibit visual styles;
- readable HTML overlay;
- clear orientation cues;
- no complex effects.

### Later Art Pass

- optimized GLB props;
- improved room kit;
- optimized exterior facade pieces;
- lightweight skyline or background silhouettes;
- selected exhibit-specific objects;
- simple signage;
- visual polish after content and interaction are stable.

### Out of Scope Until Performance Pass

- bloom;
- SSAO;
- depth-of-field;
- volumetric lighting;
- real-time reflections;
- high-poly hero models;
- large texture sets;
- complex shaders.

## Performance Constraints

Visual work must fit the architecture budget:

- keep first prototype draw calls under 150 visible calls where feasible;
- use simple fixed colliders;
- prefer 1K textures for ordinary props;
- avoid post-processing in Phase 1;
- keep prototype asset payload under 8 MB compressed;
- treat Rapier bundle size as a Phase 6 performance item.

## Review Checklist

Before adding or accepting a visual change, check:

- Does it help orientation, content meaning, or interaction feedback?
- Does it keep the world readable on a normal laptop?
- Does it avoid new heavy shaders or post-processing?
- Can the asset be optimized into a small GLB?
- Does critical text remain in HTML?
- Does the change preserve the small interactive game-like museum direction?
