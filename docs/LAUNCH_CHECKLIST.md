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
- Done: exterior architecture unmounts after entering the museum and cannot intersect interior walls
- Done: interior ceiling slab closes the shell without adding collision
- Done: returning to exterior remounts the exterior world and guidance
- Done: independent 16 x 22 x 5.2 interior includes entrance, Project, Ideas, Skills, and Contact / Exit zones
- Done: interior layout, exhibit transforms, previews, and colliders are typed data outside the renderer
- Done: entrance spawn focuses no exhibit and all five enabled exhibits open with `E`
- Done: expanded interior remains above 60 FPS, below 100 calls, and below 100k visible triangles
- Done: entrance and exit transition QA resolve to the correct active location
- Done: WASD remains normalized and camera-relative at 3.0 units/s
- Done: holding Shift runs at 5.25 units/s and releasing it restores walk speed
- Done: Space produces a grounded Rapier jump of about 1.0 unit
- Done: held Space cannot bunny hop and an air press cannot double jump
- Done: landing permits a new jump and moving jumps retain limited air control
- Done: Pointer Lock, overlay, blur, visibility, transition, and unmount paths clear movement input
- Done: jump and run work on both exterior and interior floors without crossing tested colliders
- Done: four entrance-step colliders support the capsule without blocking the museum transition
- Done: clicking the Canvas or another non-interactive screen area requests Pointer Lock
- Done: exhibit X and backdrop clicks resume Pointer Lock only when content was opened from first-person mode
- Done: exhibits opened from the paused index close without entering Pointer Lock
- Done: first-person exhibit close updates overlay and resume state atomically without flashing paused UI
- Done: Escape closes or exits without immediately requesting Pointer Lock again
- Done: exhibit-index buttons and links remain interactive without accidental Pointer Lock
- Done: the obsolete `Click to enter` button and selector listener are removed
- Done: movement QA remains above 60 FPS and below scene draw-call and triangle caps

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

Phase 8.20 development instrumentation verifies walk, run, diagonal normalization, jump height, held Space, mid-air Space, repeat jump after landing, moving jump, input reset, interior landing, collision stops, and both transition directions. Repeat the native Pointer Lock walkthrough before deployment to cover Escape and overlay-close relock with the new jump input.

## Known Limits

- Desktop first; mobile first-person controls are not implemented.
- No post-processing, real-time shadows, dynamic props, NPCs, or city-scale open-world systems.
- Nine low-poly GLBs are committed; no texture payload is present, and primitive fallbacks remain available.
- The Rapier dependency emits a development-only deprecated initialization warning.
- Pointer Lock still requires a real browser for future regression checks because the Codex in-app browser blocks that API.
