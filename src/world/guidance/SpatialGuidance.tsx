import { InstancedBoxes } from '../primitives/InstancedBoxes';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { exteriorGuidancePieces, interiorGuidancePieces } from './guidanceLayout';

const guidancePieces = [...exteriorGuidancePieces, ...interiorGuidancePieces];
const guidanceTokens = [...new Set(guidancePieces.map((piece) => piece.token))] as WorldMaterialName[];

export function SpatialGuidance() {
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
