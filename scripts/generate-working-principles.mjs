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

const structureGeometries = [];
const accentGeometries = [];

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

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.72, 0.08], [0, 0, 0], [1.58, 1.42, 0.1]);
addGeometry(structureGeometries, new TorusGeometry(0.48, 0.055, 6, 24), [0, 0.74, 0.18]);
addGeometry(structureGeometries, new CylinderGeometry(0.14, 0.14, 0.1, 12), [0, 0.74, 0.2], [Math.PI / 2, 0, 0]);

const branches = [
  { angle: 0, endpoint: [0.58, 0.74, 0.22] },
  { angle: (Math.PI * 2) / 3, endpoint: [-0.29, 1.24, 0.22] },
  { angle: (Math.PI * 4) / 3, endpoint: [-0.29, 0.24, 0.22] },
];

for (const { angle, endpoint } of branches) {
  const branchLength = 0.43;
  const branchX = Math.cos(angle) * branchLength * 0.5;
  const branchY = 0.74 + Math.sin(angle) * branchLength * 0.5;
  addGeometry(
    accentGeometries,
    new BoxGeometry(1, 1, 1),
    [branchX, branchY, 0.225],
    [0, 0, angle],
    [branchLength, 0.055, 0.045],
  );
  addGeometry(
    accentGeometries,
    new CylinderGeometry(0.09, 0.09, 0.055, 10),
    endpoint,
    [Math.PI / 2, 0, 0],
  );
}

addGeometry(accentGeometries, new CylinderGeometry(0.09, 0.09, 0.07, 12), [0, 0.74, 0.24], [Math.PI / 2, 0, 0]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0, 1.34, 0.18], [0, 0, 0], [0.72, 0.035, 0.035]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0, 0.14, 0.18], [0, 0, 0], [0.72, 0.035, 0.035]);

const structureGeometry = mergeGeometries(structureGeometries, false);
const accentGeometry = mergeGeometries(accentGeometries, false);
structureGeometry.name = 'WorkingPrinciplesStructureGeometry';
accentGeometry.name = 'WorkingPrinciplesAccentGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#343b3d',
  metalness: 0.22,
  roughness: 0.72,
  name: 'WorkingPrinciplesStructure',
});
const accentMaterial = new MeshStandardMaterial({
  color: '#d39b54',
  emissive: '#4a2810',
  emissiveIntensity: 0.34,
  metalness: 0.16,
  roughness: 0.52,
  name: 'WorkingPrinciplesAccent',
});

const scene = new Scene();
scene.name = 'WorkingPrinciplesRelief';
const structureMesh = new Mesh(structureGeometry, structureMaterial);
structureMesh.name = 'WorkingPrinciplesStructure';
const accentMesh = new Mesh(accentGeometry, accentMaterial);
accentMesh.name = 'WorkingPrinciplesAccent';
scene.add(structureMesh, accentMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/exhibit-working-principles.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [structureGeometry, accentGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
