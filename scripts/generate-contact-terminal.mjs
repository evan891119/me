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
const signalGeometries = [];

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

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.2, 0.04], [0, 0, 0], [1.28, 0.18, 0.72]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.78, 0], [-0.12, 0, 0], [1.08, 0.92, 0.18]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 1.28, -0.08], [0, 0, 0], [0.84, 0.1, 0.16]);
addGeometry(structureGeometries, new CylinderGeometry(0.055, 0.055, 0.38, 8), [-0.38, 1.48, -0.07]);
addGeometry(structureGeometries, new CylinderGeometry(0.055, 0.055, 0.38, 8), [0.38, 1.48, -0.07]);

addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [0, 0.82, 0.115], [-0.12, 0, 0], [0.82, 0.52, 0.035]);
addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [-0.22, 0.86, 0.145], [-0.12, 0, -0.35], [0.38, 0.035, 0.025]);
addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [0.14, 0.77, 0.145], [-0.12, 0, 0.25], [0.3, 0.035, 0.025]);
addGeometry(signalGeometries, new CylinderGeometry(0.075, 0.075, 0.045, 10), [-0.38, 1.69, -0.07]);
addGeometry(signalGeometries, new CylinderGeometry(0.075, 0.075, 0.045, 10), [0.38, 1.69, -0.07]);
addGeometry(signalGeometries, new TorusGeometry(0.17, 0.025, 5, 18, Math.PI), [-0.38, 1.69, -0.07], [Math.PI / 2, 0, 0]);
addGeometry(signalGeometries, new TorusGeometry(0.17, 0.025, 5, 18, Math.PI), [0.38, 1.69, -0.07], [Math.PI / 2, 0, Math.PI]);

for (const x of [-0.3, 0, 0.3]) {
  addGeometry(signalGeometries, new CylinderGeometry(0.055, 0.055, 0.045, 8), [x, 0.33, 0.42], [Math.PI / 2, 0, 0]);
}

const structureGeometry = mergeGeometries(structureGeometries, false);
const signalGeometry = mergeGeometries(signalGeometries, false);
structureGeometry.name = 'ContactTerminalStructureGeometry';
signalGeometry.name = 'ContactTerminalSignalGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#303a3f',
  metalness: 0.28,
  roughness: 0.65,
  name: 'ContactTerminalStructure',
});
const signalMaterial = new MeshStandardMaterial({
  color: '#74c7b8',
  emissive: '#173f3a',
  emissiveIntensity: 0.5,
  metalness: 0.08,
  roughness: 0.46,
  name: 'ContactTerminalSignal',
});

const scene = new Scene();
scene.name = 'ContactTerminalArtifact';
const structureMesh = new Mesh(structureGeometry, structureMaterial);
structureMesh.name = 'ContactTerminalStructure';
const signalMesh = new Mesh(signalGeometry, signalMaterial);
signalMesh.name = 'ContactTerminalSignal';
scene.add(structureMesh, signalMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/exhibit-contact-terminal.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [structureGeometry, signalGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
