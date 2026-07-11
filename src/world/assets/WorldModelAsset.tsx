import { useLoader } from '@react-three/fiber';
import { Component, useMemo, type ErrorInfo, type ReactNode } from 'react';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { ExteriorModelAsset } from '../../content/exteriorWorld';

interface WorldModelAssetProps {
  asset: ExteriorModelAsset;
  fallback: ReactNode;
}

interface AssetBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  src: string;
}

interface AssetBoundaryState {
  failed: boolean;
}

class AssetBoundary extends Component<AssetBoundaryProps, AssetBoundaryState> {
  state: AssetBoundaryState = { failed: false };

  static getDerivedStateFromError(): AssetBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`World model could not load: ${this.props.src}`, error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function LoadedWorldModel({ asset }: Pick<WorldModelAssetProps, 'asset'>) {
  const { scene } = useLoader(GLTFLoader, asset.src, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={model}
      position={asset.position}
      rotation={asset.rotation}
      scale={asset.scale}
      dispose={null}
      userData={{ assetAlt: asset.alt }}
    />
  );
}

export function WorldModelAsset({ asset, fallback }: WorldModelAssetProps) {
  return (
    <AssetBoundary key={asset.src} src={asset.src} fallback={fallback}>
      <LoadedWorldModel asset={asset} />
    </AssetBoundary>
  );
}
