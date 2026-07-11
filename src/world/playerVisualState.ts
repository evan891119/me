import type { MutableRefObject } from 'react';
import { Vector3 } from 'three';

export interface PlayerVisualState {
  facingYaw: number;
  grounded: boolean;
  horizontalSpeed: number;
  running: boolean;
  verticalSpeed: number;
}

export type PlayerVisualStateRef = MutableRefObject<PlayerVisualState>;

export const initialPlayerVisualState: PlayerVisualState = {
  facingYaw: Math.PI,
  grounded: true,
  horizontalSpeed: 0,
  running: false,
  verticalSpeed: 0,
};

// One player exists in the museum. Interaction detectors read this mutable vector
// without forcing a React or Zustand update every animation frame.
export const playerWorldPosition = new Vector3();
