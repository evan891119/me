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

const frameGeometries = [];
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

addGeometry(frameGeometries, new CylinderGeometry(0.82, 0.94, 0.18, 10), [0, 0.09, 0]);
addGeometry(frameGeometries, new CylinderGeometry(0.58, 0.68, 0.12, 10), [0, 0.23, 0]);

for (const x of [-0.66, 0.66]) {
  addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [x, 0.62, 0], [0, 0, x < 0 ? -0.14 : 0.14], [0.14, 0.92, 0.18]);
  addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [x, 0.26, 0.38], [0, 0, x < 0 ? -0.08 : 0.08], [0.18, 0.42, 0.18]);
}

addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [0, 1.07, -0.02], [0, 0, 0], [1.48, 0.12, 0.2]);
addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [0, 0.37, -0.36], [-0.12, 0, 0], [1.24, 0.12, 0.16]);
addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [-0.38, 0.78, -0.3], [0, 0, -0.28], [0.1, 0.68, 0.12]);
addGeometry(frameGeometries, new BoxGeometry(1, 1, 1), [0.38, 0.78, -0.3], [0, 0, 0.28], [0.1, 0.68, 0.12]);

addGeometry(accentGeometries, new TorusGeometry(0.58, 0.05, 6, 16), [0, 0.7, 0.08]);
addGeometry(accentGeometries, new TorusGeometry(0.38, 0.035, 6, 14), [0, 0.7, 0.13]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [-0.67, 0.62, 0.11], [0, 0, -0.14], [0.045, 0.52, 0.045]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0.67, 0.62, 0.11], [0, 0, 0.14], [0.045, 0.52, 0.045]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0, 1.08, 0.13], [0, 0, 0], [0.5, 0.045, 0.045]);
addGeometry(accentGeometries, new CylinderGeometry(0.1, 0.1, 0.12, 8), [0, 1.24, 0]);

const frameGeometry = mergeGeometries(frameGeometries, false);
const accentGeometry = mergeGeometries(accentGeometries, false);
frameGeometry.name = 'ArchiveCoreFrameGeometry';
accentGeometry.name = 'ArchiveCoreAccentGeometry';

const frameMaterial = new MeshStandardMaterial({
  color: '#303836',
  metalness: 0.34,
  roughness: 0.7,
  name: 'ArchiveCoreFrame',
});
const accentMaterial = new MeshStandardMaterial({
  color: '#b9a26f',
  emissive: '#4b3b1c',
  emissiveIntensity: 0.42,
  metalness: 0.1,
  roughness: 0.6,
  name: 'ArchiveCoreAccent',
});

const scene = new Scene();
scene.name = 'ArchiveCoreLandmark';
const frameMesh = new Mesh(frameGeometry, frameMaterial);
frameMesh.name = 'ArchiveCoreFrame';
const accentMesh = new Mesh(accentGeometry, accentMaterial);
accentMesh.name = 'ArchiveCoreAccent';
scene.add(frameMesh, accentMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/landmark-archive-core.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [frameGeometry, accentGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
