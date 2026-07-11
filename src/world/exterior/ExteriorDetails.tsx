import { useLayoutEffect, useRef } from 'react';
import { BoxGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, InstancedMesh, MeshBasicMaterial, Object3D } from 'three';
import { exteriorLanterns, exteriorRocks, exteriorTrees } from '../../content/exteriorWorld';
import { worldMaterialInstances } from '../materials/worldMaterials';

const trunkGeometry = new CylinderGeometry(0.14, 0.2, 1, 6);
const canopyGeometry = new ConeGeometry(0.8, 2.2, 6);
const postGeometry = new BoxGeometry(0.12, 1, 0.12);
const lanternGeometry = new BoxGeometry(0.28, 0.28, 0.28);
const rockGeometry = new DodecahedronGeometry(0.65, 0);
const lanternMaterial = new MeshBasicMaterial({ color: '#d9ad68' });
const transformHelper = new Object3D();

export function ExteriorTrees() {
  const trunks = useRef<InstancedMesh>(null);
  const canopies = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    exteriorTrees.forEach((tree, index) => {
      const [x, y, z] = tree.position;

      transformHelper.position.set(x, y + 0.55 * tree.scale, z);
      transformHelper.rotation.set(0, 0, 0);
      transformHelper.scale.setScalar(tree.scale);
      transformHelper.updateMatrix();
      trunks.current?.setMatrixAt(index, transformHelper.matrix);

      transformHelper.position.set(x, y + 1.75 * tree.scale, z);
      transformHelper.scale.setScalar(tree.scale);
      transformHelper.updateMatrix();
      canopies.current?.setMatrixAt(index, transformHelper.matrix);
    });

    if (trunks.current) {
      trunks.current.instanceMatrix.needsUpdate = true;
    }
    if (canopies.current) {
      canopies.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <group>
      <instancedMesh ref={trunks} args={[trunkGeometry, worldMaterialInstances.exteriorFacade, exteriorTrees.length]} />
      <instancedMesh ref={canopies} args={[canopyGeometry, worldMaterialInstances.exteriorPlanting, exteriorTrees.length]} />
    </group>
  );
}

export function ExteriorLanterns() {
  const posts = useRef<InstancedMesh>(null);
  const lights = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    exteriorLanterns.forEach((lantern, index) => {
      const [x, y, z] = lantern.position;

      transformHelper.position.set(x, y + 0.5, z);
      transformHelper.rotation.set(0, 0, 0);
      transformHelper.scale.set(1, 1, 1);
      transformHelper.updateMatrix();
      posts.current?.setMatrixAt(index, transformHelper.matrix);

      transformHelper.position.set(x, y + 1.02, z);
      transformHelper.updateMatrix();
      lights.current?.setMatrixAt(index, transformHelper.matrix);
    });

    if (posts.current) {
      posts.current.instanceMatrix.needsUpdate = true;
    }
    if (lights.current) {
      lights.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <group>
      <instancedMesh ref={posts} args={[postGeometry, worldMaterialInstances.exteriorBoundary, exteriorLanterns.length]} />
      <instancedMesh ref={lights} args={[lanternGeometry, lanternMaterial, exteriorLanterns.length]} />
    </group>
  );
}

export function ExteriorRocks() {
  const rocks = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    exteriorRocks.forEach((rock, index) => {
      transformHelper.position.set(...rock.position);
      transformHelper.rotation.set(...rock.rotation);
      transformHelper.scale.set(...rock.scale);
      transformHelper.updateMatrix();
      rocks.current?.setMatrixAt(index, transformHelper.matrix);
    });

    if (rocks.current) {
      rocks.current.instanceMatrix.needsUpdate = true;
      rocks.current.computeBoundingSphere();
    }
  }, []);

  return (
    <instancedMesh
      ref={rocks}
      args={[rockGeometry, worldMaterialInstances.exteriorBoundary, exteriorRocks.length]}
    />
  );
}
