import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, type PointerEvent } from 'react';
import { findInteractiveContent } from './content/interactiveContent';
import { museumMetadata } from './content/museum';
import { useAppStore } from './state/useAppStore';
import { CanvasErrorBoundary } from './ui/CanvasErrorBoundary';
import { CameraModeIndicator } from './ui/CameraModeIndicator';
import { ControlPrompt } from './ui/ControlPrompt';
import { ExhibitIndex } from './ui/ExhibitIndex';
import { ExhibitOverlay } from './ui/ExhibitOverlay';
import { FallbackView } from './ui/FallbackView';
import { InteractionPrompt } from './ui/InteractionPrompt';
import { PerformancePanel } from './ui/PerformancePanel';
import { supportsWebGL } from './utils/webglSupport';
import { MuseumScene } from './world/MuseumScene';
import { requestMuseumPointerLock } from './world/pointerLockEvents';

function syncPointerLockState(pointerLockElement: Element | null = document.pointerLockElement) {
  useAppStore.getState().setPointerLocked(pointerLockElement !== null);
}

export function App() {
  const canUseWebGL = useMemo(() => supportsWebGL(), []);
  const activeLocationId = useAppStore((state) => state.activeLocationId);
  const cameraMode = useAppStore((state) => state.cameraMode);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);

  const handleAppPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isPointerLocked || isOverlayOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select, video')) {
      return;
    }

    requestMuseumPointerLock();
  };

  useEffect(() => {
    const handlePointerLockChange = () => {
      syncPointerLockState();
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const previewContentId = searchParams.get('content');
    if (previewContentId && findInteractiveContent(previewContentId)) {
      useAppStore.getState().openContent(previewContentId);
    }

    const qaPointerState = searchParams.get('qaPointer');
    if (qaPointerState === 'locked') {
      useAppStore.getState().setPointerLocked(true);
    }

    if (qaPointerState === 'paused') {
      useAppStore.getState().setPointerLocked(true);
      useAppStore.getState().setPointerLocked(false);
    }

    if (qaPointerState === 'unlockEvent') {
      useAppStore.getState().setPointerLocked(true);
      document.dispatchEvent(new Event('pointerlockchange'));
    }

    if (qaPointerState === 'relockEvent') {
      useAppStore.getState().setPointerLocked(false);
      syncPointerLockState(document.documentElement);
    }

    if (searchParams.get('qaCamera') === 'third') {
      useAppStore.getState().setCameraMode('thirdPerson');
    }
  }, []);

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
      <main
        className="app-shell"
        data-camera-mode={cameraMode}
        data-location={activeLocationId}
        onPointerDown={handleAppPointerDown}
      >
        <Canvas
          className="museum-canvas"
          camera={{ position: [0, 1.7, 19.5], fov: 58, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <MuseumScene />
          </Suspense>
        </Canvas>

        {!isPointerLocked && !isOverlayOpen ? (
          <section className="scene-hud" aria-labelledby="site-title">
            <p className="phase-label">{museumMetadata.phaseLabel}</p>
            <h1 id="site-title">{museumMetadata.title}</h1>
            <p>{museumMetadata.summary}</p>
          </section>
        ) : null}

        <ControlPrompt />
        <CameraModeIndicator />
        <InteractionPrompt />
        <ExhibitIndex />
        <ExhibitOverlay />
        <PerformancePanel />
      </main>
    </CanvasErrorBoundary>
  );
}
