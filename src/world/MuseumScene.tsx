import { PointerLockControls } from '@react-three/drei/core/PointerLockControls';
import { useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
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
import { GRAVITY_Y } from './playerMovement';

export function MuseumScene() {
  const canvas = useThree((state) => state.gl.domElement);
  const activeLocationId = useAppStore((state) => state.activeLocationId);
  const cameraMode = useAppStore((state) => state.cameraMode);
  const setPointerLocked = useAppStore((state) => state.setPointerLocked);

  return (
    <>
      <color attach="background" args={['#6f8f94']} />
      <fog attach="fog" args={['#6f8586', 17, 42]} />
      {import.meta.env.DEV ? <PerformanceMonitor /> : null}
      <SceneLighting />
      <PointerLockControls
        domElement={canvas}
        enabled={cameraMode === 'firstPerson'}
        selector="[data-pointer-lock-trigger]"
        onLock={() => setPointerLocked(true)}
        onUnlock={() => setPointerLocked(false)}
      />

      <Physics gravity={[0, GRAVITY_Y, 0]}>
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
