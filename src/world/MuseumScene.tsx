import { SceneLighting } from './lighting';

type Vec3 = [number, number, number];

interface WallSpec {
  id: string;
  position: Vec3;
  scale: Vec3;
}

const wallSpecs: WallSpec[] = [
  { id: 'back-wall', position: [0, 1.5, -4], scale: [9, 3, 0.25] },
  { id: 'left-wall', position: [-4.5, 1.5, 0], scale: [0.25, 3, 8] },
  { id: 'right-wall', position: [4.5, 1.5, 0], scale: [0.25, 3, 8] },
  { id: 'entry-header', position: [0, 2.7, 3.85], scale: [9, 0.6, 0.25] },
];

const exhibitSpecs: WallSpec[] = [
  { id: 'center-plinth', position: [0, 0.45, -0.4], scale: [1.4, 0.9, 1.4] },
  { id: 'left-plinth', position: [-2.6, 0.35, -2.4], scale: [1, 0.7, 1] },
  { id: 'right-plinth', position: [2.6, 0.35, -2.4], scale: [1, 0.7, 1] },
];

const wallPanelSpecs: WallSpec[] = [
  { id: 'center-panel', position: [0, 1.7, -3.86], scale: [2.7, 1.1, 0.08] },
  { id: 'left-panel', position: [-2.8, 1.55, -3.85], scale: [1.3, 0.85, 0.08] },
  { id: 'right-panel', position: [2.8, 1.55, -3.85], scale: [1.3, 0.85, 0.08] },
];

export function MuseumScene() {
  return (
    <>
      <color attach="background" args={['#15181a']} />
      <fog attach="fog" args={['#15181a', 10, 22]} />
      <SceneLighting />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2a2a27" roughness={0.92} />
      </mesh>

      {wallSpecs.map((wall) => (
        <mesh key={wall.id} position={wall.position} scale={wall.scale}>
          <boxGeometry />
          <meshStandardMaterial color="#3a3730" roughness={0.86} />
        </mesh>
      ))}

      {exhibitSpecs.map((exhibit) => (
        <mesh key={exhibit.id} position={exhibit.position} scale={exhibit.scale}>
          <boxGeometry />
          <meshStandardMaterial color="#77624c" roughness={0.72} />
        </mesh>
      ))}

      {wallPanelSpecs.map((panel) => (
        <mesh key={panel.id} position={panel.position} scale={panel.scale}>
          <boxGeometry />
          <meshStandardMaterial color="#c9a46d" roughness={0.64} />
        </mesh>
      ))}
    </>
  );
}
