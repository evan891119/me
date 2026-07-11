import { writeFile } from 'node:fs/promises';
import {
  BoxGeometry,
  Euler,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Scene,
  Vector3,
} from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

class NodeFileReader {
  result = null;
  onloadend = null;

  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    });
  }
}

globalThis.FileReader = NodeFileReader;

const stoneGeometries = [];
const accentGeometries = [];

function addBox(bucket, position, scale, rotation = [0, 0, 0]) {
  const source = new BoxGeometry(1, 1, 1);
  const geometry = source.toNonIndexed();
  source.dispose();
  geometry.deleteAttribute('uv');
  geometry.applyMatrix4(
    new Matrix4().compose(
      new Vector3(...position),
      new Quaternion().setFromEuler(new Euler(...rotation)),
      new Vector3(...scale),
    ),
  );
  bucket.push(geometry);
}

addBox(stoneGeometries, [-1.48, 1.42, 0], [0.46, 2.84, 0.34]);
addBox(stoneGeometries, [1.48, 1.42, 0], [0.46, 2.84, 0.34]);
addBox(stoneGeometries, [0, 2.78, 0], [3.42, 0.42, 0.36]);
addBox(stoneGeometries, [0, 3.08, 0.12], [4.15, 0.18, 0.78]);
addBox(stoneGeometries, [-2.12, 1.54, 0.05], [0.2, 2.5, 0.52], [0, 0, -0.08]);
addBox(stoneGeometries, [2.12, 1.54, 0.05], [0.2, 2.5, 0.52], [0, 0, 0.08]);
addBox(stoneGeometries, [-1.48, 0.16, 0.18], [0.82, 0.32, 0.7]);
addBox(stoneGeometries, [1.48, 0.16, 0.18], [0.82, 0.32, 0.7]);
addBox(stoneGeometries, [-2.7, 1.28, -0.02], [0.72, 1.7, 0.22]);
addBox(stoneGeometries, [2.7, 1.28, -0.02], [0.72, 1.7, 0.22]);
addBox(stoneGeometries, [-2.7, 2.28, 0.04], [0.92, 0.16, 0.36]);
addBox(stoneGeometries, [2.7, 2.28, 0.04], [0.92, 0.16, 0.36]);

addBox(accentGeometries, [-1.18, 1.36, 0.2], [0.075, 2.18, 0.07]);
addBox(accentGeometries, [1.18, 1.36, 0.2], [0.075, 2.18, 0.07]);
addBox(accentGeometries, [0, 2.47, 0.2], [2.44, 0.075, 0.07]);
addBox(accentGeometries, [-2.7, 1.28, 0.115], [0.42, 1.18, 0.045]);
addBox(accentGeometries, [2.7, 1.28, 0.115], [0.42, 1.18, 0.045]);
addBox(accentGeometries, [-0.34, 2.88, 0.24], [0.18, 0.075, 0.06]);
addBox(accentGeometries, [0, 2.88, 0.24], [0.18, 0.075, 0.06]);
addBox(accentGeometries, [0.34, 2.88, 0.24], [0.18, 0.075, 0.06]);

const stoneGeometry = mergeGeometries(stoneGeometries, false);
const accentGeometry = mergeGeometries(accentGeometries, false);
stoneGeometry.name = 'MuseumEntranceStoneGeometry';
accentGeometry.name = 'MuseumEntranceAccentGeometry';

const stoneMaterial = new MeshStandardMaterial({
  color: '#4d4941',
  metalness: 0.02,
  roughness: 0.86,
  name: 'MuseumEntranceStone',
});
const accentMaterial = new MeshStandardMaterial({
  color: '#c99a61',
  emissive: '#4c2b16',
  emissiveIntensity: 0.32,
  metalness: 0.12,
  roughness: 0.62,
  name: 'MuseumEntranceAccent',
});

const scene = new Scene();
scene.name = 'MuseumEntranceLandmark';
const stoneMesh = new Mesh(stoneGeometry, stoneMaterial);
stoneMesh.name = 'MuseumEntranceStone';
const accentMesh = new Mesh(accentGeometry, accentMaterial);
accentMesh.name = 'MuseumEntranceAccent';
scene.add(stoneMesh, accentMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/landmark-museum-entrance.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [stoneGeometry, accentGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
