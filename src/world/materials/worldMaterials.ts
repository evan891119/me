import { MeshStandardMaterial } from 'three';

export interface WorldMaterialToken {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness: number;
  metalness?: number;
}

interface StandardMaterialProps {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
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
    color: '#25292b',
    roughness: 0.9,
  },
  exteriorFacade: {
    color: '#343638',
    roughness: 0.86,
  },
  exteriorGround: {
    color: '#242a27',
    roughness: 0.96,
  },
  exteriorPath: {
    color: '#6f6961',
    roughness: 0.9,
  },
  exteriorPathEdge: {
    color: '#9a8c78',
    roughness: 0.84,
  },
  exteriorPlanting: {
    color: '#315a4c',
    roughness: 0.98,
  },
  exteriorBanner: {
    color: '#7f493f',
    roughness: 0.82,
  },
  exteriorLawn: {
    color: '#3d563c',
    roughness: 0.98,
  },
  exteriorMetal: {
    color: '#252b2d',
    metalness: 0.38,
    roughness: 0.68,
  },
  exteriorPavingAlt: {
    color: '#5b5853',
    roughness: 0.92,
  },
  exteriorPavingJoint: {
    color: '#35383a',
    roughness: 0.96,
  },
  exteriorStoneLight: {
    color: '#8c8275',
    roughness: 0.86,
  },
  exteriorStoneMid: {
    color: '#4c4d4c',
    roughness: 0.9,
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
    color: '#292a27',
    roughness: 0.92,
  },
  interiorDivider: {
    color: '#303330',
    roughness: 0.9,
  },
  interiorFloor: {
    color: '#302f2a',
    roughness: 0.94,
  },
  interiorFloorAlt: {
    color: '#3d3931',
    roughness: 0.92,
  },
  interiorFloorInlay: {
    color: '#5a4930',
    roughness: 0.9,
  },
  interiorPanel: {
    color: '#3c403d',
    roughness: 0.88,
  },
  interiorGlow: {
    color: '#d6ab65',
    emissive: '#9b5d24',
    emissiveIntensity: 0.7,
    roughness: 0.56,
  },
  interiorStoneLight: {
    color: '#8d8171',
    roughness: 0.84,
  },
  interiorWall: {
    color: '#46413a',
    roughness: 0.88,
  },
} satisfies Record<string, WorldMaterialToken>;

export function materialProps(token: WorldMaterialToken): StandardMaterialProps {
  return {
    color: token.color,
    metalness: token.metalness ?? 0,
    roughness: token.roughness,
    ...(token.emissive
      ? {
          emissive: token.emissive,
          emissiveIntensity: token.emissiveIntensity ?? 1,
        }
      : {}),
  };
}

export type WorldMaterialName = keyof typeof worldMaterials;

export const worldMaterialInstances = Object.fromEntries(
  Object.entries(worldMaterials).map(([name, token]) => [
    name,
    new MeshStandardMaterial({ ...materialProps(token), name: `world-${name}` }),
  ]),
) as Record<WorldMaterialName, MeshStandardMaterial>;
