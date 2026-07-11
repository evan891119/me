import {
  exteriorColliderPieces,
  exteriorPathPieces,
  exteriorVisualPieces,
} from '../../content/exteriorWorld';
import { InstancedBoxes } from '../primitives/InstancedBoxes';
import { StaticBox, type WorldMaterialName } from '../primitives/StaticBox';
import { Atmosphere } from './Atmosphere';
import { ArchiveCoreLandmark } from './ArchiveCoreLandmark';
import { DiscoveryObjects } from './DiscoveryObjects';
import { ExteriorLanterns, ExteriorRocks, ExteriorTrees } from './ExteriorDetails';
import { GardenBenchLandmark } from './GardenBenchLandmark';
import { MuseumEntranceLandmark } from './MuseumEntranceLandmark';
import { SignalTowerLandmark } from './SignalTowerLandmark';

const visualPieces = [...exteriorVisualPieces, ...exteriorPathPieces];
const visualTokens = [...new Set(visualPieces.map((piece) => piece.token))] as WorldMaterialName[];

export function ExteriorWorld() {
  return (
    <group>
      <Atmosphere />

      {exteriorColliderPieces.map(({ id, ...piece }) => (
        <StaticBox key={id} {...piece} />
      ))}

      {visualTokens.map((token) => (
        <InstancedBoxes
          key={token}
          token={token}
          pieces={visualPieces.filter((piece) => piece.token === token)}
        />
      ))}

      <ExteriorTrees />
      <ExteriorRocks />
      <ExteriorLanterns />
      <ArchiveCoreLandmark />
      <GardenBenchLandmark />
      <MuseumEntranceLandmark />
      <SignalTowerLandmark />
      <DiscoveryObjects />

      <pointLight position={[0, 2.35, 6.25]} intensity={1.65} distance={7} color="#d8b170" />
    </group>
  );
}
