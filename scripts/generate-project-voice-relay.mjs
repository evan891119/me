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

for (const x of [-0.66, 0.66]) {
  addGeometry(structureGeometries, new CylinderGeometry(0.34, 0.34, 0.24, 10), [x, 0.66, 0], [Math.PI / 2, 0, 0]);
  addGeometry(structureGeometries, new CylinderGeometry(0.16, 0.2, 0.46, 8), [x, 0.25, 0]);
  addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [x, 0.05, 0], [0, 0, 0], [0.48, 0.1, 0.42]);
  addGeometry(signalGeometries, new TorusGeometry(0.42, 0.045, 6, 16), [x, 0.66, 0.14]);
  addGeometry(signalGeometries, new TorusGeometry(0.22, 0.028, 6, 12), [x, 0.66, 0.17]);
}

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.65, -0.08], [0, 0, 0], [0.78, 0.12, 0.16]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.37, -0.08], [0, 0, 0], [0.16, 0.48, 0.16]);
addGeometry(structureGeometries, new CylinderGeometry(0.2, 0.24, 0.14, 8), [0, 0.12, 0]);

addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [0, 0.66, 0.16], [0, 0, 0], [0.72, 0.055, 0.055]);
addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [0, 0.82, 0.16], [0, 0, 0.18], [0.42, 0.04, 0.04]);
addGeometry(signalGeometries, new BoxGeometry(1, 1, 1), [0, 0.5, 0.16], [0, 0, -0.18], [0.42, 0.04, 0.04]);
addGeometry(signalGeometries, new CylinderGeometry(0.09, 0.09, 0.12, 8), [0, 1.02, 0]);

const structureGeometry = mergeGeometries(structureGeometries, false);
const signalGeometry = mergeGeometries(signalGeometries, false);
structureGeometry.name = 'VoiceRelayStructureGeometry';
signalGeometry.name = 'VoiceRelaySignalGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#333a3b',
  metalness: 0.4,
  roughness: 0.64,
  name: 'VoiceRelayStructure',
});
const signalMaterial = new MeshStandardMaterial({
  color: '#d29a58',
  emissive: '#532d13',
  emissiveIntensity: 0.5,
  metalness: 0.14,
  roughness: 0.54,
  name: 'VoiceRelaySignal',
});

const scene = new Scene();
scene.name = 'ProjectVoiceRelayArtifact';
const structureMesh = new Mesh(structureGeometry, structureMaterial);
structureMesh.name = 'VoiceRelayStructure';
const signalMesh = new Mesh(signalGeometry, signalMaterial);
signalMesh.name = 'VoiceRelaySignal';
scene.add(structureMesh, signalMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/exhibit-project-voice-relay.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [structureGeometry, signalGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
