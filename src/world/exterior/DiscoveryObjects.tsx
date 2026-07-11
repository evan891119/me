import { worldDiscoveries } from '../../content/exteriorWorld';
import { worldMaterialInstances } from '../materials/worldMaterials';

function DiscoveryShape({ displayStyle }: { displayStyle: (typeof worldDiscoveries)[number]['displayStyle'] }) {
  if (displayStyle === 'signal') {
    return <octahedronGeometry args={[0.42, 0]} />;
  }

  if (displayStyle === 'cache') {
    return <boxGeometry args={[0.72, 0.72, 0.72]} />;
  }

  return <dodecahedronGeometry args={[0.42, 0]} />;
}

export function DiscoveryObjects() {
  return (
    <group>
      {worldDiscoveries.map((discovery) => {
        const { position, rotation, scale } = discovery.transform;
        const material =
          discovery.displayStyle === 'signal'
            ? worldMaterialInstances.warmAccent
            : discovery.displayStyle === 'cache'
              ? worldMaterialInstances.exhibitNoteAccent
              : worldMaterialInstances.exhibitContactAccent;

        return (
          <group
            key={discovery.id}
            position={[position.x, position.y, position.z]}
            rotation={rotation ? [rotation.x, rotation.y, rotation.z] : undefined}
            scale={scale ? [scale.x, scale.y, scale.z] : undefined}
          >
            <mesh material={material} rotation={[0.18, 0.35, 0.12]}>
              <DiscoveryShape displayStyle={discovery.displayStyle} />
            </mesh>
            <mesh position={[0, -0.48, 0]} material={worldMaterialInstances.exteriorBoundary}>
              <cylinderGeometry args={[0.42, 0.56, 0.22, 8]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
