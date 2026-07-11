import { writeFile } from 'node:fs/promises';
import {
  BoxGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  Euler,
  IcosahedronGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Scene,
  TorusGeometry,
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

const darkGeometries = [];
const accentGeometries = [];
const yAxis = new Vector3(0, 1, 0);

function addGeometry(bucket, geometry, position, rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const transformed = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  transformed.deleteAttribute('uv');
  transformed.applyMatrix4(
    new Matrix4().compose(
      new Vector3(...position),
      new Quaternion().setFromEuler(new Euler(...rotation)),
      new Vector3(...scale),
    ),
  );
  bucket.push(transformed);
  geometry.dispose();
}

function addStrut(bucket, start, end, radius = 0.055) {
  const startPoint = new Vector3(...start);
  const endPoint = new Vector3(...end);
  const direction = endPoint.clone().sub(startPoint);
  const length = direction.length();
  const sourceGeometry = new CylinderGeometry(radius, radius * 1.12, length, 6, 1, false);
  const geometry = sourceGeometry.toNonIndexed();
  sourceGeometry.dispose();
  geometry.deleteAttribute('uv');
  geometry.applyMatrix4(
    new Matrix4().compose(
      startPoint.add(endPoint).multiplyScalar(0.5),
      new Quaternion().setFromUnitVectors(yAxis, direction.normalize()),
      new Vector3(1, 1, 1),
    ),
  );
  bucket.push(geometry);
}

const legBase = [
  [-0.72, 0.05, 0.48],
  [0.72, 0.05, 0.48],
  [0, 0.05, -0.72],
];
const legTop = [
  [-0.18, 2.35, 0.12],
  [0.18, 2.35, 0.12],
  [0, 2.35, -0.18],
];

legBase.forEach((base, index) => addStrut(darkGeometries, base, legTop[index], 0.075));

for (const height of [0.62, 1.2, 1.78]) {
  const ratio = height / 2.35;
  const ringPoints = legBase.map((base, index) =>
    base.map((coordinate, axis) => coordinate + (legTop[index][axis] - coordinate) * ratio),
  );

  addStrut(darkGeometries, ringPoints[0], ringPoints[1], 0.038);
  addStrut(darkGeometries, ringPoints[1], ringPoints[2], 0.038);
  addStrut(darkGeometries, ringPoints[2], ringPoints[0], 0.038);
}

addGeometry(darkGeometries, new CylinderGeometry(0.38, 0.52, 0.24, 8), [0, 0.12, 0]);
addGeometry(darkGeometries, new CylinderGeometry(0.13, 0.17, 2.6, 8), [0, 1.42, 0]);
addGeometry(darkGeometries, new DodecahedronGeometry(0.46, 0), [0, 2.72, 0], [0, 0.22, 0]);
addGeometry(darkGeometries, new CylinderGeometry(0.055, 0.075, 1.1, 6), [0, 3.55, 0]);
addGeometry(darkGeometries, new IcosahedronGeometry(0.14, 1), [0, 4.14, 0]);
addGeometry(darkGeometries, new BoxGeometry(0.88, 0.68, 0.14), [0, 1.24, 0.34], [0.04, 0, 0]);
addGeometry(darkGeometries, new BoxGeometry(0.22, 0.32, 0.18), [-0.55, 0.68, 0.18]);
addGeometry(darkGeometries, new BoxGeometry(0.22, 0.32, 0.18), [0.55, 0.68, 0.18]);

addGeometry(accentGeometries, new TorusGeometry(0.58, 0.055, 6, 16), [0, 2.72, 0.02]);
addGeometry(accentGeometries, new TorusGeometry(0.35, 0.035, 6, 14), [0, 2.72, 0.08]);
addGeometry(accentGeometries, new BoxGeometry(0.68, 0.46, 0.035), [0, 1.25, 0.425], [0.04, 0, 0]);
addGeometry(accentGeometries, new BoxGeometry(0.36, 0.055, 0.045), [0, 1.25, 0.452], [0.04, 0, 0]);
addGeometry(accentGeometries, new CylinderGeometry(0.09, 0.09, 0.12, 8), [0, 4.28, 0]);

const darkGeometry = mergeGeometries(darkGeometries, false);
const accentGeometry = mergeGeometries(accentGeometries, false);

darkGeometry.name = 'SignalTowerStructureGeometry';
accentGeometry.name = 'SignalTowerAccentGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#313a39',
  metalness: 0.34,
  roughness: 0.72,
  name: 'SignalTowerStructure',
});
const accentMaterial = new MeshStandardMaterial({
  color: '#c58a52',
  emissive: '#5a2d17',
  emissiveIntensity: 0.45,
  metalness: 0.12,
  roughness: 0.58,
  name: 'SignalTowerAccent',
});

const scene = new Scene();
scene.name = 'SignalTowerLandmark';

const structureMesh = new Mesh(darkGeometry, structureMaterial);
structureMesh.name = 'SignalTowerStructure';
const accentMesh = new Mesh(accentGeometry, accentMaterial);
accentMesh.name = 'SignalTowerAccent';
scene.add(structureMesh, accentMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/landmark-signal-tower.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [darkGeometry, accentGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
