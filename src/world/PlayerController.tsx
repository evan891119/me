import { CapsuleCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { exteriorEntryTransition, exteriorSpawn } from '../content/world';
import { useAppStore } from '../state/useAppStore';

const MOVE_SPEED = 3;
const CAMERA_OFFSET_Y = 0.8;
const PLAYER_START_Y = 0.9;
const PLAYER_RADIUS = 0.35;
const PLAYER_SEGMENT_HALF_HEIGHT = 0.55;

const movementKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

function isInsideExteriorEntryZone(position: { x: number; y: number; z: number }) {
  const { center, halfExtents } = exteriorEntryTransition;

  return (
    Math.abs(position.x - center.x) <= halfExtents.x &&
    Math.abs(position.y - center.y) <= halfExtents.y &&
    Math.abs(position.z - center.z) <= halfExtents.z
  );
}

export function PlayerController() {
  const camera = useThree((state) => state.camera);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const rigidBody = useRef<RapierRigidBody>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const up = useRef(new Vector3(0, 1, 0));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (movementKeys.has(event.code)) {
        keysPressed.current.add(event.code);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (movementKeys.has(event.code)) {
        keysPressed.current.delete(event.code);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isPointerLocked || isOverlayOpen) {
      keysPressed.current.clear();
    }
  }, [isOverlayOpen, isPointerLocked]);

  useFrame(() => {
    const body = rigidBody.current;

    if (!body) {
      return;
    }

    const translation = body.translation();
    camera.position.set(translation.x, translation.y + CAMERA_OFFSET_Y, translation.z);

    const { activeLocationId, enterInterior } = useAppStore.getState();

    if (activeLocationId === 'exterior' && isInsideExteriorEntryZone(translation)) {
      const { position } = exteriorEntryTransition.targetSpawn;
      body.setTranslation(position, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      camera.position.set(position.x, position.y + CAMERA_OFFSET_Y, position.z);
      enterInterior();
      return;
    }

    if (!isPointerLocked || isOverlayOpen || keysPressed.current.size === 0) {
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();

    right.current.copy(forward.current).cross(up.current).normalize();
    velocity.current.set(0, 0, 0);

    if (keysPressed.current.has('KeyW')) {
      velocity.current.add(forward.current);
    }

    if (keysPressed.current.has('KeyS')) {
      velocity.current.sub(forward.current);
    }

    if (keysPressed.current.has('KeyD')) {
      velocity.current.add(right.current);
    }

    if (keysPressed.current.has('KeyA')) {
      velocity.current.sub(right.current);
    }

    if (velocity.current.lengthSq() === 0) {
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    velocity.current.normalize().multiplyScalar(MOVE_SPEED);
    body.setLinvel(
      { x: velocity.current.x, y: 0, z: velocity.current.z },
      true,
    );
  });

  return (
    <RigidBody
      ref={rigidBody}
      type="dynamic"
      position={[exteriorSpawn.position.x, PLAYER_START_Y, exteriorSpawn.position.z]}
      colliders={false}
      enabledRotations={[false, false, false]}
      linearDamping={8}
    >
      <CapsuleCollider args={[PLAYER_SEGMENT_HALF_HEIGHT, PLAYER_RADIUS]} />
    </RigidBody>
  );
}
