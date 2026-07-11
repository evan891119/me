import type { ExhibitDisplayStyle } from '../../content/types';
import type { WorldMaterialName } from '../materials/worldMaterials';
import type { Vec3Tuple } from '../primitives/StaticBox';

export interface ExhibitDetailPiece {
  position: Vec3Tuple;
  rotation?: Vec3Tuple;
  scale: Vec3Tuple;
  material: 'accent' | 'base';
}

export interface ExhibitDisplayDefinition {
  accentMaterial: WorldMaterialName;
  baseMaterial: WorldMaterialName;
  details: ExhibitDetailPiece[];
}

export const exhibitDisplayStyles: Record<ExhibitDisplayStyle, ExhibitDisplayDefinition> = {
  contact: {
    accentMaterial: 'exhibitContactAccent',
    baseMaterial: 'exhibitContact',
    details: [
      { material: 'accent', position: [0, 0.28, -0.23], rotation: [-0.18, 0, 0], scale: [0.72, 0.42, 0.07] },
      { material: 'base', position: [0, -0.42, 0], scale: [0.5, 0.12, 0.72] },
      { material: 'accent', position: [0, -0.31, 0.2], scale: [0.18, 0.04, 0.18] },
    ],
  },
  note: {
    accentMaterial: 'exhibitNoteAccent',
    baseMaterial: 'exhibitNote',
    details: [
      { material: 'accent', position: [0, 0.08, -0.46], rotation: [-0.12, 0, 0], scale: [0.78, 0.58, 0.06] },
      { material: 'base', position: [0, -0.4, 0.05], scale: [0.12, 0.32, 0.12] },
    ],
  },
  project: {
    accentMaterial: 'exhibitProjectAccent',
    baseMaterial: 'exhibitProject',
    details: [
      { material: 'base', position: [0, -0.44, 0], scale: [0.76, 0.12, 0.76] },
      { material: 'accent', position: [0, 0.49, 0], scale: [0.78, 0.08, 0.78] },
      { material: 'accent', position: [-0.38, 0.16, 0.39], scale: [0.12, 0.18, 0.12] },
      { material: 'accent', position: [0.38, 0.16, -0.39], scale: [0.12, 0.18, 0.12] },
    ],
  },
  skill: {
    accentMaterial: 'exhibitSkillAccent',
    baseMaterial: 'exhibitSkill',
    details: [
      { material: 'accent', position: [0, 0.48, 0], scale: [0.88, 0.08, 0.74] },
      { material: 'base', position: [-0.34, -0.44, 0], scale: [0.14, 0.18, 0.58] },
      { material: 'base', position: [0.34, -0.44, 0], scale: [0.14, 0.18, 0.58] },
      { material: 'accent', position: [0, 0.58, 0], scale: [0.06, 0.04, 0.56] },
    ],
  },
  timeline: {
    accentMaterial: 'exhibitTimelineAccent',
    baseMaterial: 'exhibitTimeline',
    details: [
      { material: 'accent', position: [-0.34, 0, -0.46], scale: [0.08, 0.78, 0.06] },
      { material: 'accent', position: [-0.1, 0.26, -0.47], scale: [0.28, 0.06, 0.07] },
      { material: 'accent', position: [0.14, 0, -0.47], scale: [0.28, 0.06, 0.07] },
      { material: 'accent', position: [0.28, -0.26, -0.47], scale: [0.18, 0.06, 0.07] },
    ],
  },
  welcome: {
    accentMaterial: 'exhibitWelcomeAccent',
    baseMaterial: 'exhibitWelcome',
    details: [
      { material: 'accent', position: [0, 0.43, -0.56], scale: [0.82, 0.08, 0.06] },
      { material: 'accent', position: [-0.34, 0.04, -0.57], scale: [0.08, 0.48, 0.07] },
      { material: 'accent', position: [0.34, 0.04, -0.57], scale: [0.08, 0.48, 0.07] },
    ],
  },
};
