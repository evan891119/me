import { lazy, Suspense } from 'react';
import {
  signalTowerFallbackPieces,
  signalTowerModelAsset,
} from '../../content/exteriorWorld';
import { InstancedBoxes } from '../primitives/InstancedBoxes';
import type { WorldMaterialName } from '../materials/worldMaterials';

const WorldModelAsset = lazy(() =>
  import('../assets/WorldModelAsset').then((module) => ({ default: module.WorldModelAsset })),
);

const fallbackTokens = [
  ...new Set(signalTowerFallbackPieces.map((piece) => piece.token)),
] as WorldMaterialName[];

function SignalTowerFallback() {
  return (
    <group>
      {fallbackTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={signalTowerFallbackPieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}

export function SignalTowerLandmark() {
  const testMode = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('signalModel')
    : null;

  if (testMode === 'primitive') {
    return <SignalTowerFallback />;
  }

  const asset =
    testMode === 'missing'
      ? { ...signalTowerModelAsset, src: '/assets/models/missing-signal-tower.glb' }
      : signalTowerModelAsset;

  return (
    <Suspense fallback={<SignalTowerFallback />}>
      <WorldModelAsset asset={asset} fallback={<SignalTowerFallback />} />
    </Suspense>
  );
}
