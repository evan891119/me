import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { ReactNode } from 'react';

type Vec3Tuple = [number, number, number];

interface PhysicsBoxProps {
  children?: ReactNode;
  color: string;
  position: Vec3Tuple;
  roughness?: number;
  scale: Vec3Tuple;
}

const plazaPieces: PhysicsBoxProps[] = [
  {
    color: '#252723',
    position: [0, -0.05, 12.2],
    roughness: 0.94,
    scale: [11, 0.1, 13.8],
  },
  {
    color: '#3a3730',
    position: [-5.6, 0.75, 12.2],
    scale: [0.3, 1.5, 13.8],
  },
  {
    color: '#3a3730',
    position: [5.6, 0.75, 12.2],
    scale: [0.3, 1.5, 13.8],
  },
  {
    color: '#2f332f',
    position: [0, 0.55, 18.95],
    scale: [11, 1.1, 0.3],
  },
  {
    color: '#4a4438',
    position: [-3.35, 1.45, 5.55],
    scale: [4.5, 2.9, 0.35],
  },
  {
    color: '#4a4438',
    position: [3.35, 1.45, 5.55],
    scale: [4.5, 2.9, 0.35],
  },
  {
    color: '#4a4438',
    position: [0, 2.85, 5.55],
    scale: [8.7, 0.8, 0.35],
  },
  {
    color: '#6d5637',
    position: [-1.45, 1.2, 5.35],
    scale: [0.24, 2.4, 0.45],
  },
  {
    color: '#6d5637',
    position: [1.45, 1.2, 5.35],
    scale: [0.24, 2.4, 0.45],
  },
];

const visualOnlyPieces: PhysicsBoxProps[] = [
  {
    color: '#c9a46d',
    position: [0, 2.05, 5.15],
    roughness: 0.7,
    scale: [2.5, 0.18, 0.12],
  },
  {
    color: '#2d3434',
    position: [-4.2, 0.2, 8.7],
    scale: [0.9, 0.4, 1.8],
  },
  {
    color: '#2d3434',
    position: [4.2, 0.2, 8.9],
    scale: [0.9, 0.4, 1.8],
  },
  {
    color: '#252b2d',
    position: [-7.8, 1.6, 20],
    scale: [1.1, 3.2, 0.2],
  },
  {
    color: '#293033',
    position: [-6.4, 1.15, 20.2],
    scale: [0.9, 2.3, 0.2],
  },
  {
    color: '#252b2d',
    position: [6.8, 1.35, 20.1],
    scale: [1, 2.7, 0.2],
  },
  {
    color: '#303739',
    position: [8, 0.95, 20.25],
    scale: [0.8, 1.9, 0.2],
  },
];

function PhysicsBox({ color, position, roughness = 0.86, scale }: PhysicsBoxProps) {
  return (
    <RigidBody type="fixed" position={position} colliders={false}>
      <CuboidCollider args={[scale[0] / 2, scale[1] / 2, scale[2] / 2]} />
      <mesh scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>
    </RigidBody>
  );
}

function VisualBox({ color, position, roughness = 0.86, scale }: PhysicsBoxProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}

export function ExteriorArrival() {
  return (
    <group>
      {plazaPieces.map((piece, index) => (
        <PhysicsBox key={`plaza-${index}`} {...piece} />
      ))}

      {visualOnlyPieces.map((piece, index) => (
        <VisualBox key={`exterior-visual-${index}`} {...piece} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 10.85]} scale={[2.1, 5.8, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#5c4b34" roughness={0.9} />
      </mesh>

      <pointLight position={[0, 2.35, 6.25]} intensity={1.4} distance={6} color="#d8b170" />
    </group>
  );
}
