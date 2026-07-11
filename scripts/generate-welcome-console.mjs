import { writeFile } from 'node:fs/promises';
import {
  BoxGeometry,
  CylinderGeometry,
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

const structureGeometries = [];
const guideGeometries = [];

function addGeometry(bucket, source, position, rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const geometry = source.index ? source.toNonIndexed() : source.clone();
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

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.18, 0], [0, 0, 0], [1.72, 0.16, 0.72]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.72, -0.08], [-0.18, 0, 0], [1.5, 0.86, 0.16]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [-0.66, 0.12, 0], [0, 0, 0], [0.16, 0.46, 0.56]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0.66, 0.12, 0], [0, 0, 0], [0.16, 0.46, 0.56]);

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.76, 0.03], [-0.18, 0, 0], [1.18, 0.56, 0.035]);

const mapSegments = [
  { position: [-0.27, 0.79, 0.065], rotation: -0.18, scale: [0.38, 0.035, 0.02] },
  { position: [0.06, 0.88, 0.065], rotation: 0.3, scale: [0.34, 0.035, 0.02] },
  { position: [0.32, 0.72, 0.065], rotation: -0.55, scale: [0.3, 0.035, 0.02] },
];

for (const segment of mapSegments) {
  addGeometry(
    guideGeometries,
    new BoxGeometry(1, 1, 1),
    segment.position,
    [-0.18, 0, segment.rotation],
    segment.scale,
  );
}

for (const [x, y] of [[-0.46, 0.72], [-0.08, 0.84], [0.24, 0.91], [0.46, 0.61]]) {
  addGeometry(guideGeometries, new CylinderGeometry(0.07, 0.07, 0.04, 10), [x, y, 0.085], [Math.PI / 2 - 0.18, 0, 0]);
}

addGeometry(guideGeometries, new BoxGeometry(1, 1, 1), [0, 1.28, -0.04], [0, 0, 0], [0.76, 0.045, 0.04]);
addGeometry(guideGeometries, new BoxGeometry(1, 1, 1), [0, 0.28, 0.39], [0, 0, 0], [0.64, 0.045, 0.04]);
addGeometry(guideGeometries, new BoxGeometry(1, 1, 1), [0.25, 0.28, 0.39], [0, 0, -0.65], [0.22, 0.04, 0.035]);
addGeometry(guideGeometries, new BoxGeometry(1, 1, 1), [0.34, 0.2, 0.39], [0, 0, 0.65], [0.22, 0.04, 0.035]);

const structureGeometry = mergeGeometries(structureGeometries, false);
const guideGeometry = mergeGeometries(guideGeometries, false);
structureGeometry.name = 'WelcomeConsoleStructureGeometry';
guideGeometry.name = 'WelcomeConsoleGuideGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#3d3a35',
  metalness: 0.2,
  roughness: 0.7,
  name: 'WelcomeConsoleStructure',
});
const guideMaterial = new MeshStandardMaterial({
  color: '#d4b478',
  emissive: '#4a3515',
  emissiveIntensity: 0.4,
  metalness: 0.08,
  roughness: 0.5,
  name: 'WelcomeConsoleGuide',
});

const scene = new Scene();
scene.name = 'WelcomeConsoleArtifact';
const structureMesh = new Mesh(structureGeometry, structureMaterial);
structureMesh.name = 'WelcomeConsoleStructure';
const guideMesh = new Mesh(guideGeometry, guideMaterial);
guideMesh.name = 'WelcomeConsoleGuide';
scene.add(structureMesh, guideMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/exhibit-welcome-console.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [structureGeometry, guideGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
