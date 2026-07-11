# Player Movement

## Outcome

The shared player controller supports switchable first-person and third-person views, normalized WASD movement, hold-to-run, and grounded Rapier jumping in both the exterior and interior worlds.

| Setting | Value |
| --- | ---: |
| Walk speed | 3.0 units/s |
| Run speed | 5.25 units/s |
| Air-control multiplier | 0.72 |
| Gravity | -9.81 units/s squared |
| Jump velocity | 4.45 units/s |
| Measured jump height | about 1.0 unit |

## Architecture

`src/world/playerMovement.ts` owns movement constants, input projection, diagonal normalization, and horizontal speed selection. `PlayerController.tsx` owns browser input lifecycle, the Rapier body, grounded queries, transitions, view switching, and development QA snapshots. `PlayerCharacter.tsx` owns the GLB and animation mixer. `ThirdPersonCamera.tsx` owns orbit state, follow smoothing, and Rapier camera collision.

Both cameras follow the same dynamic capsule body. Movement is projected onto the active camera's horizontal facing plane, so looking up or down does not change travel direction. Horizontal velocity is set explicitly while Rapier retains gravity-driven vertical velocity. CCD is enabled on the player body to reduce tunneling during low frame-rate spikes.

High-frequency movement state stays in refs and the Rapier body. Zustand is not updated every frame.

## View Modes

`V` switches between `firstPerson` and `thirdPerson` while Pointer Lock is active. First-person mode preserves the original eye-height camera and Drei Pointer Lock rotation. Third-person mode disables Drei's camera rotation while retaining Pointer Lock, then applies yaw and pitch to a camera target 0.45 units above the capsule center.

The third-person defaults are a 4.0-unit orbit distance, -0.28-radian pitch, and a pitch clamp from -0.9 to 0.3 radians. Camera motion uses frame-rate-independent exponential smoothing. A Rapier ray from the target to the ideal camera position shortens the boom before a static collider and leaves a 0.18-unit wall margin; the player's own rigid body is excluded. The boom returns smoothly to full distance after the obstruction clears.

The camera snaps to the correct side of a teleport on a world transition instead of interpolating from the previous location.

Interaction proximity is measured from the player capsule while aim remains camera-centered. A Rapier sight ray excludes the dynamic player body and rejects targets hidden well behind a static collider, preventing the offset third-person camera from focusing content through a wall.

## Character And Animation

`public/assets/models/player-character.v1.glb` is a 406,220-byte Blender GLB with one mesh, five primitives/materials, 8,444 triangles, one skin, and 17 joints. Its bounds are 1.344 x 1.747 x 0.883 units and its feet start at local Y 0. It has no external texture or image dependency.

The exported clips are:

| Clip | Duration | Playback |
| --- | ---: | --- |
| Idle | 3.033 s | loop |
| Walk | 1.033 s | loop, speed-adjusted |
| Run | 0.733 s | loop, speed-adjusted |
| Jump | 0.933 s | once, clamp at finish |

The model is visible only in third-person mode. The existing Rapier capsule remains the sole player collider. Movement rotates the visual character toward actual velocity with frame-rate-independent damping and leaves the last facing direction unchanged at rest. Animation changes use a 0.16-second crossfade, and the mixer reads mutable refs rather than causing per-frame React renders.

If the GLB fails, a local primitive character fallback renders inside the same capsule while physics, camera, and the rest of the scene continue.

## Running

Holding either Shift key selects 5.25 units/s. Releasing Shift returns to 3.0 units/s. The final movement vector is normalized before speed is applied, so W+D remains 3.0 units/s instead of gaining a diagonal multiplier.

Running only changes horizontal speed. It does not alter gravity or jump velocity.

## Jumping And Grounded Detection

Space queues one jump on a fresh key-down edge. Browser key repeat is ignored, and the queue is consumed even when pressed in the air. This prevents held-space bunny hopping and landing-queued jumps.

Grounded detection casts downward rays from the capsule center and excludes the player's own rigid body. The center probe runs first; four small horizontal offsets are fallback probes for edges and steps. Flat floors therefore use one query per frame in the common case. A hit only counts when its normal points upward and the player is not moving upward faster than the grounded tolerance.

Decorative objects without colliders cannot affect grounded state. Walls and ceilings cannot count as ground because the probe direction and normal threshold reject their side and underside faces.

## Input Reset

WASD, Shift, Space edge state, and queued jumps are cleared when:

- Pointer Lock is released;
- an exhibit or discovery overlay opens;
- the browser window loses focus;
- the document becomes hidden;
- the player changes world location;
- the controller unmounts.

Resetting input stops horizontal motion while preserving vertical Rapier velocity. A player who pauses in the air continues to fall naturally instead of freezing.

## Pointer Lock Entry

- Clicking the Canvas, title HUD, paused background, or other non-interactive screen area requests Pointer Lock.
- There is no separate `Click to enter` button or selector-driven Pointer Lock path.
- Exhibits opened with `E` remember that they came from first-person mode; their X button or backdrop closes the exhibit and requests Pointer Lock.
- Exhibits opened from the paused Exhibits index close back to the index without requesting Pointer Lock.
- Pressing Escape closes an exhibit or exits Pointer Lock without automatically requesting it again.
- Links, exhibit-index buttons, form controls, and video controls keep their normal interaction instead of entering Pointer Lock.

## Transition Handling

World transitions retain their narrow doorway volumes and surrounding static wall colliders. A visitor can enter through the real doorway while walking, running, jumping, or climbing the entrance steps, but cannot reach that volume through the facade. On transition, the controller teleports to the existing target spawn, clears linear velocity and input, invalidates grounded state, and lets the destination floor establish the next grounded result.

The existing exterior return position and active-location geometry isolation remain unchanged.

## Controls

- `WASD`: move
- `Mouse`: look
- `V`: switch first-person / third-person view
- `Shift`: run
- `Space`: jump
- `E`: interact
- `Esc`: pause
- `P`: toggle development performance panel while paused

## Browser QA

Development-only `qaMovement` routes publish one JSON snapshot on `main[data-movement-qa]`. The instrumentation is guarded by `import.meta.env.DEV`, has no visible UI, and is removed from production behavior.

Single-tab hardware-accelerated checks on 2026-07-11:

| Check | Result |
| --- | --- |
| Walk | 3.0 units/s |
| Run | 5.25 units/s |
| W+D diagonal | 3.0 units/s |
| Standing jump | 1.000 units high, one impulse |
| Held Space | one jump after 3 seconds |
| Mid-air second press | one total jump |
| Jump again after landing | two completed jumps |
| Moving jump | 3.0 units/s horizontal control and 1.000-unit height |
| Input reset | inputs empty, horizontal speed 0, gravity retained |
| Interior jump | landed at the entrance after one 1.000-unit jump |
| Project plinth collision | stopped at z 3.074 instead of crossing the plinth |
| Ideas side collision | stopped at x -7.001 instead of crossing the wall/display |
| Entrance steps | ran over four static steps and entered the interior without sticking |
| Jumping entry | one moving jump passed through the real doorway and landed inside |
| Entry transition | resolved to `interior`, grounded at z 9.2 |
| Exit transition | resolved to `exterior`, grounded at z 7.15 |
| Overlay open | input-reset count increased and horizontal speed stayed 0 |
| View switch | third -> first -> third while retaining Pointer Lock state |
| Third-person animation | Idle, Walk, Run, and Jump state transitions observed |
| Third-person camera collision | interior boom shortened from 4.0 to 3.42 units |
| Third-person interaction | Welcome Console focused and opened with E |
| Missing player GLB | primitive fallback rendered; Canvas and physics stayed active |

Representative exterior performance after the movement pass: 144 FPS, 6.9 ms, 36 draw calls, and 7,772 visible triangles.

Representative same-location transition samples after the character pass were 126 FPS / 44 calls / 3,676 triangles in first person and 123 FPS / 51 calls / 12,376 triangles in third person. The character therefore adds seven visible calls and about 8,700 visible triangles in that view while remaining comfortably inside the 100-call and 100k-triangle budgets.

## Known Limits

- Desktop keyboard and mouse only; no mobile virtual controls.
- No stamina, crouch, slide, climb, double jump, moving platforms, head bob, or sprint FOV effect.
- The in-app automated browser blocks the native Pointer Lock API. Escape and overlay-close relock still rely on the existing manually verified Pointer Lock path; repeat that real-browser check before public deployment.
- Camera obstruction only sees Rapier colliders. Purely decorative geometry without a collider cannot shorten the third-person camera boom.
- The GLB supplies no separate Fall or Land clip, so airborne movement uses Jump and returns directly to the appropriate grounded clip.
- The current Rapier package emits its existing deprecated initialization warning in development.
