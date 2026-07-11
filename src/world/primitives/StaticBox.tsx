import { CuboidCollider, RigidBody } from '@react-three/rapier';
import type { ReactNode } from 'react';
import {
  materialProps,
  worldMaterialInstances,
  worldMaterials,
  type WorldMaterialName,
} from '../materials/worldMaterials';
import { sharedBoxGeometry } from './boxGeometry';

export type Vec3Tuple = [number, number, number];
export type { WorldMaterialName };

interface BoxMaterialProps {
  color?: string;
  roughness?: number;
  token?: WorldMaterialName;
}

export interface StaticBoxProps extends BoxMaterialProps {
  children?: ReactNode;
  collider?: boolean;
  position: Vec3Tuple;
  receiveShadow?: boolean;
  rotation?: Vec3Tuple;
  scale: Vec3Tuple;
  userData?: Record<string, unknown>;
}

function resolveMaterial({ color, roughness, token }: BoxMaterialProps) {
  if (token) {
    return materialProps(worldMaterials[token]);
  }

  return materialProps({
    color: color ?? '#3a3730',
    roughness: roughness ?? 0.86,
  });
}

function BoxMesh(props: StaticBoxProps) {
  const { receiveShadow, scale, token } = props;

  return (
    <mesh
      geometry={sharedBoxGeometry}
      material={token ? worldMaterialInstances[token] : undefined}
      receiveShadow={receiveShadow}
      scale={scale}
    >
      {token ? null : <meshStandardMaterial {...resolveMaterial(props)} />}
    </mesh>
  );
}

export function StaticBox(props: StaticBoxProps) {
  const { children, collider = true, position, rotation, scale, userData } = props;

  if (!collider) {
    return (
      <group position={position} rotation={rotation}>
        <BoxMesh {...props} />
        {children}
      </group>
    );
  }

  return (
    <RigidBody
      type="fixed"
      position={position}
      rotation={rotation}
      colliders={false}
      userData={userData}
    >
      <CuboidCollider args={[scale[0] / 2, scale[1] / 2, scale[2] / 2]} />
      <BoxMesh {...props} />
      {children}
    </RigidBody>
  );
}
