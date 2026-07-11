# Linear Issue Drafts

These markdown drafts are the repository tracking source. Status values reflect the current implementation and verification state; no Linear issues have been created automatically.

## Confirmed Project Decisions

- Phase 1 stack: Vite + React + TypeScript + React Three Fiber.
- Package manager: npm.
- Deployment target: Vercel.
- Visual direction: small interactive game-like museum scene.
- Mobile strategy: fallback experience in Phase 1.
- First content inventory: six launch exhibits covering lobby, background, project, skills, ideas, and contact.

## Phase 0: Product and Architecture Decisions

### Issue 0.1: Confirm architecture decision and product spec

- Title: Confirm architecture decision and product spec
- Status: Done
- Goal: Lock the initial technical and product boundaries before implementation starts.
- Scope:
  - Review `docs/ARCHITECTURE_DECISION.md`.
  - Review `docs/PRODUCT_SPEC.md`.
  - Decide whether Vite + React Three Fiber is accepted as the phase 1 stack.
  - Record any changes to target device, performance budget, or launch scope.
- Acceptance Criteria:
  - Architecture recommendation is accepted or explicitly revised. Current decision: accepted Vite + React Three Fiber for Phase 1.
  - Product scope for the first runnable version is confirmed. Current decision: small desktop-first interactive game-like museum with mobile fallback.
  - Non-goals are clear enough to prevent scope drift.
  - Done: Open questions are answered or moved into follow-up issues; the six-exhibit launch inventory is recorded.
- Files likely touched:
  - `docs/ARCHITECTURE_DECISION.md`
  - `docs/PRODUCT_SPEC.md`
  - `docs/LINEAR_ISSUES.md`
- Dependencies:
  - None
- Out of scope:
  - Bootstrapping code
  - Creating visual assets
  - Implementing the 3D scene

### Issue 0.2: Define first content inventory

- Title: Define first content inventory
- Status: Done
- Goal: Decide the minimum real content needed for the first museum prototype.
- Scope:
  - Done: List the six exhibits in the accepted minimal launch set.
  - Done: Define the lobby introduction copy.
  - Done: Define one contact exhibit.
  - Done: Decide which links are safe to include.
  - Done: Remove visible placeholder content from the launch set.
- Acceptance Criteria:
  - Done: First exhibit list is documented.
  - Done: Each exhibit has a title, short summary, body, section, tags, and link policy where applicable.
  - Done: Content is represented in typed data files without render-code edits.
- Files likely touched:
  - `docs/PRODUCT_SPEC.md`
  - `docs/content-inventory.md`
- Dependencies:
  - Issue 0.1
- Out of scope:
  - Writing final polished portfolio copy
  - Building the content system
  - Designing final exhibit visuals

## Phase 1: Project Bootstrap

### Issue 1.1: Bootstrap Vite React TypeScript project

- Title: Bootstrap Vite React TypeScript project
- Status: Done
- Goal: Create the clean app foundation without importing the old website architecture.
- Scope:
  - Initialize Vite with React and TypeScript using npm.
  - Add standard scripts for dev, build, preview, lint, and typecheck where appropriate.
  - Add basic project folders for app, world, content, state, UI, and assets.
  - Keep the initial screen minimal.
- Acceptance Criteria:
  - Done: Project installs cleanly with npm.
  - Done: `npm run dev` starts the local app.
  - Done: `npm run build` succeeds.
  - Done: Folder structure supports separate content and render code.
- Files likely touched:
  - `package.json`
  - `index.html`
  - `tsconfig.json`
  - `vite.config.ts`
  - `src/main.tsx`
  - `src/App.tsx`
  - `src/`
- Dependencies:
  - Issue 0.1
- Out of scope:
  - 3D movement
  - Physics
  - Final visual design

### Issue 1.2: Add base quality tooling

- Title: Add base quality tooling
- Status: Done
- Goal: Establish basic checks before 3D complexity is added.
- Scope:
  - Add TypeScript strictness appropriate for the project.
  - Add ESLint and formatting setup if not already included.
  - Add a minimal README development workflow.
  - Add a basic CI-ready command list.
- Acceptance Criteria:
  - Done: Typecheck command succeeds.
  - Done: Lint command succeeds.
  - Done: README explains install, dev, build, and preview.
  - Done: Tooling does not add heavy framework complexity.
- Files likely touched:
  - `package.json`
  - `tsconfig.json`
  - `eslint.config.*`
  - `README.md`
- Dependencies:
  - Issue 1.1
- Out of scope:
  - Unit test suite
  - Visual regression testing
  - Deployment setup

### Issue 1.3: Install 3D runtime dependencies

- Title: Install 3D runtime dependencies
- Status: Done
- Goal: Add the minimum runtime libraries required for the first-person prototype.
- Scope:
  - Add Three.js, React Three Fiber, Drei, Rapier integration, and Zustand.
  - Confirm package versions are compatible with the selected React version.
  - Add a minimal dependency note to architecture docs if versions require constraints.
- Acceptance Criteria:
  - Done: Dependency install succeeds.
  - Done: Build still succeeds.
  - Done: No unused large optional libraries are added.
  - Done: Architecture docs reflect the accepted Phase 1 stack.
- Files likely touched:
  - `package.json`
  - `package-lock.json` or selected lockfile
  - `docs/ARCHITECTURE_DECISION.md`
- Dependencies:
  - Issue 1.1
- Out of scope:
  - Implementing scene objects
  - Building player controls
  - Adding GLB assets

## Phase 2: First-Person World Prototype

### Issue 2.1: Create minimal R3F canvas and scene shell

- Title: Create minimal R3F canvas and scene shell
- Status: Done
- Goal: Render a stable full-screen 3D scene foundation.
- Scope:
  - Add a full-screen canvas.
  - Add basic camera, lighting, floor, and wall geometry.
  - Add a loading boundary.
  - Keep geometry primitive and lightweight.
- Acceptance Criteria:
  - Done: Scene renders without console errors in browser verification.
  - Done: Canvas resizes with the viewport in desktop and mobile-sized checks.
  - Done: Initial camera starts in a sensible lobby position.
  - Done: No post-processing is included.
- Files likely touched:
  - `src/App.tsx`
  - `src/world/MuseumScene.tsx`
  - `src/world/lighting.tsx`
  - `src/styles.css`
- Dependencies:
  - Issue 1.3
- Out of scope:
  - Player movement
  - GLB asset loading
  - Exhibit interaction

### Issue 2.2: Implement first-person movement and pointer lock

- Title: Implement first-person movement and pointer lock
- Status: Done
- Goal: Let visitors move through the prototype using desktop first-person controls.
- Scope:
  - Add click-to-enter pointer lock.
  - Add WASD movement and mouse look.
  - Add Escape recovery behavior.
  - Add conservative speed and FOV defaults.
  - Add a minimal control prompt.
- Acceptance Criteria:
  - Done: WASD movement updates the camera while pointer lock is active.
  - Done: Mouse look is handled by Drei `PointerLockControls`.
  - Done: Escape exits pointer lock through the browser pointer-lock flow.
  - Done: Movement is disabled while overlay state is open.
  - Done: Manual production-preview walkthrough confirmed Pointer Lock entry, movement, mouse look, Escape exit, and re-entry.
- Files likely touched:
  - `src/world/PlayerController.tsx`
  - `src/state/useAppStore.ts`
  - `src/ui/ControlPrompt.tsx`
  - `src/App.tsx`
- Dependencies:
  - Issue 2.1
- Out of scope:
  - Mobile controls
  - Sprint, jump, crouch, head bob
  - Advanced camera effects

### Issue 2.3: Add Rapier collision for the small world

- Title: Add Rapier collision for the small world
- Status: Done
- Goal: Prevent the player from walking through walls and exhibits.
- Scope:
  - Add physics world.
  - Add static colliders for floor, walls, and basic exhibit blocks.
  - Connect player movement to collision-aware motion.
  - Keep collision meshes simple.
- Acceptance Criteria:
  - Done: Player movement now uses a Rapier capsule body.
  - Done: Floor, walls, and prototype exhibit blocks use fixed Rapier colliders.
  - Done: Manual collision confirmation completed by the user.
  - Risk noted: Rapier increases production JS gzip size and should be revisited in the performance pass.
- Files likely touched:
  - `src/world/physics/`
  - `src/world/PlayerController.tsx`
  - `src/world/MuseumScene.tsx`
- Dependencies:
  - Issue 2.2
- Out of scope:
  - Dynamic physics props
  - Puzzle mechanics
  - Complex character animation

## Phase 3: Museum Content System

### Issue 3.1: Define typed museum content schema

- Title: Define typed museum content schema
- Status: Done
- Goal: Keep portfolio content separate from 3D render components.
- Scope:
  - Define TypeScript types for sections and exhibits.
  - Include metadata for placement, interaction, display style, links, and media references.
  - Add seed content for the first 3-5 exhibits.
  - Keep schema small enough to change while prototyping.
- Acceptance Criteria:
  - Done: Exhibit content lives in `src/content/exhibits.ts`.
  - Done: Render components consume typed museum metadata from content data.
  - Done: Portfolio copy is not hard-coded inside scene components.
  - Done: Schema supports the first prototype exhibit set.
  - Note: Seed exhibit copy is prototype copy, not final portfolio content.
- Files likely touched:
  - `src/content/types.ts`
  - `src/content/exhibits.ts`
  - `src/content/museum.ts`
- Dependencies:
  - Issue 0.2
  - Issue 1.1
- Out of scope:
  - CMS integration
  - Remote content fetching
  - Final copywriting

### Issue 3.2: Render exhibits from content data

- Title: Render exhibits from content data
- Status: Done
- Goal: Generate prototype exhibit objects from the content schema.
- Scope:
  - Map exhibit data to simple 3D objects.
  - Position exhibits from data.
  - Add lightweight labels or signs.
  - Keep content and component responsibilities separate.
- Acceptance Criteria:
  - Done: Adding an exhibit to `src/content/exhibits.ts` creates a visible exhibit.
  - Done: Exhibit placement is controlled by content transform data.
  - Done: Prototype display style is visible through data-driven accent colors.
  - Done: No component-specific copy duplication exists in scene components.
  - Deferred: readable text labels move to the exhibit overlay in Issue 3.3 to avoid 3D font asset overhead.
- Files likely touched:
  - `src/world/exhibits/ExhibitObject.tsx`
  - `src/world/exhibits/ExhibitGroup.tsx`
  - `src/content/exhibits.ts`
- Dependencies:
  - Issue 3.1
  - Issue 2.1
- Out of scope:
  - Final exhibit art
  - Complex GLB displays
  - Interaction overlay

### Issue 3.3: Build exhibit detail overlay

- Title: Build exhibit detail overlay
- Status: Done
- Goal: Show readable exhibit content when a visitor activates an exhibit.
- Scope:
  - Add selected exhibit state.
  - Add an HTML overlay for title, body, tags, media placeholder, and links.
  - Pause or disable movement while overlay is open.
  - Add close behavior.
- Acceptance Criteria:
  - Done: Activating an exhibit from the prototype index opens the correct content.
  - Deferred: Clicking a 3D exhibit object is disabled until Phase 5 focus/activation rules are implemented.
  - Done: Overlay content is readable on laptop screens.
  - Done: Escape or close button returns to exploration.
  - Done: Links are visible and intentional.
  - Deferred: gaze/proximity focus and `E` activation remain in Phase 5.
- Files likely touched:
  - `src/ui/ExhibitOverlay.tsx`
  - `src/state/useAppStore.ts`
  - `src/content/exhibits.ts`
  - `src/world/exhibits/ExhibitObject.tsx`
- Dependencies:
  - Issue 3.2
  - Issue 2.2
- Out of scope:
  - Final visual design
  - Markdown renderer
  - CMS editing UI

## Phase 4: Visual Direction and Asset Pipeline

### Issue 4.1: Define visual direction for the prototype museum

- Title: Define visual direction for the prototype museum
- Status: Done
- Goal: Establish a restrained visual language before adding assets.
- Scope:
  - Decide architecture mood, lighting style, material palette, typography direction, and exhibit object language.
  - Keep the design compatible with performance budgets.
  - Document what belongs in phase 1 versus later art passes.
- Acceptance Criteria:
  - Done: Visual direction is documented in `docs/VISUAL_DIRECTION.md`.
  - Done: Palette and material rules are clear.
  - Done: Prototype assets can be created without full art production.
  - Done: Post-processing remains deferred.
- Files likely touched:
  - `docs/VISUAL_DIRECTION.md`
  - `docs/ARCHITECTURE_DECISION.md`
- Dependencies:
  - Issue 0.1
- Out of scope:
  - Final art creation
  - Brand identity system
  - Complex shaders

### Issue 4.2: Set up GLB asset conventions

- Title: Set up GLB asset conventions
- Status: Done
- Goal: Make asset import and optimization predictable before real assets accumulate.
- Scope:
  - Define where runtime GLB files live.
  - Define naming conventions.
  - Document export settings.
  - Document optimization commands or tools.
  - Add one tiny test asset only if needed for validation.
- Acceptance Criteria:
  - Done: Asset folder structure is documented in `docs/ASSET_PIPELINE.md`.
  - Done: GLB naming and size expectations are clear.
  - Done: Optimization checklist exists.
  - Done: `.gitignore` blocks common large source asset formats and source staging folder contents.
  - Done: A temporary Meshopt-compressed GLB was generated for runtime validation and removed after QA.
- Files likely touched:
  - `docs/ASSET_PIPELINE.md`
  - `public/assets/models/`
  - `public/assets/textures/`
  - `.gitignore`
- Dependencies:
  - Issue 1.1
  - Issue 4.1
- Out of scope:
  - Full asset library
  - Blender source management system
  - Texture compression automation unless needed immediately

### Issue 4.3: Replace primitive exhibits with lightweight prototype assets

- Title: Replace primitive exhibits with lightweight prototype assets
- Status: Superseded by Issue 7.10 for the primitive launch baseline
- Goal: Improve the prototype's spatial feel without starting a full art pass.
- Scope:
  - Add a few optimized low-weight GLB props or display stands.
  - Keep primitive fallback available.
  - Ensure assets are referenced through content or asset mapping data.
- Acceptance Criteria:
  - Superseded: 2-3 final GLB exhibit objects are not required for the accepted primitive launch baseline.
  - Done in Issue 7.10: Standard and Meshopt GLB assets load through a data-driven optional layer.
  - Done: Performance budget is still met.
  - Done: Primitive displays remain available if an optional asset is absent, delayed, or fails.
- Files likely touched:
  - `public/assets/models/`
  - `src/world/exhibits/`
  - `src/content/exhibits.ts`
- Dependencies:
  - Issue 4.2
  - Issue 3.2
- Out of scope:
  - Final museum art
  - Character models
  - Advanced material effects

## Phase 5: Interaction System

### Issue 5.1: Add exhibit focus detection

- Title: Add exhibit focus detection
- Status: Done
- Goal: Detect which exhibit the visitor is near and looking at.
- Scope:
  - Add proximity checks.
  - Add camera-facing or raycast-based focus logic.
  - Surface a focused exhibit ID in state.
  - Tune thresholds for small-world usability.
- Acceptance Criteria:
  - Done: Focused exhibit state is surfaced through `focusedExhibitId`.
  - Done: Focus uses proximity plus camera-facing score.
  - Done: Overlapping nearby exhibits resolve by best combined facing/proximity score.
  - Done: State updates only when focus changes to avoid per-frame React churn.
  - Done: A minimal focused exhibit prompt appears for the currently focused exhibit.
  - Deferred: `E` activation and full interaction prompt copy are handled in Issue 5.2.
- Files likely touched:
  - `src/world/interactions/`
  - `src/world/exhibits/ExhibitObject.tsx`
  - `src/state/useAppStore.ts`
- Dependencies:
  - Issue 3.2
  - Issue 2.2
- Out of scope:
  - Complex dialogue system
  - Inventory or game mechanics
  - Mobile touch targeting

### Issue 5.2: Add interaction prompt and activation flow

- Title: Add interaction prompt and activation flow
- Status: Done
- Goal: Let visitors intentionally open focused exhibits.
- Scope:
  - Show a concise prompt for focused exhibits.
  - Support `E` activation in first-person and explicit exhibit-index button activation outside pointer lock.
  - Connect activation to exhibit overlay.
  - Handle pointer lock transitions cleanly.
- Acceptance Criteria:
  - Done: Prompt appears when an exhibit is focused during pointer lock.
  - Done: `E` opens the focused exhibit overlay.
  - Done: Opening an exhibit exits pointer lock before showing the overlay.
  - Done: Closing the overlay clears retained movement input.
  - Done: Closing a pointer-lock-opened overlay with the close button resumes first-person controls.
  - Deferred: 3D object click activation remains disabled until click rules are intentionally designed.
- Files likely touched:
  - `src/ui/InteractionPrompt.tsx`
  - `src/world/interactions/`
  - `src/ui/ExhibitOverlay.tsx`
  - `src/state/useAppStore.ts`
- Dependencies:
  - Issue 5.1
  - Issue 3.3
- Out of scope:
  - Voiceover
  - Animated UI transitions beyond basic polish
  - Multi-step interactions

### Issue 5.3: Stabilize first-person interaction lifecycle

- Title: Stabilize first-person interaction lifecycle
- Status: Done
- Goal: Make pointer lock, overlay state, and resume behavior predictable across the core visitor flow.
- Scope:
  - Preserve the pointer-lock entry button across lock/unlock transitions so Drei keeps its click listener.
  - Track whether the visitor has entered the world to show resume-oriented copy after unlock.
  - Track whether an overlay was opened from pointer lock before exiting pointer lock for readable HTML interaction.
  - Resume pointer lock from the close button only when the overlay originated from first-person controls.
  - Keep Escape behavior conservative: Escape exits pointer lock or closes the overlay without forcing re-entry.
- Acceptance Criteria:
  - Done: Initial entry uses `Click to enter`.
  - Done: Esc from first-person reveals the same entry button with resume copy instead of recreating an unbound button.
  - Done: Focused exhibit + `E` opens the overlay and releases pointer lock for HTML interaction.
  - Done: Close button from a pointer-lock-origin overlay requests pointer lock recovery from the same trusted click event.
  - Done: Escape from the overlay closes it without automatic pointer lock recovery.
  - Done: Opening an exhibit from the index does not force pointer lock recovery on close.
- Files likely touched:
  - `src/state/useAppStore.ts`
  - `src/ui/ControlPrompt.tsx`
  - `src/ui/ExhibitOverlay.tsx`
  - `src/world/MuseumScene.tsx`
  - `src/world/pointerLockEvents.ts`
  - `src/styles.css`
  - `docs/PRODUCT_SPEC.md`
- Dependencies:
  - Issue 5.1
  - Issue 5.2
- Out of scope:
  - Click-to-open 3D objects
  - Mobile touch controls
  - Complex modal routing
  - Automated pointer-lock E2E coverage beyond browser-supported checks

### Issue 5.4: Add basic visitor guidance

- Title: Add basic visitor guidance
- Status: Done through Issue 7.9
- Goal: Help visitors understand where to go without adding heavy navigation UI.
- Scope:
  - Add simple signs, lighting cues, or floor markers.
  - Add optional small HTML guidance state for first-time visitors.
  - Keep all guidance compatible with the content system.
- Acceptance Criteria:
  - Done: Exterior path markers and entrance framing lead visitors into the museum.
  - Done: Interior floor markers and gallery posts identify the exhibit route.
  - Done: Guidance does not clutter the scene.
  - Done: Guidance uses reusable primitives and does not require custom art.
- Files likely touched:
  - `src/world/guidance/`
  - `src/content/museum.ts`
  - `src/ui/ControlPrompt.tsx`
- Dependencies:
  - Issue 2.2
  - Issue 3.2
- Out of scope:
  - Minimap
  - Quest system
  - Guided tour mode

## Phase 6: Performance Pass

### Issue 6.1: Add performance instrumentation

- Title: Add performance instrumentation
- Status: Done
- Goal: Make frame rate, draw calls, and asset weight visible during development.
- Scope:
  - Add a development-only performance panel or logging path.
  - Track FPS, frame timing, draw calls, triangles, and loaded asset sizes where feasible.
  - Keep instrumentation out of production or behind a debug flag.
- Acceptance Criteria:
  - Done: Developers can inspect FPS, frame time, draw calls, triangles, lines, points, and transferred resource bytes.
  - Done: Debug UI is hidden in production by default through `import.meta.env.DEV`.
  - Done: Performance budget can be checked during review through the dev-only panel.
  - Done: Usage notes are documented in `docs/PERFORMANCE_NOTES.md`.
- Files likely touched:
  - `src/world/debug/`
  - `src/state/usePerformanceStore.ts`
  - `src/App.tsx`
  - `src/ui/PerformancePanel.tsx`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 2.1
- Out of scope:
  - Full telemetry pipeline
  - Analytics
  - Automated performance CI

### Issue 6.2: Optimize scene and assets against budget

- Title: Optimize scene and assets against budget
- Status: Done
- Goal: Keep the first playable museum smooth on normal laptops.
- Scope:
  - Review draw calls, triangle counts, texture sizes, shadows, and physics cost.
  - Reduce or simplify expensive elements.
  - Add lazy loading or Suspense boundaries where useful.
  - Document the measured budget result.
- Acceptance Criteria:
  - Done: Prototype baseline measures 144 FPS and 6.9 ms frame time on the current test machine.
  - Done: Runtime baseline measures 15 draw calls and 180 triangles.
  - Done: App code is split from React, Three/R3F, and Rapier vendor chunks.
  - Done: App chunk is 4.95 KB gzip after production build.
  - Done: No committed GLB or texture payload exists yet, so asset payload remains inside the phase budget.
  - Done: No unnecessary post-processing is present.
  - Done: Performance findings are documented in `docs/PERFORMANCE_NOTES.md`.
- Files likely touched:
  - `docs/PERFORMANCE_NOTES.md`
  - `src/world/`
  - `public/assets/`
  - `vite.config.ts`
- Dependencies:
  - Issue 4.3
  - Issue 5.2
  - Issue 6.1
- Out of scope:
  - Major visual redesign
  - WebGPU migration
  - Complex asset streaming system

### Issue 6.3: Add graceful fallback for unsupported environments

- Title: Add graceful fallback for unsupported environments
- Status: Done
- Goal: Avoid a blank or confusing page when the 3D experience cannot run well.
- Scope:
  - Detect missing WebGL support or serious initialization failure.
  - Show a simple fallback message and contact links.
  - Consider a reduced-motion or low-quality mode flag.
- Acceptance Criteria:
  - Done: WebGL support is checked before mounting the Canvas.
  - Done: Canvas/runtime initialization failure falls back through an error boundary.
  - Done: Fallback UI explains that the 3D museum needs a desktop WebGL browser.
  - Done: Contact path remains available through the contact exhibit link.
  - Done: Fallback does not duplicate all portfolio content.
- Files likely touched:
  - `src/ui/FallbackView.tsx`
  - `src/ui/CanvasErrorBoundary.tsx`
  - `src/utils/webglSupport.ts`
  - `src/App.tsx`
  - `src/content/exhibits.ts`
- Dependencies:
  - Issue 3.1
  - Issue 2.1
- Out of scope:
  - Full non-3D portfolio page
  - Mobile-first alternative experience
  - Browser-specific support matrix page

## Phase 7: Content Polish and Launch

### Issue 7.1: Replace prototype copy with launch-ready content

- Title: Replace prototype copy with launch-ready content
- Status: Done for the approved minimal launch set
- Goal: Make the museum communicate clearly with real portfolio content.
- Scope:
  - Done: Polish exhibit titles, summaries, and body copy.
  - Done: Verify all links currently exposed by the museum.
  - Done: Remove obvious placeholder content and empty media slots.
  - Done: Add a minimal ideas exhibit so every planned museum section is represented.
  - Done: Keep content in data files.
- Acceptance Criteria:
  - Done: Every launch exhibit has concise real copy for the approved minimum.
  - Done: Site title and summary use real copy.
  - Done: Featured project exhibit uses real copy for `discord-voice-relay-bot`.
  - Done: Contact exhibit is accurate with real email and GitHub link.
  - Done: Welcome, background, skills, and ideas exhibits no longer expose placeholder language.
  - Done: Current repository, email, and profile links are correct in rendered QA.
  - Done: Required content fields are captured in `docs/content-inventory.md`.
  - Done: Render components still contain no portfolio copy.
- Files likely touched:
  - `src/content/exhibits.ts`
  - `src/content/museum.ts`
  - `docs/content-inventory.md`
- Dependencies:
  - Issue 3.3
- Out of scope:
  - New content management system
  - Major world redesign
  - New interaction mechanics

### Issue 7.2: Final visual polish within performance budget

- Title: Final visual polish within performance budget
- Status: Done
- Goal: Improve the museum's feel without sacrificing smoothness.
- Scope:
  - Tune lighting, materials, labels, and spacing.
  - Add small environmental details only where they support orientation.
  - Keep post-processing minimal or absent unless profiling allows it.
- Acceptance Criteria:
  - Museum feels intentionally designed.
  - Text remains readable.
  - Performance budget is still met.
  - No large unoptimized assets are introduced.
- Files likely touched:
  - `src/world/`
  - `src/styles.css`
  - `public/assets/`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 6.2
  - Issue 7.1
- Out of scope:
  - Full custom art production
  - Complex shader work
  - Advanced post-processing stack

### Issue 7.3: Prepare static deployment

- Title: Prepare static deployment
- Status: Done
- Goal: Make the site ready for preview and production hosting.
- Scope:
  - Configure static build settings for Vercel.
  - Add deployment notes.
  - Confirm asset caching assumptions.
  - Run production preview locally.
- Acceptance Criteria:
  - `npm run build` succeeds.
  - Production preview runs.
  - Vercel deployment target and build command are documented.
  - No local-only asset paths remain.
- Files likely touched:
  - `README.md`
  - `package.json`
  - `vite.config.ts`
  - deployment config if needed
- Dependencies:
  - Issue 6.2
  - Issue 7.1
- Out of scope:
  - Custom domain setup
  - Analytics
  - Server-side APIs

### Issue 7.4: Launch readiness review

- Title: Launch readiness review
- Status: Done
- Goal: Verify the site is stable enough to share publicly.
- Scope:
  - Test desktop keyboard and mouse flow.
  - Test pointer lock recovery.
  - Test exhibit activation and links.
  - Check loading state and fallback.
  - Run build and preview.
  - Record known limitations.
- Acceptance Criteria:
  - Done: Core visitor path works from landing to contact.
  - Done: No blocking console errors remain.
  - Done: Known limitations are documented.
  - Done: Launch decision is explicit.
- Files likely touched:
  - `docs/LAUNCH_CHECKLIST.md`
  - `README.md`
  - bugfix files as needed
- Dependencies:
  - Issue 7.3
- Out of scope:
  - New features
  - Large content additions
  - Redesign

### Issue 7.5: Design lightweight exterior arrival scene

- Title: Design lightweight exterior arrival scene
- Status: Done
- Goal: Define the museum exterior experience before adding outdoor scene complexity.
- Scope:
  - Done: Turn `docs/EXTERIOR_WORLD_PLAN.md` into an accepted implementation boundary.
  - Done: Decide whether the visitor starts outside or reaches the exterior later.
  - Done: Define the first exterior layout as a small arrival plaza, not an open world.
  - Done: Set performance budgets for outdoor geometry, textures, colliders, and lighting.
  - Done: Identify the minimum assets required for a primitive blockout.
- Acceptance Criteria:
  - Done: Exterior direction is documented and accepted.
  - Done: The first exterior version has a clear visitor path to the museum entrance.
  - Done: Performance budget is explicit enough to evaluate the first implementation.
  - Done: Non-goals prevent open-world scope creep.
  - Done: Implementation can begin without needing final art assets.
- Files likely touched:
  - `docs/EXTERIOR_WORLD_PLAN.md`
  - `docs/LINEAR_ISSUES.md`
  - `docs/VISUAL_DIRECTION.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 6.1
  - Issue 6.2
- Out of scope:
  - Implementing the exterior scene
  - Creating final environment art
  - Adding streaming or portal rendering
  - Adding advanced post-processing
  - Building an explorable city or open world

### Issue 7.6: Implement primitive exterior arrival blockout

- Title: Implement primitive exterior arrival blockout
- Status: Done
- Goal: Add the first lightweight exterior scene as a bounded arrival plaza before the museum entrance.
- Scope:
  - Done: Add an exterior scene module using primitive geometry.
  - Done: Add an outdoor spawn point facing the museum entrance.
  - Done: Add a simple museum facade, path, boundary geometry, and distant silhouette layer.
  - Done: Add static Rapier colliders for ground, entrance, and boundaries only.
  - Done: Add a simple transition from exterior arrival into the existing museum interior.
  - Done: Measure draw calls, triangles, FPS, and frame time after implementation.
- Acceptance Criteria:
  - Done: Visitor starts outside and can identify the museum entrance immediately.
  - Done: Manual production-preview walkthrough confirmed the visitor can enter the interior without breaking Pointer Lock controls.
  - Done: Player cannot walk into unfinished empty space through static plaza boundaries.
  - Done: Exterior stays within the draw-call and triangle budgets in `docs/PERFORMANCE_NOTES.md`.
  - Done: No final GLB assets, post-processing, dynamic shadows, or complex outdoor systems are introduced.
  - Done: Fallback experience still works with `/?forceFallback=1`.
- Files likely touched:
  - `src/world/exterior/`
  - `src/world/MuseumScene.tsx`
  - `src/world/physics/`
  - `src/content/world.ts`
  - `src/state/useAppStore.ts`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 7.5
  - Issue 5.3
  - Issue 6.1
- Out of scope:
  - Final exterior art
  - GLB facade kit
  - Explorable city or open world
  - Animated doors or portal rendering
  - Advanced post-processing
  - Mobile first-person controls

### Issue 7.7: Add lightweight sky, ground materials, and exterior atmosphere

- Title: Add lightweight sky, ground materials, and exterior atmosphere
- Status: Done
- Goal: Make the exterior arrival scene feel intentional without adding heavy assets.
- Scope:
  - Done: Add a low-cost sky gradient or sky dome.
  - Done: Add shared lightweight materials for exterior ground, path, facade, boundary, and distant silhouettes.
  - Done: Improve distant world impression with cheap skyline or landscape layers.
  - Done: Add subtle entrance framing and warm exterior lighting.
  - Done: Keep the scene primitive-based and measurable.
- Acceptance Criteria:
  - Done: Exterior first view no longer reads as raw blockout.
  - Done: The museum entrance remains obvious from spawn.
  - Done: No GLB, texture payload, post-processing, particles, or dynamic shadows are introduced.
  - Done: Draw calls and triangles stay within the exterior budget.
  - Done: Fallback experience still works with `/?forceFallback=1`.
- Files likely touched:
  - `src/world/exterior/`
  - `src/world/materials/`
  - `src/world/MuseumScene.tsx`
  - `docs/PERFORMANCE_NOTES.md`
  - `docs/LINEAR_ISSUES.md`
- Dependencies:
  - Issue 7.6
- Out of scope:
  - Final environment art
  - GLB assets
  - Interior redesign
  - Post-processing
  - Mobile controls

### Issue 7.8: Build reusable interior material and primitive kit

- Title: Build reusable interior material and primitive kit
- Status: Done
- Goal: Give the museum interior a coherent visual system while keeping geometry lightweight.
- Scope:
  - Done: Add reusable materials for floors, walls, panels, plinths, accents, and terminals.
  - Done: Extract shared box geometry, material instances, and repeated primitive pieces.
  - Done: Apply the kit to the current interior shell and exhibit objects.
  - Done: Keep long text in HTML overlays.
- Acceptance Criteria:
  - Done: Interior shell and exhibits share an intentional material language.
  - Done: Exhibit display styles remain data-driven.
  - Done: No large texture or model payload is introduced.
  - Done: Performance budget remains valid.
- Files likely touched:
  - `src/world/materials/`
  - `src/world/exhibits/`
  - `src/world/MuseumScene.tsx`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 7.7
- Out of scope:
  - Final GLB art pass
  - CMS work
  - Layout expansion

### Issue 7.9: Add lightweight spatial guidance cues

- Title: Add lightweight spatial guidance cues
- Status: Done
- Goal: Help visitors understand the route from exterior arrival to exhibits without a heavy navigation system.
- Scope:
  - Done: Add primitive entrance cues, path highlights, and simple gallery markers.
  - Done: Reuse the existing control panel instead of adding more first-time UI.
  - Done: Keep guidance visual and text-free inside the 3D scene.
- Acceptance Criteria:
  - Done: Visitor can identify where to enter and where the first exhibits are.
  - Done: Guidance remains sparse at desktop and laptop viewports.
  - Done: No minimap, quest system, or guided tour is introduced.
- Files likely touched:
  - `src/world/guidance/`
  - `src/world/exterior/`
  - `src/world/MuseumScene.tsx`
  - `src/ui/ControlPrompt.tsx`
- Dependencies:
  - Issue 7.8
- Out of scope:
  - Minimap
  - Quest system
  - Dialogue system

### Issue 7.10: Polish exhibit display primitives

- Title: Polish exhibit display primitives
- Status: Done
- Goal: Make exhibit objects feel like portfolio displays instead of generic boxes.
- Scope:
  - Done: Improve exhibit proportions by display style.
  - Done: Add small primitive visual details for plinths, panels, workbenches, notes, and terminals.
  - Done: Keep exhibit content and placement data-driven.
  - Done: Add an optional code-split GLB layer with primitive and error fallback behavior.
  - Done: Verify an `EXT_meshopt_compression` GLB renders through the optional production loader.
- Acceptance Criteria:
  - Done: Each display style is visually distinct but consistent.
  - Done: Exhibit index, overlay open, and overlay close behavior pass browser QA.
  - Done: No final GLB art is required.
- Files likely touched:
  - `src/world/exhibits/`
  - `src/content/exhibits.ts`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 7.8
- Out of scope:
  - Final copywriting
  - Custom model pack
  - 3D text labels

## Phase 8: Explorable Exterior World

### Issue 8.1: Define the compact outdoor hub

- Title: Define the compact outdoor hub
- Status: Done
- Goal: Replace the narrow arrival-plaza boundary with a small explorable world that keeps the museum as its anchor.
- Scope:
  - Define four exterior zones and their roles.
  - Define a loop-and-branch navigation layout.
  - Set updated geometry, lighting, collider, and payload budgets.
  - Document the boundary between compact exploration and open-world scope.
- Acceptance Criteria:
  - Done: Museum Plaza, Garden Overlook, Signal Yard, and Archive Grove are documented.
  - Done: Every outdoor route returns to a recognizable landmark.
  - Done: Updated performance caps remain suitable for normal laptops.
  - Done: Future easter eggs have a defined data and interaction boundary.
- Files likely touched:
  - `docs/EXTERIOR_WORLD_PLAN.md`
  - `docs/PRODUCT_SPEC.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 7.7
- Out of scope:
  - City-scale open world
  - Procedural terrain
  - Final environment art

### Issue 8.2: Build the explorable exterior layout

- Title: Build the explorable exterior layout
- Status: Done
- Goal: Give visitors multiple outdoor destinations without increasing scene cost materially.
- Scope:
  - Expand the ground and physical boundary.
  - Add branch paths, terraces, museum shell, and zone landmarks.
  - Add sparse trees, lanterns, rocks, skyline, fog, and gradient sky.
  - Keep layout data outside React render components.
- Acceptance Criteria:
  - Done: All four zones render and are connected by walkable ground.
  - Done: Museum entrance remains visible and dominant from the default spawn.
  - Done: Player cannot leave the finished footprint through the outer boundary.
  - Done: Repeated environmental detail uses instancing.
  - Done: No textures, GLBs, post-processing, shadows, or dynamic props are added.
- Files likely touched:
  - `src/content/exteriorWorld.ts`
  - `src/world/exterior/`
  - `src/world/primitives/`
  - `src/world/materials/`
- Dependencies:
  - Issue 8.1
- Out of scope:
  - Streaming chunks
  - Dense foliage
  - Animated environment systems

### Issue 8.3: Add bidirectional museum transitions

- Title: Add bidirectional museum transitions
- Status: Done
- Goal: Let visitors move between the outdoor world and museum in both directions without breaking exploration state.
- Scope:
  - Generalize world transition data.
  - Add an interior-to-exterior exit trigger and exterior return spawn.
  - Add cooldown protection against immediate transition bounce.
  - Keep Pointer Lock and overlay state independent from location changes.
- Acceptance Criteria:
  - Done: Entry QA trigger changes active location to `interior`.
  - Done: Exit QA trigger changes active location to `exterior`.
  - Done: Target spawns are outside the opposite trigger.
  - Done: Location transitions do not unlock or relock Pointer Lock.
- Files likely touched:
  - `src/content/world.ts`
  - `src/world/PlayerController.tsx`
  - `src/state/useAppStore.ts`
- Dependencies:
  - Issue 8.2
  - Issue 5.3
- Out of scope:
  - Animated doors
  - Portal rendering
  - Scene streaming

### Issue 8.4: Add data-driven outdoor discoveries

- Title: Add data-driven outdoor discoveries
- Status: Done
- Goal: Let future easter eggs be added as content data instead of one-off React components.
- Scope:
  - Define typed discovery content and display styles.
  - Add three initial discovery slots across outdoor zones.
  - Render discovery objects from data.
  - Reuse the focus, E-key prompt, and HTML overlay interaction model.
- Acceptance Criteria:
  - Done: A discovery contains title, summary, body, tags, zone, style, transform, and interaction radius.
  - Done: Adding an object to `worldDiscoveries` requires no renderer change.
  - Done: Discovery overlay opens and closes through the shared content system.
  - Done: Museum exhibit overlays still work after the state refactor.
- Files likely touched:
  - `src/content/exteriorWorld.ts`
  - `src/content/interactiveContent.ts`
  - `src/content/types.ts`
  - `src/world/interactions/DiscoveryFocusDetector.tsx`
  - `src/ui/InteractionPrompt.tsx`
  - `src/ui/ExhibitOverlay.tsx`
- Dependencies:
  - Issue 8.2
  - Issue 5.2
- Out of scope:
  - Quest tracking
  - Achievement system
  - Remote CMS

### Issue 8.5: Optimize repeated outdoor geometry

- Title: Optimize repeated outdoor geometry
- Status: Done
- Goal: Keep the expanded world within the existing laptop performance target.
- Scope:
  - Share geometry and material instances.
  - Instance decorative boxes, trees, lanterns, and rocks.
  - Restrict colliders to ground, boundaries, facade, and large obstacles.
  - Keep distant context visual-only.
- Acceptance Criteria:
  - Done: Outdoor scene remains below 100 draw calls and 100k visible triangles.
  - Done: There is no new production texture or model payload.
  - Done: There are no per-detail Rapier rigid bodies for foliage, lanterns, or rocks.
  - Done: App gzip growth remains modest and measured.
- Files likely touched:
  - `src/world/primitives/`
  - `src/world/exterior/`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.2
- Out of scope:
  - Occlusion culling system
  - LOD framework
  - GPU compute or WebGPU path

### Issue 8.6: Verify outdoor world launch readiness

- Title: Verify outdoor world launch readiness
- Status: Done
- Goal: Prove the expanded world renders, transitions, interacts, and stays inside budget.
- Scope:
  - Run typecheck, lint, and production build.
  - Inspect default, garden, signal, archive, entry, exit, and discovery QA routes.
  - Recheck fallback and original exhibit overlay behavior.
  - Record current runtime and bundle measurements.
- Acceptance Criteria:
  - Done: Typecheck, lint, and production build pass.
  - Done: Default and zone preview routes render without application errors.
  - Done: Entry and exit state transitions pass.
  - Done: Discovery and museum overlays both pass open/close regression checks.
  - Done: Runtime metrics remain within the exterior budget.
  - Done: Forced fallback remains available.
- Files likely touched:
  - `docs/PERFORMANCE_NOTES.md`
  - `docs/LAUNCH_CHECKLIST.md`
  - `README.md`
- Dependencies:
  - Issue 8.3
  - Issue 8.4
  - Issue 8.5
- Out of scope:
  - Cross-device lab testing
  - Mobile controls
  - Final personal easter-egg copy

### Issue 8.7: Prototype a production Signal Tower GLB

- Title: Prototype a production Signal Tower GLB
- Status: Done
- Goal: Measure the real visual and performance cost of replacing one exterior primitive landmark with an optimized GLB.
- Scope:
  - Generate a low-poly Signal Tower GLB with no texture or animation dependency.
  - Merge geometry by material and keep the asset below the ordinary prop budget.
  - Load the model through a code-split environment asset component.
  - Preserve the existing primitive tower during loading and after failure.
  - Compare primitive, GLB, and missing-model fallback variants.
- Acceptance Criteria:
  - Done: Model is 69,948 bytes, 944 triangles, 2 meshes, and 2 materials.
  - Done: Normal model route renders with no asset error.
  - Done: Intentional missing-model route renders the primitive fallback.
  - Done: GLB variant remains near the primitive FPS and frame-time baseline.
  - Done: Draw calls remain below 100 and visible triangles remain below 100k.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/landmark-signal-tower.v1.glb`
  - `scripts/generate-signal-tower.mjs`
  - `src/content/exteriorWorld.ts`
  - `src/world/assets/WorldModelAsset.tsx`
  - `src/world/exterior/SignalTowerLandmark.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.2
  - Issue 8.5
- Out of scope:
  - Texture authoring
  - Animation
  - Real-time shadows
  - Replacing additional landmarks
  - Adding a general LOD system

### Issue 8.8: Add the Museum Entrance GLB

- Title: Add the Museum Entrance GLB
- Status: Done
- Goal: Improve the first-view museum landmark without changing navigation or exceeding the exterior budget.
- Scope:
  - Generate a two-material decorative entrance frame.
  - Replace only the primitive entrance accents, not the facade or colliders.
  - Reuse the lazy world-model loader and primitive fallback path.
  - Compare primitive, model, and missing-model variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 19,240 bytes, 240 triangles, 2 meshes, and 2 materials.
  - Done: GLB adds no measured draw calls at the Museum Plaza spawn.
  - Done: Missing model restores the primitive entrance.
  - Done: Navigation collider geometry remains unchanged.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/landmark-museum-entrance.v1.glb`
  - `scripts/generate-museum-entrance.mjs`
  - `src/content/exteriorWorld.ts`
  - `src/world/exterior/MuseumEntranceLandmark.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.7
- Out of scope:
  - Replacing the full facade
  - Texture authoring
  - Animated doors
  - Real-time shadows

### Issue 8.9: Add the Garden Bench GLB

- Title: Add the Garden Bench GLB
- Status: Done
- Goal: Replace the Garden Overlook placeholder seat with a readable low-poly prop without increasing navigation cost.
- Scope:
  - Generate a wood-slat and metal-frame bench with two merged meshes.
  - Separate the visual model from one simple invisible cuboid collider.
  - Preserve the former seat block as loading and failure fallback.
  - Move the garden lantern away from the bench sightline.
  - Compare primitive and model variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 18,176 bytes, 228 triangles, 2 meshes, and 2 materials.
  - Done: Model and primitive samples both run at 137 FPS and 7.3 ms.
  - Done: Draw calls remain at 64 in the measured Garden Overlook view.
  - Done: Missing-model route reaches the shared fallback boundary.
  - Done: Player collision remains one cuboid.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/prop-garden-bench.v1.glb`
  - `scripts/generate-garden-bench.mjs`
  - `src/content/exteriorWorld.ts`
  - `src/world/primitives/StaticBox.tsx`
  - `src/world/exterior/GardenBenchLandmark.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.8
- Out of scope:
  - Multiple bench instances
  - Texture maps
  - Detailed collision mesh
  - Sitting animation

### Issue 8.10: Add the Archive Core GLB

- Title: Add the Archive Core GLB
- Status: Done
- Goal: Give the Archive Grove a distinct landmark without coupling the easter egg content to model code.
- Scope:
  - Generate a two-material archive frame, base, and signal-ring model.
  - Keep the interactive cache rendered from `worldDiscoveries`.
  - Add no new collider or physics body.
  - Preserve the primitive core as loading and failure fallback.
  - Compare primitive, model, and missing-model variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 45,460 bytes, 604 triangles, 2 meshes, and 2 materials.
  - Done: GLB adds one measured draw call and remains below the exterior cap.
  - Done: Interactive cache data and radius remain unchanged.
  - Done: Missing-model route restores the primitive core.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/landmark-archive-core.v1.glb`
  - `scripts/generate-archive-core.mjs`
  - `src/content/exteriorWorld.ts`
  - `src/world/exterior/ArchiveCoreLandmark.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.9
- Out of scope:
  - Changing discovery copy
  - New collision
  - Animation or particles
  - Texture maps

### Issue 8.11: Add the Project Voice Relay artifact

- Title: Add the Project Voice Relay artifact
- Status: Done
- Goal: Prove the data-driven exhibit media pipeline with a real project-specific GLB.
- Scope:
  - Generate a dual-node voice-relay sculpture with two merged materials.
  - Reference the GLB from the `project-plinth` media data.
  - Keep project copy in the HTML overlay and collision on the primitive plinth.
  - Preserve the primitive display during loading and after failure.
  - Compare primitive, model, and missing-model variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 71,316 bytes, 964 triangles, 2 meshes, and 2 materials.
  - Done: Model is configured from exhibit content data.
  - Done: Missing-model route retains the full primitive plinth.
  - Done: Interior remains below draw-call and triangle caps.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/exhibit-project-voice-relay.v1.glb`
  - `scripts/generate-project-voice-relay.mjs`
  - `src/content/exhibits.ts`
  - `src/world/exhibits/ExhibitObject.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.10
  - Issue 7.10
- Out of scope:
  - Animated audio waves
  - Texture maps
  - Replacing project text with 3D labels
  - New collision geometry

### Issue 8.12: Add the Skills Workbench artifact

- Title: Add the Skills Workbench artifact
- Status: Done
- Goal: Give the skills exhibit a readable modular artifact while proving targeted exhibit-model A/B controls.
- Scope:
  - Generate a three-module workbench artifact with two merged materials.
  - Reference the model from `skills-workbench` media data.
  - Add targeted `exhibitModel=<id>:<mode>` development testing.
  - Keep the primitive exhibit and collider as fallback.
  - Compare primitive, model, and missing variants with the Project Artifact still loaded.
- Acceptance Criteria:
  - Done: Asset is 21,844 bytes, 276 triangles, 2 meshes, and 2 materials.
  - Done: Skills model is configured from exhibit data.
  - Done: Targeted primitive and missing modes affect only Skills Workbench.
  - Done: Missing-model route retains the primitive exhibit.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/exhibit-skills-workbench.v1.glb`
  - `scripts/generate-skills-workbench.mjs`
  - `src/content/exhibits.ts`
  - `src/world/exhibits/ExhibitObject.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.11
- Out of scope:
  - Interactive switches
  - Animated tools
  - Texture maps
  - New collision geometry

### Issue 8.13: Add the Working Principles relief

- Title: Add the Working Principles relief
- Status: Done
- Goal: Give the Ideas exhibit a readable visual identity without replacing its data-driven copy or primitive fallback.
- Scope:
  - Generate a wall-mounted three-branch decision compass with two merged materials.
  - Reference the model from `ideas-note` media data.
  - Add a development-only Ideas spawn for repeatable side-wall QA.
  - Keep the primitive note display and collider unchanged.
  - Compare primitive, model, and missing variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 43,464 bytes, 576 triangles, 2 meshes, and 2 materials.
  - Done: Model is configured from exhibit data and renders on the front of the wall display.
  - Done: Targeted missing mode returns to 35 calls and 2,540 visible triangles.
  - Done: No texture, animation, shadow, or collision payload is added.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/exhibit-working-principles.v1.glb`
  - `scripts/generate-working-principles.mjs`
  - `src/content/exhibits.ts`
  - `src/world/PlayerController.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.12
- Out of scope:
  - 3D text
  - Animated branches
  - Texture maps
  - New collision geometry

### Issue 8.14: Add the Contact Terminal artifact

- Title: Add the Contact Terminal artifact
- Status: Done
- Goal: Give the final contact exhibit a recognizable communication object while preserving accessible HTML contact actions.
- Scope:
  - Generate a low-poly terminal with an angled display, dual antennas, and signal indicators.
  - Reference the model from `contact-terminal` media data.
  - Add a development-only Contact spawn for repeatable side-wall QA.
  - Keep contact copy, email, and profile links in the HTML overlay.
  - Compare primitive, model, and missing variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 50,372 bytes, 672 triangles, 2 meshes, and 2 materials.
  - Done: Model renders on the front of the Contact display.
  - Done: Targeted missing mode returns to 37 calls and 3,252 visible triangles.
  - Done: Primitive collision and accessible contact links remain unchanged.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/exhibit-contact-terminal.v1.glb`
  - `scripts/generate-contact-terminal.mjs`
  - `src/content/exhibits.ts`
  - `src/world/PlayerController.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.13
- Out of scope:
  - Sending messages inside the 3D scene
  - Animated antenna signals
  - Texture maps
  - New collision geometry

### Issue 8.15: Add the Welcome Console artifact

- Title: Add the Welcome Console artifact
- Status: Done
- Goal: Complete enabled interior exhibit model coverage with a clear first-minute orientation object.
- Scope:
  - Generate a low-poly console with a dark display, route map, nodes, and direction markers.
  - Reference the model from `welcome-console` media data.
  - Add a development-only Welcome spawn for repeatable front-facing QA.
  - Keep instructions in HTML and collision on the primitive display.
  - Compare primitive, model, and missing variants in one test tab.
- Acceptance Criteria:
  - Done: Asset is 23,872 bytes, 304 triangles, 2 meshes, and 2 materials.
  - Done: Route lines and nodes have sufficient contrast against the console display.
  - Done: Targeted missing mode returns to 29 calls and 1,788 visible triangles.
  - Done: All five enabled interior exhibits now reference dedicated model media.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `public/assets/models/exhibit-welcome-console.v1.glb`
  - `scripts/generate-welcome-console.mjs`
  - `src/content/exhibits.ts`
  - `src/world/PlayerController.tsx`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.14
- Out of scope:
  - 3D instructional text
  - Animated route guidance
  - Texture maps
  - New collision geometry

### Issue 8.16: Upgrade the procedural exterior sky

- Title: Upgrade the procedural exterior sky
- Status: Done
- Goal: Make the exterior read as a continuous world rather than a prototype surrounded by a dark gradient.
- Scope:
  - Replace the minimum three-color dome with a 360-degree dawn atmosphere.
  - Add a procedural sun disc, atmospheric glow, and static cloud bands in the existing shader draw call.
  - Align fog, skyline colors, hemisphere light, and directional light with the sky.
  - Check the default, Garden, and Signal viewpoints in one browser tab.
- Acceptance Criteria:
  - Done: No visible sky seam appears at the sampled exterior viewpoints.
  - Done: Sun direction and scene lighting are visually consistent.
  - Done: The sky remains one draw call with no texture, HDRI, post-processing, particle, or shadow payload.
  - Done: Warmed samples remain above 60 FPS and below 100 calls and 100k visible triangles.
  - Done: Typecheck, lint, and production build pass.
- Files likely touched:
  - `src/world/exterior/Atmosphere.tsx`
  - `src/world/MuseumScene.tsx`
  - `src/world/lighting.tsx`
  - `docs/WORLD_COMPLETION_PLAN.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.15
- Out of scope:
  - Dynamic time of day
  - Weather animation
  - HDRI lighting
  - Post-processing or volumetric clouds

### Issue 8.17: Complete the reference-driven exterior environment

- Title: Complete the reference-driven exterior environment
- Status: Done
- Goal: Bring the playable exterior close to the approved low-poly dusk museum reference while retaining normal-laptop performance.
- Scope:
  - Rebuild the central museum massing, entrance frame, banners, doors, light strips, and approach stairs.
  - Complete South Arrival Plaza, loop paths, branch routes, paving joints, curbs, and raised planting frames.
  - Complete West Garden, East Signal Courtyard, Archive Grove, and three exploration alcoves.
  - Add reusable low-poly modules for walls, planters, paving, steps, benches, lanterns, trees, rocks, and clustered plants.
  - Strengthen skyline, perimeter silhouette, horizon continuity, and warm fake-light pools.
  - Reuse one browser tab for iterative screenshots and measure every major exterior destination.
  - Verify production fallback and update durable QA documentation.
- Acceptance Criteria:
  - Done: Museum silhouette, plaza composition, zone identities, palette, and environment density visibly follow the reference.
  - Done: Garden, Signal, Archive, and three alcoves have distinct readable first-person compositions.
  - Done: Content and placement remain data-driven; repeated geometry and guidance are instanced.
  - Done: No heavy post-processing, real-time shadow, texture, HDRI, particle, or dynamic-weather payload is introduced.
  - Done: Reliable samples remain above 60 FPS, below 100 calls, and below 100k visible triangles.
  - Done: Movement, existing colliders, exhibits, optional GLB fallbacks, and non-WebGL fallback remain intact.
  - Done: Typecheck, lint, production build, visual QA, and fallback verification pass.
- Files likely touched:
  - `src/content/exteriorWorld.ts`
  - `src/world/exterior/Atmosphere.tsx`
  - `src/world/exterior/ExteriorDetails.tsx`
  - `src/world/exterior/ExteriorWorld.tsx`
  - `src/world/guidance/SpatialGuidance.tsx`
  - `src/world/materials/worldMaterials.ts`
  - `docs/ENVIRONMENT_ART_PASS.md`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.16
- Out of scope:
  - Pixel-identical offline rendering
  - Real-time shadows or SSAO
  - Volumetric weather or dynamic time of day
  - Full city geometry

### Issue 8.18: Isolate interior and exterior world rendering

- Title: Isolate interior and exterior world rendering
- Status: Done
- Goal: Prevent new exterior architecture from intersecting the museum interior after a location transition.
- Scope:
  - Mount exterior world geometry only while the active location is `exterior`.
  - Mount the interior shell and exhibits only while the active location is `interior`.
  - Filter spatial guidance to the active location.
  - Add the missing non-colliding interior ceiling slab.
  - Verify both interior and exterior QA routes in one browser tab.
- Acceptance Criteria:
  - Done: Exterior massing no longer appears as black walls inside the museum.
  - Done: No sky gap remains above the interior.
  - Done: Interior exhibits and guidance remain visible.
  - Done: Exterior world remounts when returning outside.
  - Done: Typecheck, lint, production build, and browser QA pass.
- Files likely touched:
  - `src/world/MuseumScene.tsx`
  - `src/world/guidance/SpatialGuidance.tsx`
  - `src/world/interior/InteriorShell.tsx`
  - `docs/PERFORMANCE_NOTES.md`
- Dependencies:
  - Issue 8.17
- Out of scope:
  - Redesigning the interior
  - Changing transition coordinates
  - Adding ceiling collision or shadows

### Issue 8.19: Expand the museum into a complete interior world

- Title: Expand the museum into a complete interior world
- Status: Done
- Goal: Replace the single small room with a larger, readable museum route while preserving the isolated location architecture and laptop performance budget.
- Scope:
  - Build a 16 x 22 x 5.2 interior with an entrance lobby, central Project Gallery, Ideas Gallery, Skills Gallery, and Contact / Exit zone.
  - Define typed layout, collider, exhibit-transform, preview, and guidance data outside React render components.
  - Render repeated walls, floors, ceilings, columns, doorways, dividers, plinths, panels, light fixtures, and inlays with shared materials and instancing.
  - Reposition all enabled exhibits and preserve their data-driven GLB media, primitive fallbacks, copy, and interaction behavior.
  - Update entrance and exit spawns for the expanded footprint.
  - Verify every zone, exhibit dialog, transition direction, fallback, and performance budget in one browser tab.
- Acceptance Criteria:
  - Done: The interior has five distinct, connected zones and does not expose every exhibit from the entrance.
  - Done: Background Timeline remains disabled.
  - Done: Exterior and interior geometry remain mutually exclusive by active location.
  - Done: Entrance spawn focuses no exhibit; all five enabled exhibits focus and open with `E`.
  - Done: Both transition directions resolve to the correct location.
  - Done: Representative samples remain above 60 FPS, below 100 draw calls, and below 100k visible triangles.
  - Done: Typecheck, lint, production build, and forced fallback verification pass.
- Files likely touched:
  - `src/content/interiorLayout.ts`
  - `src/content/exhibits.ts`
  - `src/content/world.ts`
  - `src/world/interior/InteriorShell.tsx`
  - `src/world/PlayerController.tsx`
  - `src/world/lighting.tsx`
  - `src/world/materials/worldMaterials.ts`
  - `docs/INTERIOR_EXPANSION.md`
  - `docs/PERFORMANCE_NOTES.md`
  - `docs/LAUNCH_CHECKLIST.md`
- Dependencies:
  - Issue 8.18
- Out of scope:
  - Re-enabling Background Timeline
  - Mobile first-person controls
  - Dynamic doors, props, NPCs, or room streaming
  - Real-time shadows, post-processing, or texture-heavy art

### Issue 8.20: Add grounded jumping and hold-to-run movement

- Title: Add grounded jumping and hold-to-run movement
- Status: Done
- Goal: Extend the Rapier first-person controller with stable running and jumping while preserving Pointer Lock, interactions, collisions, transitions, fallback behavior, and laptop performance.
- Scope:
  - Keep normalized, horizontal camera-relative WASD movement at 3.0 units/s.
  - Add hold-to-run with either Shift key at 5.25 units/s.
  - Enable Rapier gravity and add a 4.45 units/s grounded jump impulse.
  - Detect ground with self-excluding downward ray casts and an upward-normal threshold.
  - Preserve vertical velocity while controlling horizontal velocity and use limited air control.
  - Clear WASD, Shift, Space, and queued-jump state on Pointer Lock exit, overlay open, blur, hidden document, transition, and unmount.
  - Preserve narrow doorway transition volumes and reset velocity after teleporting.
  - Add development-only movement QA snapshots without production UI.
  - Update the visible control legend and movement documentation.
- Acceptance Criteria:
  - Done: Walk, run, and diagonal QA measure 3.0, 5.25, and 3.0 units/s respectively.
  - Done: Standing and moving jumps reach about 1.0 unit through Rapier velocity and gravity.
  - Done: Held Space causes one jump, an air press cannot double jump, and landing permits a second jump.
  - Done: Overlay and explicit reset QA clear all input and stop horizontal velocity without cancelling gravity.
  - Done: Exterior and interior floors ground correctly; Project and Ideas collision checks stop the capsule.
  - Done: Four entrance-step colliders support running and jumping through the real doorway.
  - Done: Entry and exit transitions resolve to the correct grounded destination spawn.
  - Done: Forced fallback preserves Email and GitHub without mounting a Canvas.
  - Done: Runtime remains above 60 FPS, below 100 draw calls, and below 100k visible triangles.
  - Done: Typecheck, lint, production build, and `git diff --check` pass.
- Files likely touched:
  - `src/world/playerMovement.ts`
  - `src/world/PlayerController.tsx`
  - `src/world/MuseumScene.tsx`
  - `src/content/exteriorWorld.ts`
  - `src/ui/ControlPrompt.tsx`
  - `src/styles.css`
  - `src/vite-env.d.ts`
  - `docs/PLAYER_MOVEMENT.md`
  - `docs/PERFORMANCE_NOTES.md`
  - `docs/LAUNCH_CHECKLIST.md`
- Dependencies:
  - Issue 8.19
- Out of scope:
  - Stamina, crouch, slide, climb, or double jump
  - Character models, animation, footstep audio, particles, or camera effects
  - Moving platforms or mobile virtual controls
  - Museum content or art-direction changes
