import type { WorldMaterialName } from '../materials/worldMaterials';
import type { Vec3Tuple } from '../primitives/StaticBox';
import { interiorGuidanceLayout } from '../../content/interiorLayout';

export interface GuidancePiece {
  id: string;
  position: Vec3Tuple;
  rotation?: Vec3Tuple;
  scale: Vec3Tuple;
  token: WorldMaterialName;
}

export const exteriorGuidancePieces: GuidancePiece[] = [
  { id: 'entry-light-left', position: [-1.13, 1.25, 5.12], scale: [0.09, 1.65, 0.09], token: 'warmAccent' },
  { id: 'entry-light-right', position: [1.13, 1.25, 5.12], scale: [0.09, 1.65, 0.09], token: 'warmAccent' },
  { id: 'approach-marker-near', position: [0, 0.035, 13.15], scale: [0.52, 0.035, 0.08], token: 'exteriorPathEdge' },
  { id: 'approach-marker-middle', position: [0, 0.035, 10.95], scale: [0.52, 0.035, 0.08], token: 'exteriorPathEdge' },
  { id: 'approach-marker-far', position: [0, 0.035, 8.75], scale: [0.52, 0.035, 0.08], token: 'exteriorPathEdge' },
];

export const interiorGuidancePieces: GuidancePiece[] = interiorGuidanceLayout;
