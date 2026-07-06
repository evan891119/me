# Asset Pipeline: GLB and Texture Conventions

## Status

Accepted for the prototype phase. This document defines where runtime assets live, how they should be named, and what must be checked before adding models or textures to the app.

## Goals

- Keep runtime assets predictable and easy to reference from content data.
- Prevent large unoptimized source assets from entering the production bundle.
- Preserve performance on normal laptops.
- Make asset review mechanical enough to repeat as the museum grows.

## Runtime Asset Folders

Runtime assets live under `public/assets/` so Vite can serve them as static files.

```text
public/
  assets/
    models/
      README.md or .gitkeep
    textures/
      README.md or .gitkeep
    source-not-committed/
      .gitkeep
```

Use these paths from content data:

```ts
media: [
  {
    type: 'model',
    src: '/assets/models/exhibit-project-plinth.v1.glb',
    alt: 'Low-poly project exhibit plinth',
  },
]
```

## Source Asset Policy

Do not commit large source files to the runtime asset folders.

Examples of source files that should normally stay out of the repo:

- `.blend`
- `.fbx`
- `.obj`
- `.psd`
- `.kra`
- `.spp`
- `.exr`
- large uncompressed `.png` texture sources

If a source asset must be preserved, store it outside the runtime path and document the location in a separate handoff note. Small source files can be committed only when there is a clear reason and they do not threaten repo size.

## Naming Conventions

Use lowercase kebab-case.

Models:

```text
<category>-<subject>.v<version>.glb
```

Examples:

```text
exhibit-project-plinth.v1.glb
exhibit-contact-terminal.v1.glb
room-wall-module.v1.glb
room-sign-frame.v1.glb
landmark-lobby-pillar.v1.glb
```

Textures:

```text
<category>-<subject>-<channel>.<size>.<extension>
```

Examples:

```text
wall-concrete-basecolor.1k.webp
wall-concrete-roughness.1k.webp
plinth-brass-basecolor.1k.webp
terminal-screen-emissive.1k.webp
```

Allowed channel names:

- `basecolor`
- `normal`
- `roughness`
- `metallic`
- `emissive`
- `ao`
- `opacity`

## Versioning

Use explicit asset versions when replacing a file could affect cached deployments.

Rules:

- Prefer `v1`, `v2`, `v3` in filenames.
- Do not overwrite an existing public asset filename after it has shipped.
- Update content references when moving to a new asset version.
- Delete unused local prototype assets before launch if they were never shipped.

## Size Budgets

Prototype budget:

- Single ordinary prop GLB: target under 300 KB compressed.
- Important exhibit GLB: target under 750 KB compressed.
- First prototype total runtime asset payload: under 8 MB compressed.
- Launch total runtime asset payload: under 15-20 MB compressed unless progressive loading is implemented.

Texture budget:

- Default texture size: 1K.
- Use 2K only for close-inspection hero assets.
- Avoid 4K textures in the prototype.
- Prefer WebP for simple image textures until KTX2/Basis tooling is added.

Geometry budget:

- Ordinary prop: target under 5k triangles.
- Important exhibit object: target under 20k triangles.
- Room kit module: target under 10k triangles.
- Keep first prototype visible triangles under the architecture budget.

## Blender Export Settings

Recommended GLB export settings:

- Format: GLB.
- Include selected objects only.
- Apply transforms before export.
- Remove unused cameras and lights unless the asset intentionally needs them.
- Use real-world-ish scale: 1 Blender unit equals 1 meter.
- Put object origins in predictable places, usually bottom center for props.
- Keep names readable before export.
- Do not bake collision into high-poly render meshes.

Scene hygiene before export:

- remove hidden scratch objects;
- remove unused materials;
- merge static pieces only when it reduces draw calls without hurting reuse;
- freeze transforms;
- check normals;
- check scale in a clean import file if uncertain.

## Collision Policy

Collision should remain simpler than visuals.

Rules:

- Use primitive colliders when possible.
- Use separate low-poly collision meshes for complex objects.
- Do not use detailed visual meshes as colliders unless profiling proves it is safe.
- Keep player navigation collision conservative and stable.

Content data should reference visual assets. Collision setup should be controlled by rendering/physics components or explicit collider metadata when needed.

## Optimization Checklist

Before committing a runtime GLB:

1. Confirm the file is actually used or planned by an issue.
2. Confirm the filename follows the naming convention.
3. Inspect file size.
4. Inspect approximate triangle count.
5. Remove unused cameras, lights, meshes, and materials.
6. Check texture dimensions.
7. Prefer 1K textures.
8. Confirm object scale in the browser scene.
9. Confirm collision remains simple.
10. Run the app and verify there are no console asset-loading errors.

Optimization tools to consider later:

```bash
npx gltf-transform inspect public/assets/models/example.v1.glb
npx gltf-transform optimize public/assets/models/input.glb public/assets/models/output.glb
```

Do not add optimization automation until real assets exist and the commands are validated on this project.

## Content Reference Rules

Assets should be referenced from data, not hard-coded in scene components.

Good:

```ts
{
  id: 'project-plinth',
  media: [
    {
      type: 'model',
      src: '/assets/models/exhibit-project-plinth.v1.glb',
      alt: 'Project exhibit plinth',
    },
  ],
}
```

Avoid:

```tsx
useGLTF('/assets/models/exhibit-project-plinth.v1.glb');
```

inside a one-off component that cannot be configured by content data.

## Review Checklist

Before accepting an asset PR or local asset addition:

- Is the asset in the correct folder?
- Is the filename stable and versioned?
- Is it optimized enough for prototype budgets?
- Does it have a fallback or can the primitive exhibit still render?
- Is any source file intentionally excluded from runtime?
- Does content data reference the asset instead of scene code hard-coding it?
- Did `npm run build` still pass?
- Did the browser scene load without missing asset errors?
