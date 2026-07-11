import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { worldDiscoveries } from '../../content/exteriorWorld';
import { useAppStore } from '../../state/useAppStore';

const FOCUS_DOT_THRESHOLD = 0.76;
const FOCUS_DISTANCE_PADDING = 0.3;

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
  const setFocusedContentId = useAppStore((state) => state.setFocusedContentId);
  const lastFocusedId = useRef<string | null>(null);
  const cameraDirection = useRef(new Vector3());
  const toDiscovery = useRef(new Vector3());

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
      toDiscovery.current.copy(position).sub(camera.position);
      toDiscovery.current.y = 0;
      const distance = toDiscovery.current.length();
      const maxDistance = discovery.interactionRadius + FOCUS_DISTANCE_PADDING;

      if (distance === 0 || distance > maxDistance) {
        continue;
      }

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
