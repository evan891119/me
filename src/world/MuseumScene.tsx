import { PointerLockControls } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { useAppStore } from '../state/useAppStore';
import { ExhibitGroup } from './exhibits/ExhibitGroup';
import { SceneLighting } from './lighting';
import { PlayerController } from './PlayerController';

type Vec3 = [number, number, number];

interface WallSpec {
  id: string;
  color: string;
  position: Vec3;
  roughness: number;
  scale: Vec3;
}

const wallSpecs: WallSpec[] = [
  { id: 'back-wall', color: '#3a3730', position: [0, 1.5, -4], roughness: 0.86, scale: [9, 3, 0.25] },
  { id: 'left-wall', color: '#3a3730', position: [-4.5, 1.5, 0], roughness: 0.86, scale: [0.25, 3, 8] },
  { id: 'right-wall', color: '#3a3730', position: [4.5, 1.5, 0], roughness: 0.86, scale: [0.25, 3, 8] },
  { id: 'entry-header', color: '#3a3730', position: [0, 2.7, 3.85], roughness: 0.86, scale: [9, 0.6, 0.25] },
];

function PhysicsBox({ color, position, roughness, scale }: WallSpec) {
  return (
    <RigidBody type="fixed" position={position} colliders={false}>
      <CuboidCollider args={[scale[0] / 2, scale[1] / 2, scale[2] / 2]} />
      <mesh scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>
    </RigidBody>
  );
}

export function MuseumScene() {
  const setPointerLocked = useAppStore((state) => state.setPointerLocked);

  return (
    <>
      <color attach="background" args={['#15181a']} />
      <fog attach="fog" args={['#15181a', 10, 22]} />
      <SceneLighting />
      <PointerLockControls
        onLock={() => setPointerLocked(true)}
        onUnlock={() => setPointerLocked(false)}
      />

      <Physics gravity={[0, 0, 0]}>
        <PlayerController />

        <RigidBody type="fixed" position={[0, -0.05, 0]} colliders={false}>
          <CuboidCollider args={[6, 0.05, 6]} />
          <mesh scale={[12, 0.1, 12]} receiveShadow>
            <boxGeometry />
            <meshStandardMaterial color="#2a2a27" roughness={0.92} />
          </mesh>
        </RigidBody>

        {wallSpecs.map((wall) => (
          <PhysicsBox key={wall.id} {...wall} />
        ))}

        <ExhibitGroup />
      </Physics>
    </>
  );
}
