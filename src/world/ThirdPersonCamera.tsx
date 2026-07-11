import { useFrame, useThree } from '@react-three/fiber';
import { type RapierRigidBody, useRapier } from '@react-three/rapier';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { Euler, Group, MathUtils, Vector3 } from 'three';
import type { CameraMode } from '../state/useAppStore';

const CAMERA_DISTANCE = 4;
const CAMERA_MIN_DISTANCE = 0.55;
const CAMERA_TARGET_OFFSET_Y = 0.45;
const CAMERA_COLLISION_MARGIN = 0.18;
const CAMERA_RETURN_RESPONSE = 7;
const DEFAULT_PITCH = -0.28;
const MIN_PITCH = -0.9;
const MAX_PITCH = 0.3;
const LOOK_SENSITIVITY = 0.002;
const qaSearchParams = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null;
const qaYaw = qaSearchParams?.get('qaCameraYaw') ?? null;
const qaPitch = qaSearchParams?.get('qaCameraPitch') ?? null;
const qaSpinSpeed = qaSearchParams?.get('qaCameraSpinSpeed') ?? null;

interface ThirdPersonCameraProps {
  cameraMode: CameraMode;
  renderAnchor: RefObject<Group | null>;
  rigidBody: RefObject<RapierRigidBody | null>;
}

export function ThirdPersonCamera({ cameraMode, renderAnchor, rigidBody }: ThirdPersonCameraProps) {
  const camera = useThree((state) => state.camera);
  const { rapier, world } = useRapier();
  const yaw = useRef(0);
  const pitch = useRef(DEFAULT_PITCH);
  const wasActive = useRef(false);
  const target = useRef(new Vector3());
  const visualAnchorPosition = useRef(new Vector3());
  const projectedAnchor = useRef(new Vector3());
  const previousTarget = useRef(new Vector3());
  const offset = useRef(new Vector3());
  const desiredPosition = useRef(new Vector3());
  const currentDistance = useRef(CAMERA_DISTANCE);
  const cameraDirection = useRef(new Vector3());
  const orbitEuler = useRef(new Euler(0, 0, 0, 'YXZ'));
  const teleportSnapCount = useRef(0);
  const unobstructedMinDistance = useRef(CAMERA_DISTANCE);
  const maxHorizontalScreenError = useRef(0);
  const cameraRay = useMemo(
    () => new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }),
    [rapier],
  );

  useEffect(() => {
    if (cameraMode !== 'thirdPerson') return;

    camera.getWorldDirection(cameraDirection.current);
    yaw.current = Math.atan2(cameraDirection.current.x, -cameraDirection.current.z);
    pitch.current = MathUtils.clamp(
      Math.asin(MathUtils.clamp(cameraDirection.current.y, -1, 1)),
      MIN_PITCH,
      MAX_PITCH,
    );
    if (import.meta.env.DEV && qaYaw !== null && Number.isFinite(Number(qaYaw))) {
      yaw.current = Number(qaYaw);
    }
    if (import.meta.env.DEV && qaPitch !== null && Number.isFinite(Number(qaPitch))) {
      pitch.current = MathUtils.clamp(Number(qaPitch), MIN_PITCH, MAX_PITCH);
    }
  }, [camera, cameraMode]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cameraMode !== 'thirdPerson' || document.pointerLockElement === null) return;
      yaw.current -= event.movementX * LOOK_SENSITIVITY;
      pitch.current = MathUtils.clamp(
        pitch.current - event.movementY * LOOK_SENSITIVITY,
        MIN_PITCH,
        MAX_PITCH,
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cameraMode]);

  useFrame((_, delta) => {
    const body = rigidBody.current;
    const anchor = renderAnchor.current;
    if (cameraMode !== 'thirdPerson' || !body || !anchor) {
      wasActive.current = false;
      return;
    }

    anchor.updateWorldMatrix(true, false);
    anchor.getWorldPosition(visualAnchorPosition.current);
    target.current.copy(visualAnchorPosition.current);
    target.current.y += CAMERA_TARGET_OFFSET_Y;
    const teleported = wasActive.current && target.current.distanceTo(previousTarget.current) > 2;
    if (import.meta.env.DEV && qaSpinSpeed !== null && Number.isFinite(Number(qaSpinSpeed))) {
      yaw.current += Number(qaSpinSpeed) * delta;
    }
    orbitEuler.current.set(pitch.current, yaw.current, 0);
    offset.current.set(0, 0, CAMERA_DISTANCE).applyEuler(orbitEuler.current);
    const idealDistance = offset.current.length();
    offset.current.normalize();
    cameraRay.origin.x = target.current.x;
    cameraRay.origin.y = target.current.y;
    cameraRay.origin.z = target.current.z;
    cameraRay.dir.x = offset.current.x;
    cameraRay.dir.y = offset.current.y;
    cameraRay.dir.z = offset.current.z;

    const hit = world.castRayAndGetNormal(
      cameraRay,
      idealDistance,
      true,
      undefined,
      undefined,
      undefined,
      body,
    );
    const collisionDistance = hit
      ? Math.max(CAMERA_MIN_DISTANCE, hit.timeOfImpact - CAMERA_COLLISION_MARGIN)
      : idealDistance;
    if (!wasActive.current || teleported) {
      currentDistance.current = collisionDistance;
      if (teleported) teleportSnapCount.current += 1;
      wasActive.current = true;
    } else if (collisionDistance < currentDistance.current) {
      currentDistance.current = collisionDistance;
    } else {
      currentDistance.current = MathUtils.damp(
        currentDistance.current,
        collisionDistance,
        CAMERA_RETURN_RESPONSE,
        Math.min(delta, 0.1),
      );
    }
    desiredPosition.current
      .copy(target.current)
      .addScaledVector(offset.current, currentDistance.current);
    camera.position.copy(desiredPosition.current);
    camera.lookAt(target.current);
    camera.updateMatrixWorld();
    projectedAnchor.current.copy(visualAnchorPosition.current).project(camera);
    maxHorizontalScreenError.current = Math.max(
      maxHorizontalScreenError.current,
      Math.abs(projectedAnchor.current.x),
    );
    previousTarget.current.copy(target.current);
    if (!hit) {
      unobstructedMinDistance.current = Math.min(
        unobstructedMinDistance.current,
        camera.position.distanceTo(target.current),
      );
    }

    if (import.meta.env.DEV) {
      const shell = document.querySelector<HTMLElement>('main.app-shell');
      shell?.setAttribute('data-camera-mode', cameraMode);
      shell?.setAttribute('data-camera-target-source', 'render-anchor');
      shell?.setAttribute('data-camera-distance', camera.position.distanceTo(target.current).toFixed(3));
      shell?.setAttribute('data-camera-occluded', String(hit !== null));
      shell?.setAttribute('data-camera-yaw', yaw.current.toFixed(3));
      shell?.setAttribute('data-camera-pitch', pitch.current.toFixed(3));
      shell?.setAttribute('data-camera-teleport-snaps', String(teleportSnapCount.current));
      shell?.setAttribute(
        'data-camera-unobstructed-min-distance',
        unobstructedMinDistance.current.toFixed(3),
      );
      shell?.setAttribute(
        'data-camera-max-horizontal-screen-error',
        maxHorizontalScreenError.current.toFixed(5),
      );
    }
  });

  return null;
}
