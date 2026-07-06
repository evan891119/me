import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { museumMetadata } from './content/museum';
import { CanvasErrorBoundary } from './ui/CanvasErrorBoundary';
import { ControlPrompt } from './ui/ControlPrompt';
import { ExhibitIndex } from './ui/ExhibitIndex';
import { ExhibitOverlay } from './ui/ExhibitOverlay';
import { FallbackView } from './ui/FallbackView';
import { InteractionPrompt } from './ui/InteractionPrompt';
import { PerformancePanel } from './ui/PerformancePanel';
import { supportsWebGL } from './utils/webglSupport';
import { MuseumScene } from './world/MuseumScene';

export function App() {
  const canUseWebGL = useMemo(() => supportsWebGL(), []);

  if (!canUseWebGL) {
    return <FallbackView reason="webgl-unavailable" />;
  }

  return (
    <CanvasErrorBoundary
      fallback={<FallbackView reason="canvas-error" />}
      onError={(error) => {
        console.error('3D canvas failed to start', error);
      }}
    >
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
        <InteractionPrompt />
        <ExhibitIndex />
        <ExhibitOverlay />
        <PerformancePanel />
      </main>
    </CanvasErrorBoundary>
  );
}
