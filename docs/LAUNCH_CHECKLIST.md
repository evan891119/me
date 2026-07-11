# Launch Checklist

## Current Decision

Automated and manual launch checks pass. The primitive world remains the fallback baseline, with nine measured GLBs accepted across the exterior and exhibits.

## Automated Checks

- Done: `npm run typecheck`
- Done: `npm run lint`
- Done: `npm run build`
- Done: production preview smoke check after the final build
- Done: exterior first viewport renders with no application console errors
- Done: interior QA viewport renders all exhibit display families
- Done: exhibit index opens the correct overlay
- Done: overlay close removes the dialog
- Done: six museum sections have source content
- Done: five enabled exhibits render; Background Timeline remains disabled in data
- Done: forced fallback mounts no Canvas and preserves email and GitHub links
- Done: `1024x768` laptop layout has no HUD overlap
- Done: exterior and interior stay within the documented runtime budget
- Done: optional GLB code is not included in the initial preload graph
- Done: a required `EXT_meshopt_compression` GLB renders through the optional production decoder
- Done: four exterior zones render through development QA routes
- Done: exterior entry trigger resolves to `interior`
- Done: interior exit trigger resolves to `exterior`
- Done: outdoor discovery overlay opens and closes
- Done: original exhibit overlay still opens after the shared interaction-state refactor
- Done: expanded exterior remains under 100 calls and 100k visible triangles
- Done: first-person Pointer Lock state hides the title, exhibit index, controls, and performance UI
- Done: paused state restores the resume panel and five enabled exhibits
- Done: development performance metrics can be toggled with the `P` key while paused
- Done: Signal Tower GLB loads through a separate model chunk
- Done: missing Signal Tower asset falls back to the primitive landmark
- Done: Signal Tower model remains inside the exterior performance and asset budgets
- Done: Museum Entrance GLB adds no measured draw calls and preserves facade colliders
- Done: missing Museum Entrance asset falls back to the primitive frame
- Done: Garden Bench GLB preserves one simple cuboid collider
- Done: Garden Bench matches the primitive FPS, frame time, and draw-call sample
- Done: Archive Core surrounds but does not replace the data-driven Archive Cache
- Done: missing Archive Core asset restores the primitive core
- Done: project artifact loads from exhibit media data through the existing lazy loader
- Done: missing project artifact retains the complete primitive plinth
- Done: Skills Workbench model loads from its exhibit media data
- Done: targeted exhibit A/B changes Skills without disabling the Project Artifact
- Done: Working Principles relief loads from `ideas-note` media data
- Done: Ideas QA spawn verifies the side-wall model without changing the production spawn
- Done: missing Working Principles asset retains the primitive note display
- Done: Contact Terminal model loads from `contact-terminal` media data
- Done: Contact QA spawn verifies the side-wall model without changing the production spawn
- Done: missing Contact Terminal asset retains the primitive contact display and HTML links
- Done: Welcome Console model loads from `welcome-console` media data
- Done: Welcome QA spawn verifies the lobby model without changing the production spawn
- Done: missing Welcome Console asset retains the primitive orientation display
- Done: all five enabled interior exhibits have dedicated data-driven model media
- Done: exterior sky provides a continuous 360-degree horizon, sun, and cloud layer
- Done: sky, fog, skyline, hemisphere light, and directional light share one dawn palette
- Done: Museum Plaza, Garden Overlook, and Signal Yard remain inside performance caps after the sky upgrade
- Done: central museum massing and entrance facade match the approved low-poly dusk direction
- Done: South Arrival Plaza includes broad modular paving, joints, curbs, planters, benches, and stairs
- Done: West Garden, East Signal, and Archive Grove each have a distinct landmark composition
- Done: three exploration alcoves have readable floors, panels, plinths, wall lights, and discovery objects
- Done: repeated environment modules, vegetation, lights, guidance, and skyline use instancing
- Done: final exterior samples remain above 60 FPS, below 100 calls, and below 100k visible triangles
- Done: production forced fallback still mounts no Canvas and preserves Email and GitHub links

## Manual Desktop Walkthrough

Completed in a hardware-accelerated desktop browser on 2026-07-10:

1. Done: Production preview opens normally.
2. Done: `Click to enter` starts Pointer Lock, mouse look, and WASD movement.
3. Done: Exterior-to-interior transition preserves movement and mouse look.
4. Done: Escape exits Pointer Lock and the entry button can start it again.
5. Done: Focused exhibit + `E` opens the correct overlay.
6. Done: Top-right `X` closes the overlay and immediately restores first-person control.
7. Done: `Contact Terminal` does not auto-focus from the interior spawn.
8. Done: Current launch links behave normally.

The Phase 8 browser QA routes verify both transition directions without Pointer Lock. Before the next public deployment, repeat the real-browser walkthrough once to confirm continuous WASD movement through the new interior exit.

## Known Limits

- Desktop first; mobile first-person controls are not implemented.
- No post-processing, real-time shadows, dynamic props, NPCs, or city-scale open-world systems.
- Nine low-poly GLBs are committed; no texture payload is present, and primitive fallbacks remain available.
- The Rapier dependency emits a development-only deprecated initialization warning.
- Pointer Lock still requires a real browser for future regression checks because the Codex in-app browser blocks that API.
