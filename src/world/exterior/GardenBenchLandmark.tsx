import { lazy, Suspense } from 'react';
import {
  gardenBenchFallbackPieces,
  gardenBenchModelAsset,
} from '../../content/exteriorWorld';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { InstancedBoxes } from '../primitives/InstancedBoxes';

const WorldModelAsset = lazy(() =>
  import('../assets/WorldModelAsset').then((module) => ({ default: module.WorldModelAsset })),
);

const fallbackTokens = [
  ...new Set(gardenBenchFallbackPieces.map((piece) => piece.token)),
] as WorldMaterialName[];

function GardenBenchFallback() {
  return (
    <group>
      {fallbackTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={gardenBenchFallbackPieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}

export function GardenBenchLandmark() {
  const testMode = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('benchModel')
    : null;

  if (testMode === 'primitive') {
    return <GardenBenchFallback />;
  }

  const asset =
    testMode === 'missing'
      ? { ...gardenBenchModelAsset, src: '/assets/models/missing-garden-bench.glb' }
      : gardenBenchModelAsset;

  return (
    <Suspense fallback={<GardenBenchFallback />}>
      <WorldModelAsset asset={asset} fallback={<GardenBenchFallback />} />
    </Suspense>
  );
}
