import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import {
  exteriorEntryTransition,
  exteriorSpawn,
  interiorEntrySpawn,
  interiorExitTransition,
  worldTransitions,
} from '../content/world';
import { interiorPreviews } from '../content/interiorLayout';
import { useAppStore } from '../state/useAppStore';
import {
  calculateHorizontalVelocity,
  controlledKeyCodes,
  GROUND_PROBE_DISTANCE,
  GROUND_PROBE_OFFSET,
  GROUNDED_MAX_UPWARD_SPEED,
  JUMP_VELOCITY,
  readMovementInput,
  type MovementInput,
} from './playerMovement';

const CAMERA_OFFSET_Y = 0.8;
const PLAYER_START_Y = 0.9;
const PLAYER_RADIUS = 0.35;
const PLAYER_SEGMENT_HALF_HEIGHT = 0.55;
const TRANSITION_COOLDOWN_MS = 750;

const devSearchParams = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null;
const qaTransition = devSearchParams?.get('qaTransition');
const requestedScenePreview = devSearchParams?.get('scene');
const requestedMovementQa = import.meta.env.DEV
  ? (devSearchParams?.get('qaMovement') ?? null)
  : null;
const idleMovementInput: MovementInput = {
  backward: false,
  forward: false,
  left: false,
  right: false,
  running: false,
};
const requestedInteriorPreview =
  requestedScenePreview && requestedScenePreview in interiorPreviews
    ? interiorPreviews[requestedScenePreview as keyof typeof interiorPreviews]
    : null;
const isInteriorScenePreview =
  import.meta.env.DEV && (requestedInteriorPreview !== null || qaTransition === 'exit');
const exteriorPreviewSpawns = {
  garden: { position: { x: -8.4, y: 0.9, z: 17.4 } },
  signal: { position: { x: 7.4, y: 0.9, z: 18.0 } },
  archive: { position: { x: 0, y: 0.9, z: 25.2 } },
  nicheGarden: { position: { x: -11.3, y: 0.9, z: 8.1 } },
  nicheSignal: { position: { x: 10.6, y: 0.9, z: 7.1 } },
  nicheArchive: { position: { x: 3.1, y: 0.9, z: 20.9 } },
  entrySteps: { position: { x: 0, y: 0.9, z: 8.4 } },
} as const;
const exteriorPreviewYaws: Partial<Record<keyof typeof exteriorPreviewSpawns, number>> = {
  garden: 0.32,
  signal: -0.28,
  nicheGarden: Math.PI / 2,
  nicheSignal: -Math.PI / 2,
  nicheArchive: 2.38,
};
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
const interiorPreviewSpawn = requestedInteriorPreview
  ? {
      position: {
        x: requestedInteriorPreview.position[0],
        y: requestedInteriorPreview.position[1],
        z: requestedInteriorPreview.position[2],
      },
    }
  : interiorEntrySpawn;
const initialSpawn = qaTransitionSpawn ?? (isInteriorScenePreview ? interiorPreviewSpawn : exteriorPreviewSpawn);

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
  const { rapier, world } = useRapier();
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const rigidBody = useRef<RapierRigidBody>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const up = useRef(new Vector3(0, 1, 0));
  const lastTransitionAt = useRef(-Infinity);
  const jumpQueued = useRef(false);
  const jumpHeld = useRef(false);
  const grounded = useRef(false);
  const jumpCount = useRef(0);
  const inputResetCount = useRef(0);
  const qaStartedAt = useRef<number | null>(null);
  const qaJumpStarted = useRef(false);
  const qaSecondJumpQueued = useRef(false);
  const qaStartHeight = useRef(PLAYER_START_Y);
  const qaMaxHeight = useRef(PLAYER_START_Y);
  const qaMaxHorizontalSpeed = useRef(0);
  const groundRays = useMemo(
    () =>
      [
        [0, 0],
        [GROUND_PROBE_OFFSET, 0],
        [-GROUND_PROBE_OFFSET, 0],
        [0, GROUND_PROBE_OFFSET],
        [0, -GROUND_PROBE_OFFSET],
      ].map(
        ([x, z]) =>
          new rapier.Ray(
            { x, y: PLAYER_START_Y, z },
            { x: 0, y: -1, z: 0 },
          ),
      ),
    [rapier],
  );

  const resetInput = useCallback(() => {
    keysPressed.current.clear();
    jumpQueued.current = false;
    jumpHeld.current = false;
    inputResetCount.current += 1;
  }, []);

  useEffect(() => {
    if (isInteriorScenePreview) {
      useAppStore.getState().setActiveLocation('interior');
    }

    if (requestedInteriorPreview) {
      camera.rotation.set(0, requestedInteriorPreview.yaw, 0);
    }

    if (requestedExteriorPreview && requestedExteriorPreview in exteriorPreviewYaws) {
      camera.rotation.set(
        0,
        exteriorPreviewYaws[requestedExteriorPreview as keyof typeof exteriorPreviewYaws] ?? 0,
        0,
      );
    }
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!controlledKeyCodes.has(event.code)) {
        return;
      }

      const { isOverlayOpen: overlayOpen, isPointerLocked: pointerLocked } =
        useAppStore.getState();
      if (!pointerLocked || overlayOpen) return;

      if (event.code === 'Space') {
        event.preventDefault();
        if (!event.repeat && !jumpHeld.current) jumpQueued.current = true;
        jumpHeld.current = true;
        return;
      }

      keysPressed.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!controlledKeyCodes.has(event.code)) return;
      if (event.code === 'Space') jumpHeld.current = false;
      keysPressed.current.delete(event.code);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') resetInput();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', resetInput);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', resetInput);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resetInput();
    };
  }, [resetInput]);

  useEffect(() => {
    if (!isPointerLocked || isOverlayOpen) {
      resetInput();
    }
  }, [isOverlayOpen, isPointerLocked, resetInput]);

  useFrame(() => {
    const body = rigidBody.current;

    if (!body) {
      return;
    }

    const translation = body.translation();
    const currentVelocity = body.linvel();
    camera.position.set(translation.x, translation.y + CAMERA_OFFSET_Y, translation.z);

    grounded.current = false;
    if (currentVelocity.y <= GROUNDED_MAX_UPWARD_SPEED) {
      for (const ray of groundRays) {
        ray.origin.x = translation.x + ray.origin.x;
        ray.origin.y = translation.y;
        ray.origin.z = translation.z + ray.origin.z;
        const hit = world.castRayAndGetNormal(
          ray,
          GROUND_PROBE_DISTANCE,
          true,
          undefined,
          undefined,
          undefined,
          body,
        );
        ray.origin.x -= translation.x;
        ray.origin.z -= translation.z;

        if (hit && hit.normal.y >= 0.6) {
          grounded.current = true;
          break;
        }
      }
    }

    if (import.meta.env.DEV && requestedMovementQa) {
      const now = performance.now();
      qaStartedAt.current ??= now;
      const elapsed = now - qaStartedAt.current;

      if (
        ['walk', 'run', 'diagonal'].includes(requestedMovementQa) &&
        elapsed < 700
      ) {
        keysPressed.current.add('KeyW');
        if (requestedMovementQa === 'run') keysPressed.current.add('ShiftLeft');
        if (requestedMovementQa === 'diagonal') keysPressed.current.add('KeyD');
      } else if (['walk', 'run', 'diagonal'].includes(requestedMovementQa)) {
        keysPressed.current.clear();
      }

      if (
        ['jump', 'jumpForward', 'holdJump', 'doubleJump', 'repeatJump'].includes(
          requestedMovementQa,
        ) &&
        grounded.current &&
        !qaJumpStarted.current &&
        elapsed > 100
      ) {
        qaJumpStarted.current = true;
        qaStartHeight.current = translation.y;
        qaMaxHeight.current = translation.y;
        jumpQueued.current = true;
        jumpHeld.current = requestedMovementQa === 'holdJump';
      }

      if (requestedMovementQa === 'jumpForward' && elapsed < 1000) {
        keysPressed.current.add('KeyW');
      } else if (requestedMovementQa === 'jumpForward') {
        keysPressed.current.delete('KeyW');
      }

      if (
        requestedMovementQa === 'doubleJump' &&
        qaJumpStarted.current &&
        !qaSecondJumpQueued.current &&
        translation.y > qaStartHeight.current + 0.25
      ) {
        qaSecondJumpQueued.current = true;
        jumpQueued.current = true;
      }

      if (
        requestedMovementQa === 'repeatJump' &&
        jumpCount.current === 1 &&
        grounded.current &&
        !qaSecondJumpQueued.current &&
        elapsed > 500
      ) {
        qaSecondJumpQueued.current = true;
        jumpQueued.current = true;
      }

      if (requestedMovementQa === 'reset' && elapsed < 150) {
        keysPressed.current.add('KeyW');
        keysPressed.current.add('ShiftLeft');
        jumpQueued.current = true;
      } else if (requestedMovementQa === 'reset' && elapsed >= 150 && keysPressed.current.size > 0) {
        resetInput();
      }
    }

    qaMaxHeight.current = Math.max(qaMaxHeight.current, translation.y);

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
      grounded.current = false;
      resetInput();
      setActiveLocation(matchingTransition.targetLocationId);
      return;
    }

    const controlsEnabled = isPointerLocked && !isOverlayOpen;

    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();

    right.current.copy(forward.current).cross(up.current).normalize();
    const movementInput = readMovementInput(keysPressed.current);
    calculateHorizontalVelocity(
      controlsEnabled ? movementInput : idleMovementInput,
      forward.current,
      right.current,
      velocity.current,
      grounded.current,
    );

    let verticalSpeed = currentVelocity.y;
    if (controlsEnabled && jumpQueued.current) {
      jumpQueued.current = false;
      if (grounded.current) {
        verticalSpeed = JUMP_VELOCITY;
        grounded.current = false;
        jumpCount.current += 1;
      }
    } else if (!controlsEnabled) {
      jumpQueued.current = false;
    }

    body.setLinvel(
      { x: velocity.current.x, y: verticalSpeed, z: velocity.current.z },
      true,
    );

    if (import.meta.env.DEV) {
      qaMaxHorizontalSpeed.current = Math.max(
        qaMaxHorizontalSpeed.current,
        Math.hypot(velocity.current.x, velocity.current.z),
      );
      const qaSnapshot: PlayerMovementQaSnapshot = {
        activeLocationId,
        grounded: grounded.current,
        horizontalSpeed: Math.hypot(velocity.current.x, velocity.current.z),
        inputCodes: [...keysPressed.current].sort(),
        inputResetCount: inputResetCount.current,
        jumpCount: jumpCount.current,
        maxHeight: qaMaxHeight.current - qaStartHeight.current,
        maxHorizontalSpeed: qaMaxHorizontalSpeed.current,
        position: { x: translation.x, y: translation.y, z: translation.z },
        scenario: requestedMovementQa,
        verticalSpeed,
      };
      window.__PLAYER_MOVEMENT_QA__ = qaSnapshot;
      document
        .querySelector('main.app-shell')
        ?.setAttribute('data-movement-qa', JSON.stringify(qaSnapshot));
    }
  });

  return (
    <RigidBody
      ref={rigidBody}
      type="dynamic"
      position={[initialSpawn.position.x, PLAYER_START_Y, initialSpawn.position.z]}
      colliders={false}
      enabledRotations={[false, false, false]}
      ccd
      linearDamping={0}
    >
      <CapsuleCollider
        args={[PLAYER_SEGMENT_HALF_HEIGHT, PLAYER_RADIUS]}
        friction={0}
      />
    </RigidBody>
  );
}
