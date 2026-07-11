import { lazy, Suspense } from 'react';
import {
  museumEntranceFallbackPieces,
  museumEntranceModelAsset,
} from '../../content/exteriorWorld';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { InstancedBoxes } from '../primitives/InstancedBoxes';

const WorldModelAsset = lazy(() =>
  import('../assets/WorldModelAsset').then((module) => ({ default: module.WorldModelAsset })),
);

const fallbackTokens = [
  ...new Set(museumEntranceFallbackPieces.map((piece) => piece.token)),
] as WorldMaterialName[];

function MuseumEntranceFallback() {
  return (
    <group>
      {fallbackTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={museumEntranceFallbackPieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}

export function MuseumEntranceLandmark() {
  const testMode = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('entranceModel')
    : null;

  if (testMode === 'primitive') {
    return <MuseumEntranceFallback />;
  }

  const asset =
    testMode === 'missing'
      ? { ...museumEntranceModelAsset, src: '/assets/models/missing-museum-entrance.glb' }
      : museumEntranceModelAsset;

  return (
    <Suspense fallback={<MuseumEntranceFallback />}>
      <WorldModelAsset asset={asset} fallback={<MuseumEntranceFallback />} />
    </Suspense>
  );
}
