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
  position: [10.5, 0.76, 10.6],
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
  { id: 'signal-mast-a', position: [10.5, 1.7, 10.6], scale: [0.18, 2.5, 0.18], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-mast-b', position: [9.8, 1.55, 10.6], rotation: [0, 0, -0.38], scale: [0.13, 2.2, 0.13], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-mast-c', position: [11.2, 1.55, 10.6], rotation: [0, 0, 0.38], scale: [0.13, 2.2, 0.13], token: 'exteriorPathEdge', collider: false },
  { id: 'signal-head', position: [10.5, 3.0, 10.6], scale: [0.68, 0.42, 0.68], token: 'warmAccent', collider: false },
  { id: 'signal-panel', position: [10.5, 0.78, 9.2], scale: [1.15, 0.62, 0.12], token: 'exhibitTimelineAccent', collider: false },
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
];

export const exteriorVisualPieces: ExteriorBoxPiece[] = [
  { id: 'museum-west-shell', position: [-4.62, 1.7, 0.7], scale: [0.18, 3.4, 9.4], token: 'exteriorFacade', collider: false },
  { id: 'museum-east-shell', position: [4.62, 1.7, 0.7], scale: [0.18, 3.4, 9.4], token: 'exteriorFacade', collider: false },
  { id: 'museum-roof-band', position: [0, 3.25, 0.65], scale: [9.4, 0.35, 9.6], token: 'exteriorBoundary', collider: false },
  { id: 'west-terrace-a', position: [-13.8, 0.28, 9], scale: [4.8, 0.55, 2.4], token: 'exteriorPlanting', collider: false },
  { id: 'west-terrace-b', position: [-13.2, 0.18, 15.2], scale: [5.6, 0.36, 2.1], token: 'exteriorPlanting', collider: false },
  { id: 'east-terrace-a', position: [13.7, 0.24, 7.4], scale: [5.1, 0.48, 2.2], token: 'exteriorPlanting', collider: false },
  { id: 'east-terrace-b', position: [13.4, 0.18, 15.4], scale: [5.7, 0.36, 2.1], token: 'exteriorPlanting', collider: false },
  { id: 'south-terrace-left', position: [-7.7, 0.2, 24.7], scale: [8.2, 0.4, 2.5], token: 'exteriorPlanting', collider: false },
  { id: 'south-terrace-right', position: [7.7, 0.2, 24.7], scale: [8.2, 0.4, 2.5], token: 'exteriorPlanting', collider: false },
];

export const exteriorPathPieces: ExteriorBoxPiece[] = [
  { id: 'arrival-path', position: [0, 0.015, 12.1], scale: [2.8, 0.03, 12.5], token: 'exteriorPath', collider: false },
  { id: 'front-loop', position: [0, 0.018, 17.15], scale: [18, 0.035, 2.3], token: 'exteriorPath', collider: false },
  { id: 'west-loop', position: [-7.35, 0.018, 11.1], rotation: [0, 0.12, 0], scale: [2.25, 0.035, 11.2], token: 'exteriorPath', collider: false },
  { id: 'east-loop', position: [7.35, 0.018, 10.9], rotation: [0, -0.12, 0], scale: [2.25, 0.035, 11.2], token: 'exteriorPath', collider: false },
  { id: 'west-garden-path', position: [-11.4, 0.02, 12.1], rotation: [0, -0.12, 0], scale: [6.4, 0.04, 2.15], token: 'exteriorPath', collider: false },
  { id: 'east-yard-path', position: [11.1, 0.02, 11.4], rotation: [0, 0.08, 0], scale: [6.6, 0.04, 2.15], token: 'exteriorPath', collider: false },
  { id: 'archive-path', position: [0, 0.02, 21.0], scale: [2.2, 0.04, 6.5], token: 'exteriorPath', collider: false },
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
    transform: { position: { x: -14.3, y: 0.72, z: 8.1 }, scale: { x: 0.55, y: 0.55, z: 0.55 } },
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
    transform: { position: { x: 12.6, y: 0.75, z: 8.4 }, scale: { x: 0.5, y: 0.5, z: 0.5 } },
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
];
