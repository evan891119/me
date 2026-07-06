# Performance Notes

## Status

Phase 6.1 instrumentation is implemented for development builds.

## Development Panel

Run the site with:

```bash
npm run dev
```

The development build shows a small performance panel in the lower-left corner. It is hidden in production builds through `import.meta.env.DEV`.

The panel reports:

- FPS
- average frame time
- WebGL render calls
- rendered triangles
- rendered lines
- rendered points
- transferred resource bytes reported by the browser Resource Timing API

## Interpretation

The panel is intended for quick local review while changing scene complexity. It is not a replacement for a production bundle analyzer or a formal trace.

Use it to catch obvious regressions:

- draw calls rising after adding exhibit objects;
- triangle count rising after adding GLB assets;
- frame time crossing the project budget on a normal laptop;
- transferred bytes growing after adding models or textures.

## Known Limits

- Pointer lock behavior still requires manual browser testing.
- Development server transfer sizes can differ from production deployment sizes.
- Browser resource timing may report `0` transferred bytes for cached or locally served resources.
- The current large JavaScript bundle warning should be handled in Issue 6.2.
