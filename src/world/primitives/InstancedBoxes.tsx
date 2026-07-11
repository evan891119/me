import { useLayoutEffect, useRef } from 'react';
import { InstancedMesh, Object3D } from 'three';
import type { ExteriorBoxPiece } from '../../content/exteriorWorld';
import { worldMaterialInstances, type WorldMaterialName } from '../materials/worldMaterials';
import { sharedBoxGeometry } from './boxGeometry';

interface InstancedBoxesProps {
  pieces: ExteriorBoxPiece[];
  token: WorldMaterialName;
}

const transformHelper = new Object3D();

export function InstancedBoxes({ pieces, token }: InstancedBoxesProps) {
  const mesh = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!mesh.current) {
      return;
    }

    pieces.forEach((piece, index) => {
      transformHelper.position.set(...piece.position);
      transformHelper.rotation.set(...(piece.rotation ?? [0, 0, 0]));
      transformHelper.scale.set(...piece.scale);
      transformHelper.updateMatrix();
      mesh.current?.setMatrixAt(index, transformHelper.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [pieces]);

  if (pieces.length === 0) {
    return null;
  }

  return (
    <instancedMesh
      ref={mesh}
      args={[sharedBoxGeometry, worldMaterialInstances[token], pieces.length]}
      frustumCulled
    />
  );
}
