import { PointerLockControls } from '@react-three/drei/core/PointerLockControls';
import { Physics } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib';
import { useAppStore } from '../state/useAppStore';
import { ExhibitGroup } from './exhibits/ExhibitGroup';
import { ExteriorWorld } from './exterior/ExteriorWorld';
import { SpatialGuidance } from './guidance/SpatialGuidance';
import { PerformanceMonitor } from './debug/PerformanceMonitor';
import { InteriorShell } from './interior/InteriorShell';
import { ExhibitFocusDetector } from './interactions/ExhibitFocusDetector';
import { DiscoveryFocusDetector } from './interactions/DiscoveryFocusDetector';
import { SceneLighting } from './lighting';
import { PlayerController } from './PlayerController';
import { REQUEST_POINTER_LOCK_EVENT } from './pointerLockEvents';

export function MuseumScene() {
  const activeLocationId = useAppStore((state) => state.activeLocationId);
  const setPointerLocked = useAppStore((state) => state.setPointerLocked);
  const pointerLockControls = useRef<PointerLockControlsImpl>(null);

  useEffect(() => {
    const handlePointerLockRequest = () => {
      pointerLockControls.current?.lock();
    };

    window.addEventListener(REQUEST_POINTER_LOCK_EVENT, handlePointerLockRequest);

    return () => {
      window.removeEventListener(REQUEST_POINTER_LOCK_EVENT, handlePointerLockRequest);
    };
  }, []);

  return (
    <>
      <color attach="background" args={['#6f8f94']} />
      <fog attach="fog" args={['#6f8586', 17, 42]} />
      {import.meta.env.DEV ? <PerformanceMonitor /> : null}
      <SceneLighting />
      <PointerLockControls
        ref={pointerLockControls}
        selector="#enter-world-button"
        onLock={() => setPointerLocked(true)}
        onUnlock={() => setPointerLocked(false)}
      />

      <Physics gravity={[0, 0, 0]}>
        <PlayerController />
        <ExhibitFocusDetector />
        <DiscoveryFocusDetector />

        {activeLocationId === 'exterior' ? (
          <ExteriorWorld />
        ) : (
          <>
            <InteriorShell />
            <ExhibitGroup />
          </>
        )}
        <SpatialGuidance />
      </Physics>
    </>
  );
}
