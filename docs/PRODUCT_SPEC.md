# Product Spec: First-Person 3D Portfolio Museum

## Product Positioning

This site is an interactive personal introduction presented as a small first-person 3D museum. It should feel like entering a compact, intentional world rather than scrolling through a traditional portfolio page.

The site communicates who I am, what I have built, how I think, and how to contact me. The museum format should make the visitor curious and encourage exploration, but the content must remain clear, fast to access, and maintainable.

The confirmed visual direction for Phase 1 is a small interactive game-like scene. It should feel playable and spatial, but still stay closer to a compact museum prototype than a full game.

## Product Principles

- Performance first: the world must run smoothly on normal laptops.
- Small world, high clarity: a focused museum is better than a large empty space.
- Content is data: exhibit content should live in data files, not inside render components.
- Interaction should clarify, not distract.
- Desktop first: WASD, mouse look, and pointer lock are the primary interaction model.
- Mobile fallback first: Phase 1 should show a fallback experience on unsupported or unsuitable devices instead of implementing touch controls.
- Avoid visual overbuilding in early phases.

## User's First Minute

1. Visitor lands on a loading screen with the site name and a short progress state.
2. The first view opens in the museum lobby, facing a clear starting exhibit or welcome wall.
3. A compact prompt explains the minimum controls: click to enter, WASD to move, mouse to look, Esc to exit.
4. The visitor moves a few steps and immediately sees 2-3 nearby exhibits.
5. Looking at or approaching an exhibit reveals a simple interaction prompt.
6. Activating the exhibit opens a readable overlay with title, short body, links, and optional media.
7. The visitor can close the overlay and continue walking without losing orientation.

The first minute should prove that the site is stable, understandable, and worth exploring.

## World Concept

The museum is a small personal knowledge space with the feel of a compact interactive game scene. It should feel curated rather than realistic. Architecture can be simple: a lobby, connected rooms, short corridors, and clear landmarks.

The first implementation should use clean geometry, readable signage, controlled lighting, and a few optimized GLB props. It does not need full custom art, complex shaders, dynamic lighting, or advanced post-processing.

## Museum Structure

### Lobby

Purpose: orientation and first impression.

Content:

- brief introduction;
- movement affordance;
- map or directional signs;
- 2-3 highlighted entry points into the rest of the museum.

### Background Gallery

Purpose: explain personal background and current focus.

Content:

- short bio;
- current role or direction;
- values and working style;
- concise timeline highlights.

### Projects Gallery

Purpose: show selected projects as exhibits.

Content:

- project title;
- problem solved;
- role and scope;
- stack;
- screenshots or lightweight 3D display objects;
- link to live site, repo, or case study when available.

### Skills Workshop

Purpose: present capabilities without turning them into a generic skill list.

Content:

- engineering areas;
- product/design judgment;
- tools and frameworks;
- examples connected to projects.

### Experience Timeline

Purpose: give chronological context.

Content:

- education/work milestones;
- meaningful transitions;
- selected achievements;
- optional linked artifacts.

### Ideas / Notes Room

Purpose: show how I think.

Content:

- principles;
- technical opinions;
- product ideas;
- selected writing snippets.

### Contact / Exit Area

Purpose: provide a clear end point and contact path.

Content:

- email or contact link;
- GitHub / LinkedIn / relevant profiles;
- downloadable resume if desired later;
- final call to action.

## Required Exhibits for First Runnable Version

The first runnable version only needs:

- one lobby;
- one small connected gallery;
- 3-5 exhibit objects;
- one contact/exit object;
- collision walls and exhibit colliders;
- first-person movement and pointer lock;
- one readable overlay component;
- content loaded from data files.

## Interaction Model

### Movement

- WASD for horizontal movement.
- Mouse look after click-to-enter pointer lock.
- Esc exits pointer lock.
- Movement should be smooth, conservative, and predictable.
- No sprint, jump, crouch, or head bob in phase 1 unless needed for testing.

### Exhibit Interaction

- Exhibit becomes focusable when the player is near and looking toward it.
- A small prompt appears outside the 3D canvas or as a restrained in-world label.
- Press `E` or click to open the exhibit overlay.
- Overlay pauses or soft-disables movement.
- Close overlay with Escape or the close button.
- If the overlay was opened from first-person pointer lock, the close button should return directly to first-person controls.
- Escape from the overlay closes it without forcing pointer lock recovery; the visitor can use the resume button to re-enter.
- If the overlay was opened from non-pointer-lock UI such as the exhibit index, closing it should not force first-person controls.

### Navigation

- Signs and lighting should guide visitors.
- The world should be small enough that visitors cannot get meaningfully lost.
- Later phases can add a minimap or quick navigation menu, but phase 1 should test spatial clarity first.

### UI Overlay

- UI text remains HTML/React for readability.
- Overlay content is driven by the same exhibit data as the 3D object.
- Links open intentionally and should not break pointer-lock recovery.

## Content Model Requirements

Content data should support:

- museum sections;
- exhibits;
- title;
- short summary;
- long body;
- tags;
- links;
- optional media references;
- 3D placement metadata;
- interaction radius;
- display style;
- related exhibits.

Render components should not contain portfolio copy except temporary development labels.

## Non-Goals

- Not a full game.
- Not a large open-world environment.
- Not a VR/WebXR project in the first launch.
- Not a complex physics sandbox.
- Not a CMS-backed site in phase 1.
- Not a photorealistic art project in early phases.
- Not a post-processing showcase.
- Not mobile-first.
- Not touch-control navigation in Phase 1.
- Not a replacement for a plain resume if a plain resume is later needed.

## Launch Quality Bar

Before public launch:

- movement is stable and not nauseating;
- frame rate is acceptable on ordinary laptops;
- content is readable without fighting the camera;
- all core exhibits are data-driven;
- assets are optimized;
- loading state is clear;
- pointer lock entry/exit is reliable;
- contact path is obvious;
- there is a graceful fallback message for unsupported or weak environments.
