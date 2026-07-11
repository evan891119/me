import { useLayoutEffect, useRef } from 'react';
import { AdditiveBlending, BoxGeometry, BufferGeometry, CircleGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, Euler, Float32BufferAttribute, InstancedMesh, Matrix4, MeshBasicMaterial, Object3D, Quaternion, ShaderMaterial, Vector3 } from 'three';
import { exteriorLanterns, exteriorPlants, exteriorRocks, exteriorTrees } from '../../content/exteriorWorld';
import { worldMaterialInstances } from '../materials/worldMaterials';

const trunkGeometry = new CylinderGeometry(0.14, 0.2, 1, 6);
const canopyGeometry = new DodecahedronGeometry(0.86, 0);
const postGeometry = new BoxGeometry(0.12, 1, 0.12);
const lanternGeometry = new BoxGeometry(0.28, 0.28, 0.28);
const rockGeometry = new DodecahedronGeometry(0.65, 0);
const plantLeaves = [
  { position: [0, 0.38, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  { position: [-0.18, 0.28, 0], rotation: [0, 0, -0.5], scale: [0.82, 0.8, 0.82] },
  { position: [0.18, 0.28, 0], rotation: [0, 0, 0.5], scale: [0.82, 0.8, 0.82] },
  { position: [0, 0.26, -0.18], rotation: [-0.5, 0, 0], scale: [0.75, 0.72, 0.75] },
  { position: [0, 0.26, 0.18], rotation: [0.5, 0, 0], scale: [0.75, 0.72, 0.75] },
] as const;
function createPlantGeometry() {
  const positions: number[] = [];
  const normals: number[] = [];

  plantLeaves.forEach((leaf) => {
    const geometry = new ConeGeometry(0.13, 0.9, 4).toNonIndexed();
    geometry.applyMatrix4(
      new Matrix4().compose(
        new Vector3(...leaf.position),
        new Quaternion().setFromEuler(new Euler(...leaf.rotation)),
        new Vector3(...leaf.scale),
      ),
    );
    positions.push(...geometry.getAttribute('position').array);
    normals.push(...geometry.getAttribute('normal').array);
    geometry.dispose();
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

const plantGeometry = createPlantGeometry();
const lanternMaterial = new MeshBasicMaterial({ color: '#d9ad68' });
const lanternPoolGeometry = new CircleGeometry(1, 16);
const lanternPoolMaterial = new ShaderMaterial({
  blending: AdditiveBlending,
  depthWrite: false,
  fragmentShader: `
    varying vec2 vUv;

    void main() {
      float distanceFromCenter = distance(vUv, vec2(0.5));
      float alpha = (1.0 - smoothstep(0.05, 0.5, distanceFromCenter)) * 0.2;
      gl_FragColor = vec4(0.72, 0.38, 0.13, alpha);
    }
  `,
  transparent: true,
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    }
  `,
});
const transformHelper = new Object3D();

export function ExteriorTrees() {
  const trunks = useRef<InstancedMesh>(null);
  const canopies = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    exteriorTrees.forEach((tree, index) => {
      const [x, y, z] = tree.position;

      transformHelper.position.set(x, y + 0.55 * tree.scale, z);
      transformHelper.rotation.set(0, 0, 0);
      transformHelper.scale.set(0.78 * tree.scale, 1.35 * tree.scale, 0.78 * tree.scale);
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
  const lightPools = useRef<InstancedMesh>(null);

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

      transformHelper.position.set(x, y + 0.052, z);
      transformHelper.rotation.set(-Math.PI / 2, 0, 0);
      transformHelper.scale.set(1.45, 1.45, 1.45);
      transformHelper.updateMatrix();
      lightPools.current?.setMatrixAt(index, transformHelper.matrix);
    });

    if (posts.current) {
      posts.current.instanceMatrix.needsUpdate = true;
    }
    if (lights.current) {
      lights.current.instanceMatrix.needsUpdate = true;
    }
    if (lightPools.current) {
      lightPools.current.instanceMatrix.needsUpdate = true;
      lightPools.current.computeBoundingSphere();
    }
  }, []);

  return (
    <group>
      <instancedMesh ref={posts} args={[postGeometry, worldMaterialInstances.exteriorBoundary, exteriorLanterns.length]} />
      <instancedMesh ref={lights} args={[lanternGeometry, lanternMaterial, exteriorLanterns.length]} />
      <instancedMesh ref={lightPools} args={[lanternPoolGeometry, lanternPoolMaterial, exteriorLanterns.length]} />
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

export function ExteriorPlants() {
  const plants = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    exteriorPlants.forEach((plant, index) => {
      const [x, y, z] = plant.position;
      transformHelper.position.set(x, y + 0.5 * plant.scale, z);
      transformHelper.rotation.set(0, plant.rotation ?? 0, 0.08);
      transformHelper.scale.set(0.68 * plant.scale, plant.scale, 0.68 * plant.scale);
      transformHelper.updateMatrix();
      plants.current?.setMatrixAt(index, transformHelper.matrix);
    });

    if (plants.current) {
      plants.current.instanceMatrix.needsUpdate = true;
      plants.current.computeBoundingSphere();
    }
  }, []);

  return (
    <instancedMesh
      ref={plants}
      args={[plantGeometry, worldMaterialInstances.exteriorPlanting, exteriorPlants.length]}
    />
  );
}
