import { useLoader } from '@react-three/fiber';
import { Component, useMemo, type ErrorInfo, type ReactNode } from 'react';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { ExhibitMedia, Vec3 } from '../../content/types';

interface ExhibitModelAssetProps {
  media: ExhibitMedia;
}

interface ModelAssetBoundaryProps {
  children: ReactNode;
  src: string;
}

interface ModelAssetBoundaryState {
  failed: boolean;
}

const defaultPosition: [number, number, number] = [0, 0.58, 0];
const defaultRotation: [number, number, number] = [0, 0, 0];
const defaultScale: [number, number, number] = [0.45, 0.45, 0.45];

function toTuple(value: Vec3 | undefined, fallback: [number, number, number]) {
  return value ? ([value.x, value.y, value.z] as [number, number, number]) : fallback;
}

class ModelAssetBoundary extends Component<ModelAssetBoundaryProps, ModelAssetBoundaryState> {
  state: ModelAssetBoundaryState = { failed: false };

  static getDerivedStateFromError(): ModelAssetBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`Exhibit model could not load: ${this.props.src}`, error, info.componentStack);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function LoadedExhibitModel({ media }: ExhibitModelAssetProps) {
  const { scene } = useLoader(GLTFLoader, media.src, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const model = useMemo(() => scene.clone(true), [scene]);
  const position = toTuple(media.transform?.position, defaultPosition);
  const rotation = toTuple(media.transform?.rotation, defaultRotation);
  const scale = toTuple(media.transform?.scale, defaultScale);

  return (
    <primitive
      object={model}
      position={position}
      rotation={rotation}
      scale={scale}
      dispose={null}
    />
  );
}

export function ExhibitModelAsset({ media }: ExhibitModelAssetProps) {
  return (
    <ModelAssetBoundary src={media.src}>
      <LoadedExhibitModel media={media} />
    </ModelAssetBoundary>
  );
}
