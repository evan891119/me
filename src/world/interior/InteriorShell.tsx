import {
  interiorColliderPieces,
  interiorVisualPieces,
} from '../../content/interiorLayout';
import type { WorldMaterialName } from '../materials/worldMaterials';
import { InstancedBoxes } from '../primitives/InstancedBoxes';
import { StaticBox } from '../primitives/StaticBox';

const visualTokens = [
  ...new Set(interiorVisualPieces.map((piece) => piece.token)),
] as WorldMaterialName[];

export function InteriorShell() {
  return (
    <group>
      {interiorColliderPieces.map((piece) => (
        <StaticBox key={piece.id} {...piece} />
      ))}

      {visualTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={interiorVisualPieces.filter((piece) => piece.token === token)}
        />
      ))}
    </group>
  );
}
