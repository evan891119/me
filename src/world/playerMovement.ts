import type { Vector3 } from 'three';

export const WALK_SPEED = 3;
export const RUN_SPEED = 5.25;
export const AIR_CONTROL_FACTOR = 0.72;
export const JUMP_VELOCITY = 4.45;
export const GRAVITY_Y = -9.81;
export const GROUND_PROBE_DISTANCE = 0.98;
export const GROUND_PROBE_OFFSET = 0.18;
export const GROUNDED_MAX_UPWARD_SPEED = 0.15;

export const movementKeyCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);
export const controlledKeyCodes = new Set([
  ...movementKeyCodes,
  'ShiftLeft',
  'ShiftRight',
  'Space',
]);

export interface MovementInput {
  backward: boolean;
  forward: boolean;
  left: boolean;
  right: boolean;
  running: boolean;
}

export function readMovementInput(keys: ReadonlySet<string>): MovementInput {
  return {
    backward: keys.has('KeyS'),
    forward: keys.has('KeyW'),
    left: keys.has('KeyA'),
    right: keys.has('KeyD'),
    running: keys.has('ShiftLeft') || keys.has('ShiftRight'),
  };
}

export function calculateHorizontalVelocity(
  input: MovementInput,
  forward: Vector3,
  right: Vector3,
  target: Vector3,
  grounded: boolean,
) {
  target.set(0, 0, 0);

  if (input.forward) target.add(forward);
  if (input.backward) target.sub(forward);
  if (input.right) target.add(right);
  if (input.left) target.sub(right);

  if (target.lengthSq() === 0) {
    return target;
  }

  const speed = input.running ? RUN_SPEED : WALK_SPEED;
  return target.normalize().multiplyScalar(grounded ? speed : speed * AIR_CONTROL_FACTOR);
}
