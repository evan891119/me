import type { Vec3 } from './types';

export type WorldLocationId = 'exterior' | 'interior';

export interface WorldSpawn {
  position: Vec3;
}

export interface WorldTransitionZone {
  id: string;
  sourceLocationId: WorldLocationId;
  center: Vec3;
  halfExtents: Vec3;
  targetLocationId: WorldLocationId;
  targetSpawn: WorldSpawn;
}

export const exteriorSpawn: WorldSpawn = {
  position: { x: 0, y: 0.9, z: 19.5 },
};

export const interiorEntrySpawn: WorldSpawn = {
  position: { x: 0, y: 0.9, z: 9.2 },
};

export const exteriorEntryTransition: WorldTransitionZone = {
  id: 'museum-entry',
  sourceLocationId: 'exterior',
  center: { x: 0, y: 0.9, z: 6.35 },
  halfExtents: { x: 1.25, y: 1.2, z: 0.5 },
  targetLocationId: 'interior',
  targetSpawn: interiorEntrySpawn,
};

export const exteriorReturnSpawn: WorldSpawn = {
  position: { x: 0, y: 0.9, z: 7.15 },
};

export const interiorExitTransition: WorldTransitionZone = {
  id: 'museum-exit',
  sourceLocationId: 'interior',
  center: { x: 0, y: 0.9, z: 10.25 },
  halfExtents: { x: 1.25, y: 1.2, z: 0.42 },
  targetLocationId: 'exterior',
  targetSpawn: exteriorReturnSpawn,
};

export const worldTransitions = [exteriorEntryTransition, interiorExitTransition];
