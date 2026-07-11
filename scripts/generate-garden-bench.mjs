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

const frameGeometries = [];
const slatGeometries = [];

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

for (const z of [-0.24, -0.08, 0.08, 0.24]) {
  addBox(slatGeometries, [0, 0.57, z], [2.52, 0.1, 0.12]);
}

for (const y of [0.84, 1.02, 1.2]) {
  addBox(slatGeometries, [0, y, -0.34], [2.46, 0.12, 0.1], [-0.08, 0, 0]);
}

for (const x of [-1.05, 1.05]) {
  addBox(frameGeometries, [x, 0.29, -0.2], [0.12, 0.58, 0.12], [0, 0, x < 0 ? -0.06 : 0.06]);
  addBox(frameGeometries, [x, 0.29, 0.2], [0.12, 0.58, 0.12], [0, 0, x < 0 ? -0.06 : 0.06]);
  addBox(frameGeometries, [x, 0.83, -0.32], [0.11, 0.86, 0.11], [-0.08, 0, 0]);
  addBox(frameGeometries, [x, 0.75, 0], [0.14, 0.1, 0.72]);
}

addBox(frameGeometries, [0, 0.49, -0.29], [2.28, 0.1, 0.1]);
addBox(frameGeometries, [0, 0.49, 0.29], [2.28, 0.1, 0.1]);
addBox(frameGeometries, [0, 0.76, -0.34], [2.28, 0.09, 0.09], [-0.08, 0, 0]);
addBox(frameGeometries, [0, 1.3, -0.34], [2.28, 0.09, 0.09], [-0.08, 0, 0]);

const frameGeometry = mergeGeometries(frameGeometries, false);
const slatGeometry = mergeGeometries(slatGeometries, false);
frameGeometry.name = 'GardenBenchFrameGeometry';
slatGeometry.name = 'GardenBenchSlatGeometry';

const frameMaterial = new MeshStandardMaterial({
  color: '#303938',
  metalness: 0.4,
  roughness: 0.66,
  name: 'GardenBenchFrame',
});
const slatMaterial = new MeshStandardMaterial({
  color: '#8d6947',
  metalness: 0.02,
  roughness: 0.82,
  name: 'GardenBenchSlats',
});

const scene = new Scene();
scene.name = 'GardenBenchLandmark';
const frameMesh = new Mesh(frameGeometry, frameMaterial);
frameMesh.name = 'GardenBenchFrame';
const slatMesh = new Mesh(slatGeometry, slatMaterial);
slatMesh.name = 'GardenBenchSlats';
scene.add(frameMesh, slatMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/prop-garden-bench.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [frameGeometry, slatGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
