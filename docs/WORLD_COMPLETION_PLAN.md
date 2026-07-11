# World Completion Plan

This document defines the path from the current prototype museum to a complete lightweight first-person portfolio world.

## Objective

Make the site feel like a complete small 3D world while keeping it smooth on normal desktop and laptop browsers.

The target is not photorealism or open-world scale. The target is a small, coherent, explorable museum environment with enough exterior atmosphere, interior polish, interaction clarity, and content completeness to share publicly.

## Completion Definition

The world is complete when:

- the first view outside the museum feels intentional, not like a blockout;
- the visitor can enter the museum and understand where to go;
- the interior reads as a designed exhibition space;
- exhibits are discoverable and readable;
- the fallback experience still works;
- no final experience depends on high-end GPU effects;
- performance remains within the documented budget;
- content, world configuration, and render code remain separated.

## World Pillars

### Lightweight Sense of Place

Use a small real playable area plus cheap distance techniques.

Required:

- sky gradient or simple sky dome;
- fog and background fade;
- distant skyline or landscape silhouettes;
- bounded outdoor hub with distinct optional destinations;
- clear museum entrance.

Avoid:

- open-world streets;
- terrain systems;
- dense foliage;
- crowds;
- vehicles;
- weather particles;
- HDRI-heavy lighting.

### Coherent Museum Interior

The museum should feel designed, not assembled from unrelated blocks.

Required:

- consistent wall, floor, and accent material language;
- exhibit plinths and panels that share a system;
- readable paths and sightlines;
- warm guidance lighting;
- clear exhibit grouping.

Avoid:

- maze-like layout;
- text baked into 3D surfaces;
- heavy post-processing;
- many one-off props.

### Data-Driven Content

Portfolio content must stay in data files.

Required:

- exhibit copy remains in `src/content/exhibits.ts`;
- world placement and scene configuration live outside render components where useful;
- render components consume typed data and reusable visual primitives.

Avoid:

- hard-coded portfolio copy in 3D components;
- one-off exhibit components unless they represent reusable display types.

### Performance First

Visual polish must be measured, not assumed.

Target envelope:

- no post-processing by default;
- no dynamic physics props;
- static colliders only for architecture and exhibit obstacles;
- shared geometry and materials for repeated objects;
- no production texture payload until necessary;
- exterior and interior visual passes measured through the development panel.

## Work Phases

### Phase A: Exterior Atmosphere

Goal: make the arrival scene feel intentional with minimal render cost.

Scope:

- sky gradient or dome;
- ground/path material variation;
- distant silhouettes;
- entrance lighting and framing;
- low-cost details for boundary areas.

### Phase B: Interior Material System

Goal: replace prototype flat blocks with a reusable material and primitive kit.

Scope:

- shared material palette;
- reusable wall/floor/plinth/panel components;
- improved interior lighting balance;
- exhibit visual consistency.

### Phase C: Spatial Guidance

Goal: make the visitor path obvious without adding a heavy UI system.

Scope:

- entrance cues;
- floor/path highlights;
- sign-like primitive panels;
- first-time guidance copy in existing HUD surfaces if needed.

### Phase D: Exhibit Polish

Goal: make each exhibit feel like a portfolio object, not a placeholder cube.

Scope:

- display variants by exhibit type;
- better plinth proportions;
- small visual cues tied to `displayStyle`;
- maintain HTML overlays for long copy.

### Phase E: Content Completion

Goal: replace remaining prototype content with launch-ready personal content.

Scope:

- welcome;
- background;
- skills;
- ideas if included;
- links and contact;
- final metadata.

### Phase F: Performance And Launch

Goal: prove the complete world can be shared.

Scope:

- build and preview;
- fallback verification;
- pointer-lock manual checklist;
- performance note updates;
- launch checklist.

### Phase G: Explorable Exterior Hub

Goal: make the museum one destination inside a compact world that can hold future easter eggs.

Scope:

- four connected outdoor zones;
- recognizable low-cost landmarks;
- bidirectional museum transition;
- typed discovery content separate from rendering;
- instanced environmental detail;
- outdoor performance and interaction QA.

## Current Completion Status

- Done: Phase A exterior atmosphere.
- Done: Phase B interior material system.
- Done: Phase C spatial guidance.
- Done: Phase D exhibit polish and optional GLB layer.
- Done: Phase E approved minimal content set.
- Done: Phase F performance, fallback, overlay, production build, laptop layout, and manual Pointer Lock checks.
- Done: Phase G compact outdoor hub, bidirectional transition, and data-driven discovery slots.

The lightweight primitive world now includes the museum and an explorable exterior hub. One measured Signal Tower GLB augments the exterior; further final GLB art remains optional and must pass the same asset budgets before replacing or augmenting the primitive baseline.

## Non-Goals For Completion Pass

- photorealistic museum;
- city-scale open world or streaming terrain;
- mobile first-person controls;
- NPCs;
- procedural terrain;
- animation-heavy doors;
- post-processing stack;
- final bespoke GLB art pack;
- CMS or remote content fetching.
