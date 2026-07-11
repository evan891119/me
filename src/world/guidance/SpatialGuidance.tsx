import { StaticBox } from '../primitives/StaticBox';
import { exteriorGuidancePieces, interiorGuidancePieces } from './guidanceLayout';

const guidancePieces = [...exteriorGuidancePieces, ...interiorGuidancePieces];

export function SpatialGuidance() {
  return (
    <group>
      {guidancePieces.map(({ id, ...piece }) => (
        <StaticBox key={id} {...piece} collider={false} />
      ))}
    </group>
  );
}
