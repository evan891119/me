import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useAppStore } from '../state/useAppStore';

const MOVE_SPEED = 3;
const PLAYER_HEIGHT = 1.7;

const movementKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

export function PlayerController() {
  const camera = useThree((state) => state.camera);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const keysPressed = useRef<Set<string>>(new Set());
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const movement = useRef(new Vector3());
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

  useFrame((_, delta) => {
    if (!isPointerLocked || isOverlayOpen || keysPressed.current.size === 0) {
      return;
    }

    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();

    right.current.copy(forward.current).cross(up.current).normalize();
    movement.current.set(0, 0, 0);

    if (keysPressed.current.has('KeyW')) {
      movement.current.add(forward.current);
    }

    if (keysPressed.current.has('KeyS')) {
      movement.current.sub(forward.current);
    }

    if (keysPressed.current.has('KeyD')) {
      movement.current.add(right.current);
    }

    if (keysPressed.current.has('KeyA')) {
      movement.current.sub(right.current);
    }

    if (movement.current.lengthSq() === 0) {
      return;
    }

    movement.current.normalize().multiplyScalar(MOVE_SPEED * delta);
    camera.position.add(movement.current);
    camera.position.y = PLAYER_HEIGHT;
  });

  return null;
}
