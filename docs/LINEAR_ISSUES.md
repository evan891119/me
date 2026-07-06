# Linear Issue Drafts

These are markdown drafts for Linear. Do not create the issues until the project direction and first implementation scope are confirmed.

## Confirmed Project Decisions

- Phase 1 stack: Vite + React + TypeScript + React Three Fiber.
- Package manager: npm.
- Deployment target: Vercel.
- Visual direction: small interactive game-like museum scene.
- Mobile strategy: fallback experience in Phase 1.
- First content inventory: not decided yet.

## Phase 0: Product and Architecture Decisions

### Issue 0.1: Confirm architecture decision and product spec

- Title: Confirm architecture decision and product spec
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
  - Open questions are either answered or moved into follow-up issues. Current open item: first 3-5 exhibit inventory.
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
- Goal: Decide the minimum real content needed for the first museum prototype.
- Scope:
  - List the first 3-5 exhibits.
  - Define the lobby introduction copy.
  - Define one contact exhibit.
  - Decide which links are safe to include in the prototype.
  - Mark any missing copy as placeholder content explicitly.
- Acceptance Criteria:
  - First exhibit list is documented.
  - Each exhibit has a title, short summary, body target, section, and link policy.
  - Prototype content can be represented in a data file without render-code edits.
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
- Status: Implemented, pending manual pointer-lock confirmation
- Goal: Let visitors move through the prototype using desktop first-person controls.
- Scope:
  - Add click-to-enter pointer lock.
  - Add WASD movement and mouse look.
  - Add Escape recovery behavior.
  - Add conservative speed and FOV defaults.
  - Add a minimal control prompt.
- Acceptance Criteria:
  - Implemented: WASD movement updates the camera while pointer lock is active.
  - Implemented: Mouse look is handled by Drei `PointerLockControls`.
  - Implemented: Escape exits pointer lock through the browser pointer-lock flow.
  - Implemented: Movement is disabled while overlay state is open.
  - Pending manual confirmation: automated in-app browser QA cannot grant pointer lock.
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
  - Note: No test asset was added because validation does not need one yet.
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
- Goal: Improve the prototype's spatial feel without starting a full art pass.
- Scope:
  - Add a few optimized low-weight GLB props or display stands.
  - Keep primitive fallback available.
  - Ensure assets are referenced through content or asset mapping data.
- Acceptance Criteria:
  - At least 2-3 exhibit objects use lightweight GLB assets.
  - Assets load reliably.
  - Performance budget is still met.
  - Scene still works if an asset is missing or delayed.
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
- Goal: Detect which exhibit the visitor is near and looking at.
- Scope:
  - Add proximity checks.
  - Add camera-facing or raycast-based focus logic.
  - Surface a focused exhibit ID in state.
  - Tune thresholds for small-world usability.
- Acceptance Criteria:
  - Prompt appears only for the intended nearby exhibit.
  - Focus changes predictably while moving.
  - The system handles overlapping nearby exhibits.
  - Focus detection does not create measurable frame drops.
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
- Goal: Let visitors intentionally open focused exhibits.
- Scope:
  - Show a concise prompt for focused exhibits.
  - Support `E` and click activation.
  - Connect activation to exhibit overlay.
  - Handle pointer lock transitions cleanly.
- Acceptance Criteria:
  - Prompt appears and disappears correctly.
  - `E` opens the focused exhibit.
  - Click activation works where appropriate.
  - Closing the overlay returns to exploration without stuck input.
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

### Issue 5.3: Add basic visitor guidance

- Title: Add basic visitor guidance
- Goal: Help visitors understand where to go without adding heavy navigation UI.
- Scope:
  - Add simple signs, lighting cues, or floor markers.
  - Add optional small HTML guidance state for first-time visitors.
  - Keep all guidance compatible with the content system.
- Acceptance Criteria:
  - A first-time visitor can find the first few exhibits.
  - Guidance does not clutter the scene.
  - Guidance does not require custom art.
  - Guidance can be disabled or reduced later.
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
- Goal: Make frame rate, draw calls, and asset weight visible during development.
- Scope:
  - Add a development-only performance panel or logging path.
  - Track FPS, frame timing, draw calls, triangles, and loaded asset sizes where feasible.
  - Keep instrumentation out of production or behind a debug flag.
- Acceptance Criteria:
  - Developers can inspect basic runtime performance.
  - Debug UI is hidden in production by default.
  - Performance budget can be checked during review.
- Files likely touched:
  - `src/world/debug/`
  - `src/state/useAppStore.ts`
  - `src/App.tsx`
- Dependencies:
  - Issue 2.1
- Out of scope:
  - Full telemetry pipeline
  - Analytics
  - Automated performance CI

### Issue 6.2: Optimize scene and assets against budget

- Title: Optimize scene and assets against budget
- Goal: Keep the first playable museum smooth on normal laptops.
- Scope:
  - Review draw calls, triangle counts, texture sizes, shadows, and physics cost.
  - Reduce or simplify expensive elements.
  - Add lazy loading or Suspense boundaries where useful.
  - Document the measured budget result.
- Acceptance Criteria:
  - Prototype meets frame rate target on the test machine.
  - Asset payload remains inside the phase budget.
  - No unnecessary post-processing is present.
  - Performance findings are documented.
- Files likely touched:
  - `docs/PERFORMANCE_NOTES.md`
  - `src/world/`
  - `public/assets/`
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
- Goal: Avoid a blank or confusing page when the 3D experience cannot run well.
- Scope:
  - Detect missing WebGL support or serious initialization failure.
  - Show a simple fallback message and contact links.
  - Consider a reduced-motion or low-quality mode flag.
- Acceptance Criteria:
  - WebGL initialization failure shows useful fallback UI.
  - Contact path remains available.
  - Fallback does not require duplicating all portfolio content.
- Files likely touched:
  - `src/ui/FallbackView.tsx`
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
- Goal: Make the museum communicate clearly with real portfolio content.
- Scope:
  - Polish exhibit titles, summaries, and body copy.
  - Verify all links.
  - Remove obvious placeholder content.
  - Keep content in data files.
- Acceptance Criteria:
  - Every launch exhibit has real copy.
  - Links are correct.
  - Contact exhibit is accurate.
  - Render components still contain no portfolio copy.
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
- Goal: Verify the site is stable enough to share publicly.
- Scope:
  - Test desktop keyboard and mouse flow.
  - Test pointer lock recovery.
  - Test exhibit activation and links.
  - Check loading state and fallback.
  - Run build and preview.
  - Record known limitations.
- Acceptance Criteria:
  - Core visitor path works from landing to contact.
  - No blocking console errors remain.
  - Known limitations are documented.
  - Launch decision is explicit.
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
