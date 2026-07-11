import { useFrame, useThree } from '@react-three/fiber';
import { useRapier } from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { activeMuseumExhibits } from '../../content/exhibits';
import type { MuseumExhibit } from '../../content/types';
import { useAppStore } from '../../state/useAppStore';
import { playerWorldPosition } from '../playerVisualState';

const FOCUS_DOT_THRESHOLD = 0.78;
const FOCUS_DISTANCE_PADDING = 0.25;
const TARGET_SURFACE_TOLERANCE = 0.85;

function exhibitPosition(exhibit: MuseumExhibit): Vector3 {
  const { position } = exhibit.transform;
  return new Vector3(position.x, position.y, position.z);
}

const exhibitTargets = activeMuseumExhibits.map((exhibit) => ({
  exhibit,
  position: exhibitPosition(exhibit),
}));

export function ExhibitFocusDetector() {
  const camera = useThree((state) => state.camera);
  const { rapier, world } = useRapier();
  const setFocusedContentId = useAppStore((state) => state.setFocusedContentId);
  const lastFocusedId = useRef<string | null>(null);
  const cameraDirection = useRef(new Vector3());
  const toExhibit = useRef(new Vector3());
  const playerToExhibit = useRef(new Vector3());
  const sightRay = useMemo(
    () => new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }),
    [rapier],
  );

  useFrame(() => {
    const { activeLocationId, isOverlayOpen, isPointerLocked } = useAppStore.getState();

    if (activeLocationId !== 'interior' || !isPointerLocked || isOverlayOpen) {
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

    for (const { exhibit, position } of exhibitTargets) {
      playerToExhibit.current.copy(position).sub(playerWorldPosition);
      playerToExhibit.current.y = 0;
      const distance = playerToExhibit.current.length();
      const maxDistance = exhibit.interactionRadius + FOCUS_DISTANCE_PADDING;

      if (distance === 0 || distance > maxDistance) {
        continue;
      }

      toExhibit.current.copy(position).sub(camera.position);
      const sightDistance = toExhibit.current.length();
      toExhibit.current.normalize();
      sightRay.origin.x = camera.position.x;
      sightRay.origin.y = camera.position.y;
      sightRay.origin.z = camera.position.z;
      sightRay.dir.x = toExhibit.current.x;
      sightRay.dir.y = toExhibit.current.y;
      sightRay.dir.z = toExhibit.current.z;
      const sightHit = world.castRay(
        sightRay,
        sightDistance,
        true,
        rapier.QueryFilterFlags.EXCLUDE_DYNAMIC,
      );
      if (sightHit && sightHit.timeOfImpact < sightDistance - TARGET_SURFACE_TOLERANCE) {
        continue;
      }

      toExhibit.current.copy(position).sub(camera.position);
      toExhibit.current.y = 0;
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
      setFocusedContentId(nextFocusedId);
    }
  });

  return null;
}
