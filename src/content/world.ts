import type { Vec3 } from './types';

export type WorldLocationId = 'exterior' | 'interior';

export interface WorldSpawn {
  position: Vec3;
}

export interface ExteriorTransitionZone {
  center: Vec3;
  halfExtents: Vec3;
  targetLocationId: WorldLocationId;
  targetSpawn: WorldSpawn;
}

export const exteriorSpawn: WorldSpawn = {
  position: { x: 0, y: 0.9, z: 15.5 },
};

export const interiorEntrySpawn: WorldSpawn = {
  position: { x: 0, y: 0.9, z: 3.35 },
};

export const exteriorEntryTransition: ExteriorTransitionZone = {
  center: { x: 0, y: 0.9, z: 6.35 },
  halfExtents: { x: 1.25, y: 1.2, z: 0.5 },
  targetLocationId: 'interior',
  targetSpawn: interiorEntrySpawn,
};
