import { CapsuleCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import {
  exteriorEntryTransition,
  exteriorSpawn,
  interiorEntrySpawn,
  interiorExitTransition,
  worldTransitions,
} from '../content/world';
import { useAppStore } from '../state/useAppStore';

const MOVE_SPEED = 3;
const CAMERA_OFFSET_Y = 0.8;
const PLAYER_START_Y = 0.9;
const PLAYER_RADIUS = 0.35;
const PLAYER_SEGMENT_HALF_HEIGHT = 0.55;
const TRANSITION_COOLDOWN_MS = 750;

const movementKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);
const devSearchParams = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null;
const qaTransition = devSearchParams?.get('qaTransition');
const isInteriorScenePreview =
  import.meta.env.DEV && (devSearchParams?.get('scene') === 'interior' || qaTransition === 'exit');
const exteriorPreviewSpawns = {
  garden: { position: { x: -9.2, y: 0.9, z: 16.2 } },
  signal: { position: { x: 8.4, y: 0.9, z: 16.0 } },
  archive: { position: { x: 0, y: 0.9, z: 25.2 } },
} as const;
const requestedExteriorPreview = import.meta.env.DEV
  ? devSearchParams?.get('spawn')
  : null;
const exteriorPreviewSpawn =
  requestedExteriorPreview && requestedExteriorPreview in exteriorPreviewSpawns
    ? exteriorPreviewSpawns[requestedExteriorPreview as keyof typeof exteriorPreviewSpawns]
    : exteriorSpawn;
const qaTransitionSpawn =
  qaTransition === 'entry'
    ? { position: exteriorEntryTransition.center }
    : qaTransition === 'exit'
      ? { position: interiorExitTransition.center }
      : null;
const initialSpawn = qaTransitionSpawn ?? (isInteriorScenePreview ? interiorEntrySpawn : exteriorPreviewSpawn);

function isInsideTransitionZone(
  position: { x: number; y: number; z: number },
  transition: (typeof worldTransitions)[number],
) {
  const { center, halfExtents } = transition;

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
  const lastTransitionAt = useRef(-Infinity);

  useEffect(() => {
    if (isInteriorScenePreview) {
      useAppStore.getState().setActiveLocation('interior');
    }
  }, []);

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

    const { activeLocationId, setActiveLocation } = useAppStore.getState();
    const matchingTransition = worldTransitions.find(
      (transition) =>
        transition.sourceLocationId === activeLocationId &&
        isInsideTransitionZone(translation, transition),
    );

    if (
      matchingTransition &&
      performance.now() - lastTransitionAt.current >= TRANSITION_COOLDOWN_MS
    ) {
      const { position } = matchingTransition.targetSpawn;
      body.setTranslation(position, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      camera.position.set(position.x, position.y + CAMERA_OFFSET_Y, position.z);
      lastTransitionAt.current = performance.now();
      setActiveLocation(matchingTransition.targetLocationId);
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
      position={[initialSpawn.position.x, PLAYER_START_Y, initialSpawn.position.z]}
      colliders={false}
      enabledRotations={[false, false, false]}
      linearDamping={8}
    >
      <CapsuleCollider args={[PLAYER_SEGMENT_HALF_HEIGHT, PLAYER_RADIUS]} />
    </RigidBody>
  );
}
