import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { ExhibitDisplayStyle, MuseumExhibit, Vec3 } from '../../content/types';

interface ExhibitObjectProps {
  exhibit: MuseumExhibit;
}

interface ExhibitVisualStyle {
  accentColor: string;
  baseColor: string;
  roughness: number;
}

const exhibitStyleByDisplayStyle: Record<ExhibitDisplayStyle, ExhibitVisualStyle> = {
  contact: {
    accentColor: '#9cc5c1',
    baseColor: '#4f6c68',
    roughness: 0.62,
  },
  note: {
    accentColor: '#c6b27c',
    baseColor: '#6b5e42',
    roughness: 0.72,
  },
  project: {
    accentColor: '#d2a35f',
    baseColor: '#755a3a',
    roughness: 0.7,
  },
  skill: {
    accentColor: '#b7c184',
    baseColor: '#596139',
    roughness: 0.68,
  },
  timeline: {
    accentColor: '#b88f79',
    baseColor: '#6b5045',
    roughness: 0.74,
  },
  welcome: {
    accentColor: '#c9a46d',
    baseColor: '#70604a',
    roughness: 0.66,
  },
};

function toTuple({ x, y, z }: Vec3): [number, number, number] {
  return [x, y, z];
}

export function ExhibitObject({ exhibit }: ExhibitObjectProps) {
  const { transform } = exhibit;
  const style = exhibitStyleByDisplayStyle[exhibit.displayStyle];
  const position = toTuple(transform.position);
  const rotation: [number, number, number] = transform.rotation
    ? toTuple(transform.rotation)
    : [0, 0, 0];
  const scale: [number, number, number] = transform.scale
    ? toTuple(transform.scale)
    : [1, 1, 1];
  const accentScale: [number, number, number] = [
    Math.max(scale[0] * 0.82, 0.2),
    0.08,
    Math.max(scale[2] * 0.82, 0.08),
  ];
  const accentPosition: [number, number, number] = [
    0,
    scale[1] / 2 + accentScale[1] / 2 + 0.01,
    0,
  ];

  return (
    <RigidBody
      type="fixed"
      position={position}
      rotation={rotation}
      colliders={false}
      userData={{ exhibitId: exhibit.id }}
    >
      <CuboidCollider args={[scale[0] / 2, scale[1] / 2, scale[2] / 2]} />
      <mesh scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={style.baseColor} roughness={style.roughness} />
      </mesh>
      <mesh position={accentPosition} scale={accentScale}>
        <boxGeometry />
        <meshStandardMaterial color={style.accentColor} roughness={0.58} />
      </mesh>
    </RigidBody>
  );
}
