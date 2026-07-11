import type { WorldMaterialName } from '../materials/worldMaterials';
import type { Vec3Tuple } from '../primitives/StaticBox';

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

export const interiorGuidancePieces: GuidancePiece[] = [
  { id: 'interior-route-entry', position: [0, 0.04, 2.55], scale: [0.58, 0.04, 0.07], token: 'interiorAccent' },
  { id: 'interior-route-center', position: [0, 0.04, 1.45], scale: [0.58, 0.04, 0.07], token: 'interiorAccent' },
  { id: 'interior-route-project', position: [0, 0.04, 0.35], scale: [0.58, 0.04, 0.07], token: 'interiorAccent' },
  { id: 'left-gallery-post', position: [-3.72, 1.25, -1.45], scale: [0.08, 1.15, 0.08], token: 'exhibitTimelineAccent' },
  { id: 'right-gallery-post', position: [3.72, 1.25, -1.45], scale: [0.08, 1.15, 0.08], token: 'exhibitSkillAccent' },
];
