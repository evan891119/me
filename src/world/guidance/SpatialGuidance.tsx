import { InstancedBoxes } from '../primitives/InstancedBoxes';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { useAppStore } from '../../state/useAppStore';
import { exteriorGuidancePieces, interiorGuidancePieces } from './guidanceLayout';

export function SpatialGuidance() {
  const activeLocationId = useAppStore((state) => state.activeLocationId);
  const guidancePieces =
    activeLocationId === 'exterior' ? exteriorGuidancePieces : interiorGuidancePieces;
  const guidanceTokens = [
    ...new Set(guidancePieces.map((piece) => piece.token)),
  ] as WorldMaterialName[];

  return (
    <group>
      {guidanceTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={guidancePieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}
