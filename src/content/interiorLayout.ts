import type { Transform } from './types';
import type { ExteriorBoxPiece } from './exteriorWorld';
import type { Vec3Tuple } from '../world/primitives/StaticBox';

export type InteriorModuleKind =
  | 'ceiling'
  | 'column'
  | 'doorway'
  | 'floor'
  | 'floor-inlay'
  | 'gallery-divider'
  | 'light-fixture'
  | 'plinth'
  | 'wall'
  | 'wall-panel';

export interface InteriorModulePiece extends ExteriorBoxPiece {
  kind: InteriorModuleKind;
}

export type ActiveInteriorExhibitId =
  | 'welcome-console'
  | 'project-plinth'
  | 'skills-workbench'
  | 'ideas-note'
  | 'contact-terminal';

export interface InteriorPreview {
  position: Vec3Tuple;
  yaw: number;
}

const visual = (
  id: string,
  kind: InteriorModuleKind,
  position: Vec3Tuple,
  scale: Vec3Tuple,
  token: InteriorModulePiece['token'],
  rotation?: Vec3Tuple,
): InteriorModulePiece => ({
  id,
  kind,
  position,
  rotation,
  scale,
  token,
  collider: false,
});

const collider = (
  id: string,
  kind: InteriorModuleKind,
  position: Vec3Tuple,
  scale: Vec3Tuple,
  token: InteriorModulePiece['token'] = 'interiorWall',
): InteriorModulePiece => ({
  id,
  kind,
  position,
  scale,
  token,
  visible: false,
});

const outerWalls: InteriorModulePiece[] = [
  visual('wall-back', 'wall', [0, 2.6, -11], [16, 5.2, 0.3], 'interiorWall'),
  visual('wall-left', 'wall', [-8, 2.6, 0], [0.3, 5.2, 22], 'interiorWall'),
  visual('wall-right', 'wall', [8, 2.6, 0], [0.3, 5.2, 22], 'interiorWall'),
  visual('wall-front-left', 'wall', [-4.9, 2.6, 11], [6.2, 5.2, 0.3], 'interiorWall'),
  visual('wall-front-right', 'wall', [4.9, 2.6, 11], [6.2, 5.2, 0.3], 'interiorWall'),
  visual('wall-front-header', 'doorway', [0, 4.65, 11], [3.6, 1.1, 0.3], 'interiorWall'),
];

const entryGateway: InteriorModulePiece[] = [
  visual('entry-divider-left', 'gallery-divider', [-5.1, 2.25, 5.65], [5.8, 4.5, 0.24], 'interiorDivider'),
  visual('entry-divider-right', 'gallery-divider', [5.1, 2.25, 5.65], [5.8, 4.5, 0.24], 'interiorDivider'),
  visual('entry-door-left', 'doorway', [-2.08, 2.15, 5.48], [0.34, 4.3, 0.5], 'interiorStoneLight'),
  visual('entry-door-right', 'doorway', [2.08, 2.15, 5.48], [0.34, 4.3, 0.5], 'interiorStoneLight'),
  visual('entry-door-header', 'doorway', [0, 4.15, 5.48], [4.5, 0.34, 0.5], 'interiorStoneLight'),
];

const sideGalleries: InteriorModulePiece[] = [
  visual('ideas-divider-front', 'gallery-divider', [-3.35, 2.2, 3.55], [0.24, 4.4, 3.8], 'interiorDivider'),
  visual('ideas-divider-back', 'gallery-divider', [-3.35, 2.2, -3.75], [0.24, 4.4, 4.5], 'interiorDivider'),
  visual('skills-divider-front', 'gallery-divider', [3.35, 2.2, 3.55], [0.24, 4.4, 3.8], 'interiorDivider'),
  visual('skills-divider-back', 'gallery-divider', [3.35, 2.2, -3.75], [0.24, 4.4, 4.5], 'interiorDivider'),
  visual('ideas-door-front', 'column', [-3.35, 2.1, 1.55], [0.46, 4.2, 0.46], 'interiorStoneLight'),
  visual('ideas-door-back', 'column', [-3.35, 2.1, -1.45], [0.46, 4.2, 0.46], 'interiorStoneLight'),
  visual('ideas-door-header', 'doorway', [-3.35, 4.05, 0.05], [0.46, 0.34, 3.45], 'interiorStoneLight'),
  visual('skills-door-front', 'column', [3.35, 2.1, 1.55], [0.46, 4.2, 0.46], 'interiorStoneLight'),
  visual('skills-door-back', 'column', [3.35, 2.1, -1.45], [0.46, 4.2, 0.46], 'interiorStoneLight'),
  visual('skills-door-header', 'doorway', [3.35, 4.05, 0.05], [0.46, 0.34, 3.45], 'interiorStoneLight'),
  visual('ideas-panel', 'wall-panel', [-7.78, 2.25, -2.4], [0.08, 2.6, 4.8], 'exhibitNote'),
  visual('skills-panel', 'wall-panel', [7.78, 2.25, -2.4], [0.08, 2.6, 4.8], 'exhibitSkill'),
];

const rearGallery: InteriorModulePiece[] = [
  visual('rear-divider-left', 'gallery-divider', [-5.15, 2.25, -6.25], [5.7, 4.5, 0.24], 'interiorDivider'),
  visual('rear-divider-right', 'gallery-divider', [5.15, 2.25, -6.25], [5.7, 4.5, 0.24], 'interiorDivider'),
  visual('rear-door-left', 'doorway', [-2.1, 2.15, -6.08], [0.36, 4.3, 0.5], 'interiorStoneLight'),
  visual('rear-door-right', 'doorway', [2.1, 2.15, -6.08], [0.36, 4.3, 0.5], 'interiorStoneLight'),
  visual('rear-door-header', 'doorway', [0, 4.15, -6.08], [4.55, 0.36, 0.5], 'interiorStoneLight'),
  visual('contact-panel', 'wall-panel', [0, 2.25, -10.82], [5.4, 2.7, 0.08], 'exhibitContact'),
];

const columns: InteriorModulePiece[] = [
  [-2.75, 3.4],
  [2.75, 3.4],
  [-2.75, -4.9],
  [2.75, -4.9],
].map(([x, z], index) =>
  visual(`hall-column-${index}`, 'column', [x, 2.4, z], [0.46, 4.8, 0.46], 'interiorStoneLight'),
);

const floorsAndCeilings: InteriorModulePiece[] = [
  visual('floor-main', 'floor', [0, -0.05, 0], [16, 0.1, 22], 'interiorFloor'),
  visual('project-gallery-stage', 'plinth', [0, 0.12, 2.1], [3.4, 0.24, 3.4], 'interiorStoneLight'),
  visual('floor-entry-inlay', 'floor-inlay', [0, 0.018, 8.25], [3.2, 0.036, 5.1], 'interiorFloorInlay'),
  visual('floor-project-inlay', 'floor-inlay', [0, 0.02, 2.25], [5.9, 0.04, 5.4], 'interiorFloorAlt'),
  visual('floor-ideas-inlay', 'floor-inlay', [-5.55, 0.02, -2.35], [4.1, 0.04, 6.8], 'exhibitNote'),
  visual('floor-skills-inlay', 'floor-inlay', [5.55, 0.02, -2.35], [4.1, 0.04, 6.8], 'exhibitSkill'),
  visual('floor-contact-inlay', 'floor-inlay', [0, 0.02, -8.65], [5.4, 0.04, 4.2], 'exhibitContact'),
  visual('ceiling-main', 'ceiling', [0, 5.25, 0], [16, 0.14, 22], 'interiorCeiling'),
  visual('ceiling-central-coffer', 'ceiling', [0, 5.13, 1.1], [6.2, 0.12, 15.2], 'interiorPanel'),
  visual('ceiling-ideas-soffit', 'ceiling', [-5.65, 4.82, -2.4], [4.3, 0.24, 8.2], 'interiorCeiling'),
  visual('ceiling-skills-soffit', 'ceiling', [5.65, 4.82, -2.4], [4.3, 0.24, 8.2], 'interiorCeiling'),
  visual('ceiling-contact-soffit', 'ceiling', [0, 4.82, -8.7], [6.0, 0.24, 4.3], 'interiorCeiling'),
];

const fixtures: InteriorModulePiece[] = [
  [0, 4.72, 8.2],
  [0, 4.72, 6.5],
  [0, 4.92, 3.5],
  [0, 4.92, 1.5],
  [0, 4.92, -0.5],
  [-5.55, 4.58, 0.2],
  [-5.55, 4.58, -2.4],
  [-5.55, 4.58, -4.8],
  [5.55, 4.58, 0.2],
  [5.55, 4.58, -2.4],
  [5.55, 4.58, -4.8],
  [0, 4.58, -8.7],
].map(([x, y, z], index) =>
  visual(`light-fixture-${index}`, 'light-fixture', [x, y, z], [0.72, 0.08, 0.2], 'interiorGlow'),
);

export const interiorVisualPieces: InteriorModulePiece[] = [
  ...outerWalls,
  ...entryGateway,
  ...sideGalleries,
  ...rearGallery,
  ...columns,
  ...floorsAndCeilings,
  ...fixtures,
];

export const interiorColliderPieces: InteriorModulePiece[] = [
  collider('floor-collider', 'floor', [0, -0.05, 0], [16, 0.1, 22], 'interiorFloor'),
  ...outerWalls.map((piece) => collider(`${piece.id}-collider`, piece.kind, piece.position, piece.scale)),
  ...entryGateway
    .filter((piece) => piece.kind === 'gallery-divider' || piece.kind === 'doorway')
    .map((piece) => collider(`${piece.id}-collider`, piece.kind, piece.position, piece.scale)),
  ...sideGalleries
    .filter((piece) => piece.kind !== 'wall-panel')
    .map((piece) => collider(`${piece.id}-collider`, piece.kind, piece.position, piece.scale)),
  ...rearGallery
    .filter((piece) => piece.kind !== 'wall-panel')
    .map((piece) => collider(`${piece.id}-collider`, piece.kind, piece.position, piece.scale)),
  ...columns.map((piece) => collider(`${piece.id}-collider`, piece.kind, piece.position, piece.scale)),
];

export const interiorExhibitTransforms: Record<ActiveInteriorExhibitId, Transform> = {
  'welcome-console': {
    position: { x: -5.05, y: 1.15, z: 5.42 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2.55, y: 1.15, z: 0.24 },
  },
  'project-plinth': {
    position: { x: 0, y: 0.95, z: 2.1 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.25, y: 0.85, z: 1.25 },
  },
  'ideas-note': {
    position: { x: -7.55, y: 1.15, z: -2.4 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    scale: { x: 1.75, y: 1.15, z: 0.4 },
  },
  'skills-workbench': {
    position: { x: 7.55, y: 1.0, z: -2.4 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    scale: { x: 1.45, y: 1.0, z: 0.9 },
  },
  'contact-terminal': {
    position: { x: 0, y: 1.05, z: -10.55 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.3, y: 0.95, z: 0.32 },
  },
};

export const interiorPreviews = {
  interior: { position: [0, 0.9, 9.2], yaw: 0 },
  entrance: { position: [0, 0.9, 9.2], yaw: 0 },
  welcome: { position: [-5.05, 0.9, 7.25], yaw: 0 },
  project: { position: [0, 0.9, 4.0], yaw: 0 },
  ideas: { position: [-5.55, 0.9, -2.4], yaw: Math.PI / 2 },
  skills: { position: [5.55, 0.9, -2.4], yaw: -Math.PI / 2 },
  contact: { position: [0, 0.9, -8.45], yaw: 0 },
} as const satisfies Record<string, InteriorPreview>;

export const interiorGuidanceLayout: InteriorModulePiece[] = [
  ...[8.2, 7.2, 6.2, 4.7, 3.7, 2.7, 0.8, -0.2, -5.1, -7.0, -8.0].map(
    (z, index) =>
      visual(`route-main-${index}`, 'floor-inlay', [0, 0.045, z], [0.62, 0.035, 0.08], 'interiorAccent'),
  ),
  ...[-4.7, -5.7, -6.7].map((x, index) =>
    visual(`route-ideas-${index}`, 'floor-inlay', [x, 0.045, 0.05], [0.62, 0.035, 0.08], 'exhibitNoteAccent', [0, Math.PI / 2, 0]),
  ),
  ...[4.7, 5.7, 6.7].map((x, index) =>
    visual(`route-skills-${index}`, 'floor-inlay', [x, 0.045, 0.05], [0.62, 0.035, 0.08], 'exhibitSkillAccent', [0, Math.PI / 2, 0]),
  ),
];
