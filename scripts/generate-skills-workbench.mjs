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

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.08, 0], [0, 0, 0], [1.72, 0.16, 0.78]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 0.69, -0.31], [0, 0, 0], [1.76, 1.02, 0.12]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [-0.68, 0.31, 0], [0, 0, 0], [0.12, 0.5, 0.58]);
addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0.68, 0.31, 0], [0, 0, 0], [0.12, 0.5, 0.58]);

for (const x of [-0.56, 0, 0.56]) {
  addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [x, 0.68, -0.18], [0, 0, 0], [0.38, 0.62, 0.24]);
  addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [x, 0.72, -0.045], [0, 0, 0], [0.25, 0.32, 0.035]);
  addGeometry(accentGeometries, new CylinderGeometry(0.055, 0.055, 0.06, 8), [x, 0.48, -0.015], [Math.PI / 2, 0, 0]);
}

addGeometry(structureGeometries, new BoxGeometry(1, 1, 1), [0, 1.23, -0.22], [0, 0, 0], [1.52, 0.12, 0.18]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0, 1.24, -0.105], [0, 0, 0], [1.14, 0.045, 0.035]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0, 0.19, 0.4], [0, 0, 0], [0.88, 0.055, 0.06]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [-0.44, 0.2, 0.4], [0, 0, 0.2], [0.24, 0.04, 0.04]);
addGeometry(accentGeometries, new BoxGeometry(1, 1, 1), [0.44, 0.2, 0.4], [0, 0, -0.2], [0.24, 0.04, 0.04]);

const structureGeometry = mergeGeometries(structureGeometries, false);
const accentGeometry = mergeGeometries(accentGeometries, false);
structureGeometry.name = 'SkillsWorkbenchStructureGeometry';
accentGeometry.name = 'SkillsWorkbenchAccentGeometry';

const structureMaterial = new MeshStandardMaterial({
  color: '#35403b',
  metalness: 0.26,
  roughness: 0.7,
  name: 'SkillsWorkbenchStructure',
});
const accentMaterial = new MeshStandardMaterial({
  color: '#a8b879',
  emissive: '#34451f',
  emissiveIntensity: 0.38,
  metalness: 0.08,
  roughness: 0.58,
  name: 'SkillsWorkbenchAccent',
});

const scene = new Scene();
scene.name = 'SkillsWorkbenchArtifact';
const structureMesh = new Mesh(structureGeometry, structureMaterial);
structureMesh.name = 'SkillsWorkbenchStructure';
const accentMesh = new Mesh(accentGeometry, accentMaterial);
accentMesh.name = 'SkillsWorkbenchAccent';
scene.add(structureMesh, accentMesh);

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  truncateDrawRange: true,
});

const outputPath = new URL('../public/assets/models/exhibit-skills-workbench.v1.glb', import.meta.url);
await writeFile(outputPath, new Uint8Array(glb));

const triangleCount = [structureGeometry, accentGeometry].reduce((total, geometry) => {
  const indexCount = geometry.index?.count ?? geometry.attributes.position.count;
  return total + indexCount / 3;
}, 0);

console.log(`Generated ${outputPath.pathname}`);
console.log(`Meshes: 2, materials: 2, triangles: ${triangleCount}, bytes: ${glb.byteLength}`);
