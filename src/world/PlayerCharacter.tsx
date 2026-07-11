import { useAnimations } from '@react-three/drei/core/useAnimations';
import { useFrame, useLoader } from '@react-three/fiber';
import { Component, useEffect, useMemo, useRef, type ErrorInfo, type ReactNode } from 'react';
import {
  LoopOnce,
  LoopRepeat,
  MathUtils,
  Object3D,
  type AnimationAction,
  type Mesh,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { PlayerVisualStateRef } from './playerVisualState';

const PLAYER_MODEL_SRC =
  import.meta.env.DEV && new URLSearchParams(window.location.search).get('qaMissingPlayer') === '1'
    ? '/assets/models/player-character.missing.glb'
    : '/assets/models/player-character.v1.glb';
const ANIMATION_FADE_SECONDS = 0.16;
const TURN_RESPONSE = 12;
const FULL_TURN = Math.PI * 2;

type AnimationName = 'Idle' | 'Jump' | 'Run' | 'Walk';

function nearestEquivalentAngle(current: number, target: number) {
  const shortestDelta = MathUtils.euclideanModulo(
    target - current + Math.PI,
    FULL_TURN,
  ) - Math.PI;
  return current + shortestDelta;
}

interface PlayerCharacterProps {
  stateRef: PlayerVisualStateRef;
  visible: boolean;
}

interface CharacterBoundaryProps {
  children: ReactNode;
  visible: boolean;
}

interface CharacterBoundaryState {
  failed: boolean;
}

class CharacterBoundary extends Component<CharacterBoundaryProps, CharacterBoundaryState> {
  state: CharacterBoundaryState = { failed: false };

  static getDerivedStateFromError(): CharacterBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Player character GLB could not load; using the visual fallback.', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    if (!this.props.visible) return null;

    return (
      <group position={[0, -0.9, 0]}>
        <mesh castShadow position={[0, 1.08, 0]}>
          <capsuleGeometry args={[0.32, 0.8, 6, 12]} />
          <meshStandardMaterial color="#293c44" roughness={0.82} />
        </mesh>
        <mesh castShadow position={[0, 1.68, 0]}>
          <sphereGeometry args={[0.25, 16, 12]} />
          <meshStandardMaterial color="#d8b08b" roughness={0.78} />
        </mesh>
      </group>
    );
  }
}

function selectAnimation(
  state: PlayerVisualStateRef['current'],
  actions: Partial<Record<AnimationName, AnimationAction | null>>,
): AnimationName {
  if (!state.grounded && Math.abs(state.verticalSpeed) > 0.35) {
    return actions.Jump ? 'Jump' : 'Idle';
  }
  if (state.horizontalSpeed < 0.08) return 'Idle';
  if (state.running && actions.Run) return 'Run';
  return actions.Walk ? 'Walk' : 'Idle';
}

function LoadedPlayerCharacter({ stateRef, visible }: PlayerCharacterProps) {
  const gltf = useLoader(GLTFLoader, PLAYER_MODEL_SRC, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  }) as GLTF;
  const root = useRef<Object3D>(null);
  const model = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const { actions, mixer } = useAnimations(gltf.animations, root);
  const currentAction = useRef<AnimationName | null>(null);
  const maxTurnArc = useRef(0);

  useEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = true;
    });
  }, [model]);

  useEffect(
    () => () => {
      mixer.stopAllAction();
    },
    [mixer],
  );

  useFrame((_, delta) => {
    if (!root.current) return;

    const currentYaw = root.current.rotation.y;
    const shortestTargetYaw = nearestEquivalentAngle(
      currentYaw,
      stateRef.current.facingYaw,
    );
    maxTurnArc.current = Math.max(
      maxTurnArc.current,
      Math.abs(shortestTargetYaw - currentYaw),
    );
    root.current.rotation.y = MathUtils.damp(
      currentYaw,
      shortestTargetYaw,
      TURN_RESPONSE,
      delta,
    );
    if (import.meta.env.DEV) {
      document
        .querySelector<HTMLElement>('main.app-shell')
        ?.setAttribute('data-player-max-turn-arc', maxTurnArc.current.toFixed(5));
    }

    const nextName = selectAnimation(stateRef.current, actions);
    if (nextName === currentAction.current) return;

    const previous = currentAction.current ? actions[currentAction.current] : null;
    const next = actions[nextName];
    previous?.fadeOut(ANIMATION_FADE_SECONDS);

    if (next) {
      next.reset();
      next.enabled = true;
      next.clampWhenFinished = nextName === 'Jump';
      next.setLoop(nextName === 'Jump' ? LoopOnce : LoopRepeat, nextName === 'Jump' ? 1 : Infinity);
      next.setEffectiveTimeScale(
        nextName === 'Walk'
          ? Math.max(0.75, stateRef.current.horizontalSpeed / 3)
          : nextName === 'Run'
            ? Math.max(0.8, stateRef.current.horizontalSpeed / 5.25)
            : 1,
      );
      next.fadeIn(ANIMATION_FADE_SECONDS).play();
    }

    currentAction.current = nextName;
    if (import.meta.env.DEV) {
      const shell = document.querySelector<HTMLElement>('main.app-shell');
      shell?.setAttribute('data-player-animation', nextName);
      const history = (shell?.dataset.playerAnimationHistory ?? '')
        .split(',')
        .filter(Boolean);
      if (history.at(-1) !== nextName) {
        history.push(nextName);
        shell?.setAttribute('data-player-animation-history', history.join(','));
      }
    }
  });

  return (
    <group ref={root} visible={visible} position={[0, -0.9, 0]}>
      <primitive object={model} dispose={null} />
    </group>
  );
}

export function PlayerCharacter(props: PlayerCharacterProps) {
  return (
    <CharacterBoundary visible={props.visible}>
      <LoadedPlayerCharacter {...props} />
    </CharacterBoundary>
  );
}
