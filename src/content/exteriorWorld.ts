import type { Vec3Tuple } from '../world/primitives/StaticBox';
import type { WorldMaterialName } from '../world/materials/worldMaterials';
import type { ExteriorZoneId, WorldDiscovery } from './types';

export interface ExteriorZone {
  id: ExteriorZoneId;
  title: string;
  center: Vec3Tuple;
  radius: number;
}

export interface ExteriorBoxPiece {
  id: string;
  position: Vec3Tuple;
  rotation?: Vec3Tuple;
  scale: Vec3Tuple;
  token: WorldMaterialName;
  collider?: boolean;
  visible?: boolean;
}

export interface ExteriorTreePlacement {
  id: string;
  position: Vec3Tuple;
  scale: number;
}

export interface ExteriorLanternPlacement {
  id: string;
  position: Vec3Tuple;
}

export interface ExteriorRockPlacement {
  id: string;
  position: Vec3Tuple;
  rotation: Vec3Tuple;
  scale: Vec3Tuple;
}

export interface ExteriorPlantPlacement {
  id: string;
  position: Vec3Tuple;
  rotation?: number;
  scale: number;
}

export interface ExteriorModelAsset {
  alt: string;
  position: Vec3Tuple;
  rotation?: Vec3Tuple;
  scale?: Vec3Tuple;
  src: string;
}

export const exteriorZones: ExteriorZone[] = [
  { id: 'arrival-plaza', title: 'Museum Plaza', center: [0, 0, 13], radius: 7 },
  { id: 'west-garden', title: 'Garden Overlook', center: [-10.5, 0, 11.5], radius: 5 },
  { id: 'east-signal-yard', title: 'Signal Yard', center: [10.5, 0, 10.5], radius: 5 },
  { id: 'south-archive-grove', title: 'Archive Grove', center: [0, 0, 22], radius: 4.5 },
];

export const signalTowerModelAsset: ExteriorModelAsset = {
  alt: 'Low-poly signal tower landmark',
  position: [10.5, 1.9, 10.6],
  scale: [0.65, 0.65, 0.65],
  src: '/assets/models/landmark-signal-tower.v1.glb',
};

export const museumEntranceModelAsset: ExteriorModelAsset = {
  alt: 'Layered low-poly museum entrance frame',
  position: [0, 0, 5.78],
  src: '/assets/models/landmark-museum-entrance.v1.glb',
};

export const gardenBenchModelAsset: ExteriorModelAsset = {
  alt: 'Low-poly garden bench with wood slats and metal frame',
  position: [-10.5, 0, 11.2],
  src: '/assets/models/prop-garden-bench.v1.glb',
};

export const archiveCoreModelAsset: ExteriorModelAsset = {
  alt: 'Low-poly archive frame surrounding the interactive cache',
  position: [0, 0.64, 22.35],
  src: '/assets/models/landmark-archive-core.v1.glb',
};

export const archiveCoreFallbackPieces: ExteriorBoxPiece[] = [
  { id: 'archive-core', position: [0, 0.95, 22.35], scale: [0.75, 0.75, 0.75], token: 'exhibitNoteAccent', collider: false },
];

export const gardenBenchFallbackPieces: ExteriorBoxPiece[] = [
  { id: 'garden-bench-block', position: [-10.5, 0.28, 11.2], scale: [2.7, 0.55, 0.65], token: 'exteriorFacade', collider: false },
  { id: 'garden-seat-inlay', position: [-10.5, 0.575, 11.2], scale: [2.15, 0.04, 0.46], token: 'exhibitContactAccent', collider: false },
];

export const museumEntranceFallbackPieces: ExteriorBoxPiece[] = [
  { id: 'entry-accent', position: [0, 2.05, 5.15], scale: [2.5, 0.18, 0.12], token: 'warmAccent', collider: false },
  { id: 'entry-post-left', position: [-1.45, 1.2, 5.35], scale: [0.24, 2.4, 0.45], token: 'exteriorPathEdge', collider: false },
  { id: 'entry-post-right', position: [1.45, 1.2, 5.35], scale: [0.24, 2.4, 0.45], token: 'exteriorPathEdge', collider: false },
];

export const signalTowerFallbackPieces: ExteriorBoxPiece[] = [
  { id: 'signal-mast-a', position: [10.5, 2.9, 10.6], scale: [0.18, 2.2, 0.18], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-mast-b', position: [9.9, 2.8, 10.6], rotation: [0, 0, -0.38], scale: [0.13, 1.95, 0.13], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-mast-c', position: [11.1, 2.8, 10.6], rotation: [0, 0, 0.38], scale: [0.13, 1.95, 0.13], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-head', position: [10.5, 4.0, 10.6], scale: [0.68, 0.42, 0.68], token: 'warmAccent', collider: false },
  { id: 'signal-panel', position: [10.5, 2.15, 9.2], scale: [1.15, 0.62, 0.12], token: 'exhibitTimelineAccent', collider: false },
];

export const exteriorColliderPieces: ExteriorBoxPiece[] = [
  { id: 'world-ground', position: [0, -0.08, 9.5], scale: [34, 0.16, 35], token: 'exteriorGround' },
  { id: 'west-boundary', position: [-17, 0.65, 9.5], scale: [0.5, 1.3, 35], token: 'exteriorBoundary' },
  { id: 'east-boundary', position: [17, 0.65, 9.5], scale: [0.5, 1.3, 35], token: 'exteriorBoundary' },
  { id: 'north-boundary', position: [0, 0.65, -8], scale: [34, 1.3, 0.5], token: 'exteriorBoundary' },
  { id: 'south-boundary', position: [0, 0.65, 27], scale: [34, 1.3, 0.5], token: 'exteriorBoundary' },
  { id: 'facade-left', position: [-3.35, 1.45, 5.55], scale: [4.5, 2.9, 0.35], token: 'exteriorFacade' },
  { id: 'facade-right', position: [3.35, 1.45, 5.55], scale: [4.5, 2.9, 0.35], token: 'exteriorFacade' },
  { id: 'facade-header', position: [0, 2.85, 5.55], scale: [8.7, 0.8, 0.35], token: 'exteriorFacade' },
  { id: 'west-garden-seat-collider', position: [-10.5, 0.28, 11.2], scale: [2.7, 0.55, 0.65], token: 'exteriorFacade', visible: false },
  { id: 'east-signal-base', position: [10.5, 0.38, 10.6], scale: [3.1, 0.76, 2.7], token: 'exteriorFacade' },
  { id: 'archive-plinth', position: [0, 0.32, 22.35], scale: [2.4, 0.64, 2.4], token: 'exteriorFacade' },
  { id: 'plaza-planter-west-collider', position: [-4.9, 0.28, 11.0], scale: [3.3, 0.56, 2.1], token: 'exteriorStoneMid', visible: false },
  { id: 'plaza-planter-east-collider', position: [4.9, 0.28, 11.0], scale: [3.3, 0.56, 2.1], token: 'exteriorStoneMid', visible: false },
  { id: 'garden-planter-a-collider', position: [-12.9, 0.35, 14.5], scale: [4.2, 0.7, 2.3], token: 'exteriorStoneMid', visible: false },
  { id: 'garden-planter-b-collider', position: [-12.5, 0.3, 8.0], scale: [3.8, 0.6, 2.1], token: 'exteriorStoneMid', visible: false },
  { id: 'signal-station-collider', position: [10.5, 0.85, 10.6], scale: [4.2, 1.7, 3.6], token: 'exteriorBoundary', visible: false },
  { id: 'archive-planter-west-collider', position: [-4.1, 0.3, 22.5], scale: [3.3, 0.6, 2.2], token: 'exteriorStoneMid', visible: false },
  { id: 'archive-planter-east-collider', position: [4.1, 0.3, 22.5], scale: [3.3, 0.6, 2.2], token: 'exteriorStoneMid', visible: false },
  { id: 'museum-step-1-collider', position: [0, 0.05, 7.28], scale: [5.8, 0.1, 0.62], token: 'exteriorStoneLight', visible: false },
  { id: 'museum-step-2-collider', position: [0, 0.12, 6.88], scale: [5.35, 0.24, 0.55], token: 'exteriorStoneLight', visible: false },
  { id: 'museum-step-3-collider', position: [0, 0.2, 6.52], scale: [4.9, 0.4, 0.5], token: 'exteriorStoneLight', visible: false },
  { id: 'museum-step-4-collider', position: [0, 0.29, 6.2], scale: [4.45, 0.58, 0.45], token: 'exteriorStoneLight', visible: false },
];

function planterPieces(id: string, x: number, z: number, width: number, depth: number, height = 0.48): ExteriorBoxPiece[] {
  return [
    { id: `${id}-base`, position: [x, height / 2, z], scale: [width, height, depth], token: 'exteriorStoneMid', collider: false },
    { id: `${id}-lawn`, position: [x, height + 0.045, z], scale: [width - 0.32, 0.09, depth - 0.32], token: 'exteriorLawn', collider: false },
  ];
}

function benchPieces(id: string, x: number, z: number, rotationY = 0): ExteriorBoxPiece[] {
  const rotation: Vec3Tuple = [0, rotationY, 0];
  return [
    { id: `${id}-seat`, position: [x, 0.48, z], rotation, scale: [2.25, 0.16, 0.62], token: 'exteriorStoneLight', collider: false },
    { id: `${id}-back`, position: [x, 0.88, z + Math.cos(rotationY) * 0.24], rotation: [0.18, rotationY, 0], scale: [2.25, 0.58, 0.14], token: 'exteriorStoneMid', collider: false },
    { id: `${id}-leg-left`, position: [x - Math.cos(rotationY) * 0.75, 0.22, z], rotation, scale: [0.18, 0.44, 0.48], token: 'exteriorMetal', collider: false },
    { id: `${id}-leg-right`, position: [x + Math.cos(rotationY) * 0.75, 0.22, z], rotation, scale: [0.18, 0.44, 0.48], token: 'exteriorMetal', collider: false },
  ];
}

const museumArchitecture: ExteriorBoxPiece[] = [
  { id: 'museum-west-volume', position: [-3.25, 2.15, 0.75], scale: [2.75, 4.3, 8.8], token: 'exteriorBoundary', collider: false },
  { id: 'museum-east-volume', position: [3.25, 2.15, 0.75], scale: [2.75, 4.3, 8.8], token: 'exteriorBoundary', collider: false },
  { id: 'museum-center-crown', position: [0, 4.0, 0.35], scale: [3.8, 2.2, 8.0], token: 'exteriorBoundary', collider: false },
  { id: 'museum-west-wing', position: [-5.0, 1.55, 1.15], scale: [1.3, 3.1, 6.9], token: 'exteriorFacade', collider: false },
  { id: 'museum-east-wing', position: [5.0, 1.55, 1.15], scale: [1.3, 3.1, 6.9], token: 'exteriorFacade', collider: false },
  { id: 'museum-roof-cap', position: [0, 5.18, 0.35], scale: [3.8, 0.18, 8.0], token: 'exteriorBoundary', collider: false },
  { id: 'museum-entry-frame-left', position: [-1.58, 1.85, 5.72], scale: [0.48, 3.7, 0.55], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-entry-frame-right', position: [1.58, 1.85, 5.72], scale: [0.48, 3.7, 0.55], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-entry-frame-top', position: [0, 3.52, 5.72], scale: [3.64, 0.48, 0.55], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-door-left', position: [-0.62, 1.25, 5.44], scale: [1.18, 2.5, 0.18], token: 'exteriorMetal', collider: false },
  { id: 'museum-door-right', position: [0.62, 1.25, 5.44], scale: [1.18, 2.5, 0.18], token: 'exteriorMetal', collider: false },
  { id: 'museum-banner-left', position: [-3.12, 2.12, 5.69], scale: [0.78, 2.25, 0.09], token: 'exteriorBanner', collider: false },
  { id: 'museum-banner-right', position: [3.12, 2.12, 5.69], scale: [0.78, 2.25, 0.09], token: 'exteriorBanner', collider: false },
  { id: 'museum-window-left', position: [-2.25, 2.35, 5.72], scale: [0.18, 1.8, 0.1], token: 'warmAccent', collider: false },
  { id: 'museum-window-right', position: [2.25, 2.35, 5.72], scale: [0.18, 1.8, 0.1], token: 'warmAccent', collider: false },
  { id: 'museum-step-1', position: [0, 0.05, 7.28], scale: [5.8, 0.1, 0.62], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-step-2', position: [0, 0.12, 6.88], scale: [5.35, 0.24, 0.55], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-step-3', position: [0, 0.2, 6.52], scale: [4.9, 0.4, 0.5], token: 'exteriorStoneLight', collider: false },
  { id: 'museum-step-4', position: [0, 0.29, 6.2], scale: [4.45, 0.58, 0.45], token: 'exteriorStoneLight', collider: false },
];

const signalStation: ExteriorBoxPiece[] = [
  { id: 'signal-station-body', position: [10.5, 0.86, 10.6], scale: [4.2, 1.72, 3.6], token: 'exteriorBoundary', collider: false },
  { id: 'signal-station-roof', position: [10.5, 1.82, 10.6], scale: [4.65, 0.2, 4.0], token: 'exteriorFacade', collider: false },
  { id: 'signal-door', position: [10.5, 0.75, 12.42], scale: [1.15, 1.5, 0.12], token: 'exteriorMetal', collider: false },
  { id: 'signal-door-frame-left', position: [9.82, 0.88, 12.5], scale: [0.18, 1.76, 0.25], token: 'exteriorStoneLight', collider: false },
  { id: 'signal-door-frame-right', position: [11.18, 0.88, 12.5], scale: [0.18, 1.76, 0.25], token: 'exteriorStoneLight', collider: false },
  { id: 'signal-door-frame-top', position: [10.5, 1.7, 12.5], scale: [1.55, 0.18, 0.25], token: 'exteriorStoneLight', collider: false },
  { id: 'signal-emblem', position: [12.02, 1.15, 12.48], rotation: [0, 0, 0.78], scale: [0.52, 0.52, 0.12], token: 'exteriorBanner', collider: false },
];

const nicheArchitecture: ExteriorBoxPiece[] = [
  { id: 'garden-niche-back', position: [-15.65, 1.05, 8.1], scale: [0.28, 2.1, 3.25], token: 'exteriorBoundary', collider: false },
  { id: 'garden-niche-side-a', position: [-14.7, 1.05, 6.58], scale: [2.15, 2.1, 0.28], token: 'exteriorBoundary', collider: false },
  { id: 'garden-niche-side-b', position: [-14.7, 1.05, 9.62], scale: [2.15, 2.1, 0.28], token: 'exteriorBoundary', collider: false },
  { id: 'garden-niche-light', position: [-15.45, 1.15, 8.1], scale: [0.08, 0.42, 0.42], token: 'warmAccent', collider: false },
  { id: 'garden-niche-panel', position: [-15.47, 1.0, 8.1], scale: [0.1, 1.55, 2.45], token: 'exteriorStoneMid', collider: false },
  { id: 'garden-niche-floor', position: [-14.55, 0.08, 8.1], scale: [1.95, 0.16, 2.75], token: 'exteriorPavingAlt', collider: false },
  { id: 'garden-niche-plinth', position: [-14.65, 0.28, 8.1], scale: [0.72, 0.56, 0.72], token: 'exteriorStoneLight', collider: false },
  { id: 'signal-niche-back', position: [14.45, 1.0, 7.1], scale: [0.28, 2.0, 3.0], token: 'exteriorBoundary', collider: false },
  { id: 'signal-niche-side-a', position: [13.5, 1.0, 5.72], scale: [2.15, 2.0, 0.28], token: 'exteriorBoundary', collider: false },
  { id: 'signal-niche-side-b', position: [13.5, 1.0, 8.48], scale: [2.15, 2.0, 0.28], token: 'exteriorBoundary', collider: false },
  { id: 'signal-niche-light', position: [14.25, 1.1, 7.1], scale: [0.08, 0.42, 0.42], token: 'warmAccent', collider: false },
  { id: 'signal-niche-panel', position: [14.27, 0.95, 7.1], scale: [0.1, 1.5, 2.25], token: 'exteriorStoneMid', collider: false },
  { id: 'signal-niche-floor', position: [13.35, 0.08, 7.1], scale: [1.95, 0.16, 2.55], token: 'exteriorPavingAlt', collider: false },
  { id: 'signal-niche-plinth', position: [13.55, 0.28, 7.1], scale: [0.72, 0.56, 0.72], token: 'exteriorStoneLight', collider: false },
  { id: 'archive-niche-back', position: [0, 1.05, 25.28], scale: [3.5, 2.1, 0.28], token: 'exteriorBoundary', collider: false },
  { id: 'archive-niche-side-a', position: [-1.62, 1.05, 24.25], scale: [0.28, 2.1, 2.35], token: 'exteriorBoundary', collider: false },
  { id: 'archive-niche-side-b', position: [1.62, 1.05, 24.25], scale: [0.28, 2.1, 2.35], token: 'exteriorBoundary', collider: false },
  { id: 'archive-niche-light', position: [0, 1.15, 24.98], scale: [0.42, 0.42, 0.08], token: 'warmAccent', collider: false },
  { id: 'archive-niche-panel', position: [0, 1.0, 25.08], scale: [2.6, 1.55, 0.1], token: 'exteriorStoneMid', collider: false },
  { id: 'archive-niche-floor', position: [0, 0.08, 24.15], scale: [2.9, 0.16, 1.95], token: 'exteriorPavingAlt', collider: false },
  { id: 'archive-niche-plinth', position: [0, 0.28, 24.15], scale: [0.72, 0.56, 0.72], token: 'exteriorStoneLight', collider: false },
];

const surfaceDetails: ExteriorBoxPiece[] = [
  ...[-3.95, -2.55, 2.55, 3.95].map((x, index): ExteriorBoxPiece => ({
    id: `museum-front-vertical-${index}`,
    position: [x, 1.75, 5.76],
    scale: [0.055, 3.05, 0.07],
    token: 'exteriorStoneMid',
    collider: false,
  })),
  ...[0.68, 1.52, 2.36].flatMap((y, rowIndex) => [
    { id: `museum-front-row-${rowIndex}-west`, position: [-3.35, y, 5.77], scale: [2.25, 0.045, 0.075], token: 'exteriorStoneMid', collider: false } as ExteriorBoxPiece,
    { id: `museum-front-row-${rowIndex}-east`, position: [3.35, y, 5.77], scale: [2.25, 0.045, 0.075], token: 'exteriorStoneMid', collider: false } as ExteriorBoxPiece,
  ]),
  { id: 'museum-crown-line', position: [0, 4.52, 4.38], scale: [3.55, 0.06, 0.08], token: 'exteriorStoneMid', collider: false },
  { id: 'signal-roof-line', position: [10.5, 1.94, 12.61], scale: [4.35, 0.06, 0.08], token: 'exteriorStoneMid', collider: false },
  { id: 'signal-wall-line-left', position: [8.48, 0.9, 10.6], scale: [0.06, 1.45, 3.2], token: 'exteriorStoneMid', collider: false },
  { id: 'signal-wall-line-right', position: [12.52, 0.9, 10.6], scale: [0.06, 1.45, 3.2], token: 'exteriorStoneMid', collider: false },
  ...[-16.58, 16.58].flatMap((x, sideIndex) =>
    [-4.5, 2.5, 9.5, 16.5, 23.5].map((z, index): ExteriorBoxPiece => ({
      id: `boundary-cap-${sideIndex}-${index}`,
      position: [x, 1.12 + (index % 2) * 0.16, z],
      scale: [0.82, 0.45 + (index % 2) * 0.32, 4.7],
      token: index % 2 === 0 ? 'exteriorFacade' : 'exteriorStoneMid',
      collider: false,
    })),
  ),
  ...[-13.5, -7.0, 0, 7.0, 13.5].map((x, index): ExteriorBoxPiece => ({
    id: `south-boundary-cap-${index}`,
    position: [x, 1.12 + (index % 2) * 0.18, 26.72],
    scale: [5.0, 0.48 + (index % 2) * 0.28, 0.82],
    token: index % 2 === 0 ? 'exteriorFacade' : 'exteriorStoneMid',
    collider: false,
  })),
];

export const exteriorVisualPieces: ExteriorBoxPiece[] = [
  ...museumArchitecture,
  ...signalStation,
  ...nicheArchitecture,
  ...surfaceDetails,
  ...planterPieces('plaza-planter-west', -4.9, 11.0, 3.3, 2.1),
  ...planterPieces('plaza-planter-east', 4.9, 11.0, 3.3, 2.1),
  ...planterPieces('plaza-planter-west-front', -5.4, 15.0, 3.5, 1.65, 0.38),
  ...planterPieces('plaza-planter-east-front', 5.4, 15.0, 3.5, 1.65, 0.38),
  ...planterPieces('garden-planter-a', -12.9, 14.5, 4.2, 2.3, 0.62),
  ...planterPieces('garden-planter-b', -12.5, 8.0, 3.8, 2.1, 0.54),
  ...planterPieces('garden-planter-c', -9.6, 16.2, 2.7, 1.65, 0.36),
  ...planterPieces('signal-planter-a', 13.7, 13.7, 3.6, 2.0, 0.48),
  ...planterPieces('signal-planter-b', 8.2, 15.0, 2.8, 1.7, 0.38),
  ...planterPieces('archive-planter-west', -4.1, 22.5, 3.3, 2.2, 0.52),
  ...planterPieces('archive-planter-east', 4.1, 22.5, 3.3, 2.2, 0.52),
  ...benchPieces('garden-bench-secondary', -12.0, 17.1),
  ...benchPieces('plaza-bench-west', -6.2, 18.1, Math.PI / 2),
  ...benchPieces('plaza-bench-east', 6.2, 18.1, Math.PI / 2),
  { id: 'west-terrace-a', position: [-13.8, 0.18, 11.2], scale: [5.1, 0.36, 6.8], token: 'exteriorPavingAlt', collider: false },
  { id: 'east-terrace-a', position: [13.5, 0.16, 12.0], scale: [5.7, 0.32, 7.7], token: 'exteriorPavingAlt', collider: false },
  { id: 'archive-terrace', position: [0, 0.14, 23.1], scale: [11.5, 0.28, 6.2], token: 'exteriorPavingAlt', collider: false },
  { id: 'south-terrace-left', position: [-9.0, 0.16, 25.7], scale: [6.4, 0.32, 2.2], token: 'exteriorLawn', collider: false },
  { id: 'south-terrace-right', position: [9.0, 0.16, 25.7], scale: [6.4, 0.32, 2.2], token: 'exteriorLawn', collider: false },
];

export const exteriorPathPieces: ExteriorBoxPiece[] = [
  { id: 'arrival-plaza', position: [0, 0.018, 13.6], scale: [10.2, 0.035, 13.8], token: 'exteriorPath', collider: false },
  { id: 'front-loop', position: [0, 0.025, 18.1], scale: [18.5, 0.045, 2.5], token: 'exteriorPath', collider: false },
  { id: 'west-loop', position: [-7.15, 0.024, 11.6], rotation: [0, 0.1, 0], scale: [2.45, 0.042, 11.5], token: 'exteriorPath', collider: false },
  { id: 'east-loop', position: [7.15, 0.024, 11.4], rotation: [0, -0.1, 0], scale: [2.45, 0.042, 11.5], token: 'exteriorPath', collider: false },
  { id: 'west-garden-path', position: [-11.8, 0.025, 12.0], rotation: [0, -0.09, 0], scale: [6.8, 0.045, 2.35], token: 'exteriorPath', collider: false },
  { id: 'east-yard-path', position: [11.3, 0.025, 12.0], rotation: [0, 0.08, 0], scale: [6.9, 0.045, 2.35], token: 'exteriorPath', collider: false },
  { id: 'archive-path', position: [0, 0.025, 22.0], scale: [2.5, 0.045, 7.0], token: 'exteriorPath', collider: false },
  ...Array.from({ length: 6 }, (_, index): ExteriorBoxPiece => ({
    id: `arrival-joint-${index}`,
    position: [0, 0.043, 8.3 + index * 2.1],
    scale: [10.1, 0.025, 0.055],
    token: 'exteriorPavingJoint',
    collider: false,
  })),
  ...[-4.95, -2.5, 0, 2.5, 4.95].map((x, index): ExteriorBoxPiece => ({
    id: `arrival-joint-long-${index}`,
    position: [x, 0.044, 13.55],
    scale: [0.055, 0.026, 13.65],
    token: 'exteriorPavingJoint',
    collider: false,
  })),
  { id: 'arrival-edge-west', position: [-5.16, 0.06, 13.6], scale: [0.12, 0.12, 13.8], token: 'exteriorPathEdge', collider: false },
  { id: 'arrival-edge-east', position: [5.16, 0.06, 13.6], scale: [0.12, 0.12, 13.8], token: 'exteriorPathEdge', collider: false },
  { id: 'front-loop-edge-near', position: [0, 0.065, 19.38], scale: [18.5, 0.13, 0.12], token: 'exteriorPathEdge', collider: false },
  { id: 'front-loop-edge-far', position: [0, 0.065, 16.82], scale: [18.5, 0.13, 0.12], token: 'exteriorPathEdge', collider: false },
  { id: 'garden-path-edge-near', position: [-11.8, 0.065, 13.2], rotation: [0, -0.09, 0], scale: [6.8, 0.13, 0.11], token: 'exteriorPathEdge', collider: false },
  { id: 'garden-path-edge-far', position: [-11.8, 0.065, 10.8], rotation: [0, -0.09, 0], scale: [6.8, 0.13, 0.11], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-path-edge-near', position: [11.3, 0.065, 13.2], rotation: [0, 0.08, 0], scale: [6.9, 0.13, 0.11], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-path-edge-far', position: [11.3, 0.065, 10.8], rotation: [0, 0.08, 0], scale: [6.9, 0.13, 0.11], token: 'exteriorPathEdge', collider: false },
];

export const exteriorTrees: ExteriorTreePlacement[] = [
  { id: 'garden-tree-1', position: [-13.8, 0, 11.2], scale: 1.15 },
  { id: 'garden-tree-2', position: [-11.7, 0, 15.4], scale: 0.85 },
  { id: 'garden-tree-3', position: [-14.5, 0, 17.5], scale: 0.95 },
  { id: 'arrival-tree-west', position: [-4.8, 0, 18.8], scale: 0.7 },
  { id: 'arrival-tree-east', position: [4.8, 0, 18.8], scale: 0.7 },
  { id: 'archive-tree-west', position: [-3.8, 0, 23.1], scale: 0.8 },
  { id: 'archive-tree-east', position: [3.8, 0, 23.1], scale: 0.82 },
  { id: 'signal-tree', position: [14.1, 0, 13.1], scale: 0.68 },
  { id: 'garden-tree-4', position: [-9.4, 0, 8.3], scale: 0.74 },
  { id: 'garden-tree-5', position: [-15.2, 0, 12.4], scale: 0.78 },
  { id: 'garden-tree-6', position: [-14.6, 0, 14.8], scale: 0.62 },
  { id: 'signal-tree-2', position: [13.8, 0, 16.0], scale: 0.72 },
  { id: 'signal-tree-3', position: [8.8, 0, 16.0], scale: 0.58 },
  { id: 'archive-tree-far-west', position: [-6.1, 0, 25.2], scale: 0.68 },
  { id: 'archive-tree-far-east', position: [6.2, 0, 25.0], scale: 0.7 },
];

export const exteriorPlants: ExteriorPlantPlacement[] = [
  { id: 'plaza-plant-1', position: [-4.9, 0.52, 11], rotation: -0.1, scale: 0.72 },
  { id: 'plaza-plant-2', position: [4.9, 0.52, 11], rotation: 0.2, scale: 0.72 },
  { id: 'plaza-plant-3', position: [-5.4, 0.42, 15], rotation: 0.35, scale: 0.54 },
  { id: 'plaza-plant-4', position: [5.4, 0.42, 15], rotation: -0.25, scale: 0.54 },
  { id: 'garden-plant-1', position: [-12.8, 0.68, 14.5], rotation: 0.1, scale: 0.8 },
  { id: 'garden-plant-2', position: [-11.8, 0.68, 14.4], rotation: -0.4, scale: 0.58 },
  { id: 'garden-plant-3', position: [-12.5, 0.6, 8.0], rotation: 0.3, scale: 0.62 },
  { id: 'garden-plant-4', position: [-9.6, 0.42, 16.2], rotation: 0.8, scale: 0.5 },
  { id: 'signal-plant-1', position: [13.7, 0.53, 13.7], rotation: 0.15, scale: 0.68 },
  { id: 'signal-plant-2', position: [12.8, 0.53, 13.7], rotation: -0.3, scale: 0.46 },
  { id: 'signal-plant-3', position: [8.2, 0.43, 15.0], rotation: 0.6, scale: 0.52 },
  { id: 'archive-plant-1', position: [-4.1, 0.57, 22.5], rotation: 0.2, scale: 0.58 },
  { id: 'archive-plant-2', position: [4.1, 0.57, 22.5], rotation: -0.2, scale: 0.58 },
  { id: 'archive-plant-3', position: [-3.5, 0.57, 22.5], rotation: 0.9, scale: 0.42 },
  { id: 'archive-plant-4', position: [3.5, 0.57, 22.5], rotation: -0.8, scale: 0.42 },
];

export const exteriorLanterns: ExteriorLanternPlacement[] = [
  { id: 'entry-left', position: [-1.2, 0, 7.1] },
  { id: 'entry-right', position: [1.2, 0, 7.1] },
  { id: 'loop-west', position: [-7.0, 0, 16.5] },
  { id: 'loop-east', position: [7.0, 0, 16.5] },
  { id: 'garden', position: [-8.5, 0, 13.5] },
  { id: 'signal', position: [9.0, 0, 12.8] },
  { id: 'archive-left', position: [-1.8, 0, 21.5] },
  { id: 'archive-right', position: [1.8, 0, 21.5] },
  { id: 'arrival-far-left', position: [-3.9, 0, 19.0] },
  { id: 'arrival-far-right', position: [3.9, 0, 19.0] },
  { id: 'garden-far', position: [-13.8, 0, 17.0] },
  { id: 'garden-niche', position: [-13.9, 0, 8.0] },
  { id: 'signal-door-left', position: [9.2, 0, 8.6] },
  { id: 'signal-door-right', position: [11.8, 0, 8.6] },
  { id: 'signal-far', position: [13.6, 0, 15.3] },
  { id: 'archive-far-left', position: [-4.8, 0, 24.4] },
  { id: 'archive-far-right', position: [4.8, 0, 24.4] },
];

export const exteriorRocks: ExteriorRockPlacement[] = [
  { id: 'west-rock-1', position: [-15.1, 0.38, 6.4], rotation: [0.2, 0.5, 0.1], scale: [0.9, 0.55, 0.7] },
  { id: 'west-rock-2', position: [-14.8, 0.28, 13.9], rotation: [0.1, 1.1, 0.2], scale: [0.65, 0.4, 0.55] },
  { id: 'west-rock-3', position: [-9.2, 0.25, 22.8], rotation: [0.2, 0.3, 0], scale: [0.55, 0.38, 0.72] },
  { id: 'east-rock-1', position: [15.0, 0.35, 5.5], rotation: [0.1, 0.7, 0.1], scale: [0.8, 0.5, 0.65] },
  { id: 'east-rock-2', position: [14.6, 0.3, 16.8], rotation: [0.3, 1.2, 0], scale: [0.72, 0.45, 0.6] },
  { id: 'east-rock-3', position: [9.4, 0.24, 23.5], rotation: [0.2, 0.4, 0.2], scale: [0.6, 0.36, 0.75] },
  { id: 'archive-rock-left', position: [-4.9, 0.3, 24.5], rotation: [0.15, 0.8, 0.1], scale: [0.7, 0.46, 0.58] },
  { id: 'archive-rock-right', position: [5.1, 0.32, 24.2], rotation: [0.25, 0.2, 0], scale: [0.76, 0.48, 0.62] },
  { id: 'northwest-rock', position: [-7.2, 0.28, -5.8], rotation: [0.1, 1.0, 0.15], scale: [0.7, 0.42, 0.65] },
  { id: 'northeast-rock', position: [7.4, 0.3, -5.6], rotation: [0.2, 0.6, 0], scale: [0.8, 0.45, 0.62] },
  { id: 'plaza-rock-west', position: [-6.2, 0.28, 12.0], rotation: [0.15, 0.5, 0.05], scale: [0.62, 0.4, 0.7] },
  { id: 'plaza-rock-east', position: [6.25, 0.3, 11.8], rotation: [0.2, 0.9, 0.1], scale: [0.7, 0.44, 0.62] },
  { id: 'garden-rock-4', position: [-11.0, 0.3, 13.8], rotation: [0.2, 0.4, 0.12], scale: [0.68, 0.42, 0.58] },
  { id: 'signal-rock-4', position: [12.8, 0.34, 14.3], rotation: [0.12, 0.7, 0.15], scale: [0.78, 0.5, 0.66] },
];

// Add future easter eggs here; render and interaction code should not need changes.
export const worldDiscoveries: WorldDiscovery[] = [
  {
    id: 'garden-memory',
    title: 'Garden Memory',
    zoneId: 'west-garden',
    summary: 'A quiet marker hidden beyond the main museum route.',
    body: ['This discovery slot is ready for a personal memory, small story, or visual easter egg. Replace this copy in src/content/exteriorWorld.ts.'],
    tags: ['discovery', 'memory'],
    displayStyle: 'memory',
    transform: { position: { x: -14.65, y: 0.72, z: 8.1 }, scale: { x: 0.55, y: 0.55, z: 0.55 } },
    interactionRadius: 1.8,
  },
  {
    id: 'signal-fragment',
    title: 'Signal Fragment',
    zoneId: 'east-signal-yard',
    summary: 'A small transmission waits beside the signal mast.',
    body: ['This slot can hold a hidden link, project clue, short message, or another reward for visitors who explore outside the museum.'],
    tags: ['discovery', 'signal'],
    displayStyle: 'signal',
    transform: { position: { x: 13.55, y: 0.75, z: 7.1 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
    interactionRadius: 1.8,
  },
  {
    id: 'archive-cache',
    title: 'Archive Cache',
    zoneId: 'south-archive-grove',
    summary: 'A compact archive sits away from the direct entrance path.',
    body: ['Use this data entry for a deeper easter egg. The outdoor content stays separate from the scene renderer and can be expanded without creating a new React component.'],
    tags: ['discovery', 'archive'],
    displayStyle: 'cache',
    transform: { position: { x: 0, y: 0.95, z: 22.35 }, scale: { x: 0.75, y: 0.75, z: 0.75 } },
    interactionRadius: 2,
  },
  {
    id: 'archive-threshold',
    title: 'Threshold Index',
    zoneId: 'south-archive-grove',
    summary: 'A final marker rewards visitors who continue beyond the central archive.',
    body: ['The outer path is intentionally compact: each turn should reveal a distinct place without requiring a large or expensive world.'],
    tags: ['discovery', 'world'],
    displayStyle: 'memory',
    transform: { position: { x: 0, y: 0.82, z: 24.15 }, scale: { x: 0.52, y: 0.52, z: 0.52 } },
    interactionRadius: 1.8,
  },
];
