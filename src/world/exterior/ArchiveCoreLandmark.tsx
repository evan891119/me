import { lazy, Suspense } from 'react';
import {
  archiveCoreFallbackPieces,
  archiveCoreModelAsset,
} from '../../content/exteriorWorld';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { InstancedBoxes } from '../primitives/InstancedBoxes';

const WorldModelAsset = lazy(() =>
  import('../assets/WorldModelAsset').then((module) => ({ default: module.WorldModelAsset })),
);

const fallbackTokens = [
  ...new Set(archiveCoreFallbackPieces.map((piece) => piece.token)),
] as WorldMaterialName[];

function ArchiveCoreFallback() {
  return (
    <group>
      {fallbackTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={archiveCoreFallbackPieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}

export function ArchiveCoreLandmark() {
  const testMode = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('archiveModel')
    : null;

  if (testMode === 'primitive') {
    return <ArchiveCoreFallback />;
  }

  const asset =
    testMode === 'missing'
      ? { ...archiveCoreModelAsset, src: '/assets/models/missing-archive-core.glb' }
      : archiveCoreModelAsset;

  return (
    <Suspense fallback={<ArchiveCoreFallback />}>
      <WorldModelAsset asset={asset} fallback={<ArchiveCoreFallback />} />
    </Suspense>
  );
}
