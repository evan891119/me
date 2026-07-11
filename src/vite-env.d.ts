/// <reference types="vite/client" />

interface PlayerMovementQaSnapshot {
  activeLocationId: 'exterior' | 'interior';
  cameraMode: 'firstPerson' | 'thirdPerson';
  facingYaw: number;
  grounded: boolean;
  horizontalSpeed: number;
  inputCodes: string[];
  inputResetCount: number;
  jumpCount: number;
  maxHeight: number;
  maxHorizontalSpeed: number;
  position: { x: number; y: number; z: number };
  scenario: string | null;
  verticalSpeed: number;
}

interface Window {
  __PLAYER_MOVEMENT_QA__?: PlayerMovementQaSnapshot;
}
