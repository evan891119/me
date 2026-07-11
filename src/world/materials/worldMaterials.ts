import { MeshStandardMaterial } from 'three';

export interface WorldMaterialToken {
  color: string;
  roughness: number;
  metalness?: number;
}

interface StandardMaterialProps {
  color: string;
  metalness: number;
  roughness: number;
}

export const worldMaterials = {
  exhibitContact: {
    color: '#4f6c68',
    roughness: 0.62,
  },
  exhibitContactAccent: {
    color: '#9cc5c1',
    roughness: 0.58,
  },
  exhibitNote: {
    color: '#6b5e42',
    roughness: 0.72,
  },
  exhibitNoteAccent: {
    color: '#c6b27c',
    roughness: 0.58,
  },
  exhibitProject: {
    color: '#755a3a',
    roughness: 0.7,
  },
  exhibitProjectAccent: {
    color: '#d2a35f',
    roughness: 0.58,
  },
  exhibitSkill: {
    color: '#596139',
    roughness: 0.68,
  },
  exhibitSkillAccent: {
    color: '#b7c184',
    roughness: 0.58,
  },
  exhibitTimeline: {
    color: '#6b5045',
    roughness: 0.74,
  },
  exhibitTimelineAccent: {
    color: '#b88f79',
    roughness: 0.58,
  },
  exhibitWelcome: {
    color: '#70604a',
    roughness: 0.66,
  },
  exhibitWelcomeAccent: {
    color: '#c9a46d',
    roughness: 0.58,
  },
  exteriorBoundary: {
    color: '#3b413e',
    roughness: 0.94,
  },
  exteriorFacade: {
    color: '#514a40',
    roughness: 0.88,
  },
  exteriorGround: {
    color: '#2d3330',
    roughness: 0.96,
  },
  exteriorPath: {
    color: '#66563f',
    roughness: 0.92,
  },
  exteriorPathEdge: {
    color: '#9a7545',
    roughness: 0.86,
  },
  exteriorPlanting: {
    color: '#344a40',
    roughness: 0.98,
  },
  exteriorSkyline: {
    color: '#222a2d',
    roughness: 0.9,
  },
  warmAccent: {
    color: '#c9a46d',
    roughness: 0.7,
  },
  interiorAccent: {
    color: '#b98d52',
    roughness: 0.74,
  },
  interiorCeiling: {
    color: '#242520',
    roughness: 0.92,
  },
  interiorFloor: {
    color: '#2b2b25',
    roughness: 0.94,
  },
  interiorFloorInlay: {
    color: '#5a4930',
    roughness: 0.9,
  },
  interiorPanel: {
    color: '#343735',
    roughness: 0.88,
  },
  interiorWall: {
    color: '#3a3730',
    roughness: 0.88,
  },
} satisfies Record<string, WorldMaterialToken>;

export function materialProps(token: WorldMaterialToken): StandardMaterialProps {
  return {
    color: token.color,
    metalness: token.metalness ?? 0,
    roughness: token.roughness,
  };
}

export type WorldMaterialName = keyof typeof worldMaterials;

export const worldMaterialInstances = Object.fromEntries(
  Object.entries(worldMaterials).map(([name, token]) => [
    name,
    new MeshStandardMaterial({ ...materialProps(token), name: `world-${name}` }),
  ]),
) as Record<WorldMaterialName, MeshStandardMaterial>;
