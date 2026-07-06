import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ControlPrompt } from './ui/ControlPrompt';
import { MuseumScene } from './world/MuseumScene';

export function App() {
  return (
    <main className="app-shell">
      <Canvas
        className="museum-canvas"
        camera={{ position: [0, 1.7, 7], fov: 58, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <MuseumScene />
        </Suspense>
      </Canvas>

      <section className="scene-hud" aria-labelledby="site-title">
        <p className="phase-label">Phase 2.3</p>
        <h1 id="site-title">First-Person Portfolio Museum</h1>
        <p>Click to enter, then use WASD to test wall and exhibit collision.</p>
      </section>

      <ControlPrompt />
    </main>
  );
}
