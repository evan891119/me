import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { museumExhibits } from '../../content/exhibits';
import type { MuseumExhibit } from '../../content/types';
import { useAppStore } from '../../state/useAppStore';

const FOCUS_DOT_THRESHOLD = 0.78;
const FOCUS_DISTANCE_PADDING = 0.25;

function exhibitPosition(exhibit: MuseumExhibit): Vector3 {
  const { position } = exhibit.transform;
  return new Vector3(position.x, position.y, position.z);
}

const exhibitTargets = museumExhibits.map((exhibit) => ({
  exhibit,
  position: exhibitPosition(exhibit),
}));

export function ExhibitFocusDetector() {
  const camera = useThree((state) => state.camera);
  const setFocusedExhibitId = useAppStore((state) => state.setFocusedExhibitId);
  const lastFocusedId = useRef<string | null>(null);
  const cameraDirection = useRef(new Vector3());
  const toExhibit = useRef(new Vector3());

  useFrame(() => {
    const { isOverlayOpen, isPointerLocked } = useAppStore.getState();

    if (!isPointerLocked || isOverlayOpen) {
      if (lastFocusedId.current !== null) {
        lastFocusedId.current = null;
        setFocusedExhibitId(null);
      }

      return;
    }

    camera.getWorldDirection(cameraDirection.current);
    cameraDirection.current.y = 0;
    cameraDirection.current.normalize();

    let nextFocusedId: string | null = null;
    let bestScore = -Infinity;

    for (const { exhibit, position } of exhibitTargets) {
      toExhibit.current.copy(position).sub(camera.position);
      toExhibit.current.y = 0;

      const distance = toExhibit.current.length();
      const maxDistance = exhibit.interactionRadius + FOCUS_DISTANCE_PADDING;

      if (distance === 0 || distance > maxDistance) {
        continue;
      }

      toExhibit.current.normalize();
      const facingScore = cameraDirection.current.dot(toExhibit.current);

      if (facingScore < FOCUS_DOT_THRESHOLD) {
        continue;
      }

      const proximityScore = 1 - distance / maxDistance;
      const score = facingScore * 2 + proximityScore;

      if (score > bestScore) {
        bestScore = score;
        nextFocusedId = exhibit.id;
      }
    }

    if (lastFocusedId.current !== nextFocusedId) {
      lastFocusedId.current = nextFocusedId;
      setFocusedExhibitId(nextFocusedId);
    }
  });

  return null;
}
