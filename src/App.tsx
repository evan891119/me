import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { museumMetadata } from './content/museum';
import { ControlPrompt } from './ui/ControlPrompt';
import { ExhibitIndex } from './ui/ExhibitIndex';
import { ExhibitOverlay } from './ui/ExhibitOverlay';
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
        <p className="phase-label">{museumMetadata.phaseLabel}</p>
        <h1 id="site-title">{museumMetadata.title}</h1>
        <p>{museumMetadata.summary}</p>
      </section>

      <ControlPrompt />
      <ExhibitIndex />
      <ExhibitOverlay />
    </main>
  );
}
