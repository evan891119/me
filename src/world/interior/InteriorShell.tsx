import { StaticBox, type StaticBoxProps } from '../primitives/StaticBox';

type InteriorPiece = Omit<StaticBoxProps, 'children'> & {
  id: string;
};

const shellPieces: InteriorPiece[] = [
  {
    id: 'floor',
    position: [0, -0.05, 0],
    receiveShadow: true,
    scale: [12, 0.1, 12],
    token: 'interiorFloor',
  },
  {
    id: 'center-inlay',
    collider: false,
    position: [0, 0.015, -0.45],
    scale: [2.2, 0.04, 4.8],
    token: 'interiorFloorInlay',
  },
  {
    id: 'back-wall',
    position: [0, 1.5, -4],
    scale: [9, 3, 0.25],
    token: 'interiorWall',
  },
  {
    id: 'left-wall',
    position: [-4.5, 1.5, 0],
    scale: [0.25, 3, 8],
    token: 'interiorWall',
  },
  {
    id: 'right-wall',
    position: [4.5, 1.5, 0],
    scale: [0.25, 3, 8],
    token: 'interiorWall',
  },
  {
    id: 'entry-header',
    position: [0, 2.7, 3.85],
    scale: [9, 0.6, 0.25],
    token: 'interiorWall',
  },
  {
    id: 'ceiling',
    collider: false,
    position: [0, 3.05, 0],
    scale: [9, 0.12, 8],
    token: 'interiorCeiling',
  },
  {
    id: 'ceiling-band-left',
    collider: false,
    position: [-2.9, 2.95, -0.1],
    scale: [0.18, 0.16, 7.4],
    token: 'interiorCeiling',
  },
  {
    id: 'ceiling-band-right',
    collider: false,
    position: [2.9, 2.95, -0.1],
    scale: [0.18, 0.16, 7.4],
    token: 'interiorCeiling',
  },
  {
    id: 'welcome-wall-panel',
    collider: false,
    position: [0, 1.55, -3.82],
    scale: [3.1, 1.35, 0.08],
    token: 'interiorPanel',
  },
  {
    id: 'left-accent-rail',
    collider: false,
    position: [-4.34, 1.25, -0.25],
    scale: [0.08, 0.12, 5.8],
    token: 'interiorAccent',
  },
  {
    id: 'right-accent-rail',
    collider: false,
    position: [4.34, 1.25, -0.25],
    scale: [0.08, 0.12, 5.8],
    token: 'interiorAccent',
  },
];

export function InteriorShell() {
  return (
    <group>
      {shellPieces.map(({ id, ...piece }) => (
        <StaticBox key={id} {...piece} />
      ))}
    </group>
  );
}
