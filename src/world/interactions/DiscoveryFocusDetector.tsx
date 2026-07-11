import { useFrame, useThree } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { worldDiscoveries } from '../../content/exteriorWorld';
import { useAppStore } from '../../state/useAppStore';
import { playerWorldPosition } from '../playerVisualState';

const FOCUS_DOT_THRESHOLD = 0.76;
const FOCUS_DISTANCE_PADDING = 0.3;
const TARGET_SURFACE_TOLERANCE = 0.85;

const discoveryTargets = worldDiscoveries.map((discovery) => ({
  discovery,
  position: new Vector3(
    discovery.transform.position.x,
    discovery.transform.position.y,
    discovery.transform.position.z,
  ),
}));

export function DiscoveryFocusDetector() {
  const camera = useThree((state) => state.camera);
  const { rapier, world } = useRapier();
  const setFocusedContentId = useAppStore((state) => state.setFocusedContentId);
  const lastFocusedId = useRef<string | null>(null);
  const cameraDirection = useRef(new Vector3());
  const toDiscovery = useRef(new Vector3());
  const playerToDiscovery = useRef(new Vector3());
  const sightRay = useMemo(
    () => new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }),
    [rapier],
  );

  useFrame(() => {
    const { activeLocationId, isOverlayOpen, isPointerLocked } = useAppStore.getState();

    if (activeLocationId !== 'exterior' || !isPointerLocked || isOverlayOpen) {
      if (lastFocusedId.current !== null) {
        lastFocusedId.current = null;
        setFocusedContentId(null);
      }
      return;
    }

    camera.getWorldDirection(cameraDirection.current);
    cameraDirection.current.y = 0;
    cameraDirection.current.normalize();

    let nextFocusedId: string | null = null;
    let bestScore = -Infinity;

    for (const { discovery, position } of discoveryTargets) {
      playerToDiscovery.current.copy(position).sub(playerWorldPosition);
      playerToDiscovery.current.y = 0;
      const distance = playerToDiscovery.current.length();
      const maxDistance = discovery.interactionRadius + FOCUS_DISTANCE_PADDING;

      if (distance === 0 || distance > maxDistance) {
        continue;
      }

      toDiscovery.current.copy(position).sub(camera.position);
      const sightDistance = toDiscovery.current.length();
      toDiscovery.current.normalize();
      sightRay.origin.x = camera.position.x;
      sightRay.origin.y = camera.position.y;
      sightRay.origin.z = camera.position.z;
      sightRay.dir.x = toDiscovery.current.x;
      sightRay.dir.y = toDiscovery.current.y;
      sightRay.dir.z = toDiscovery.current.z;
      const sightHit = world.castRay(
        sightRay,
        sightDistance,
        true,
        rapier.QueryFilterFlags.EXCLUDE_DYNAMIC,
      );
      if (sightHit && sightHit.timeOfImpact < sightDistance - TARGET_SURFACE_TOLERANCE) {
        continue;
      }

      toDiscovery.current.copy(position).sub(camera.position);
      toDiscovery.current.y = 0;
      toDiscovery.current.normalize();
      const facingScore = cameraDirection.current.dot(toDiscovery.current);
      if (facingScore < FOCUS_DOT_THRESHOLD) {
        continue;
      }

      const score = facingScore * 2 + (1 - distance / maxDistance);
      if (score > bestScore) {
        bestScore = score;
        nextFocusedId = discovery.id;
      }
    }

    if (lastFocusedId.current !== nextFocusedId) {
      lastFocusedId.current = nextFocusedId;
      setFocusedContentId(nextFocusedId);
    }
  });

  return null;
}
