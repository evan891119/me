import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { usePerformanceStore } from '../../state/usePerformanceStore';

const SAMPLE_INTERVAL_MS = 500;

function assetTransferBytes() {
  if (typeof performance === 'undefined') {
    return 0;
  }

  return performance
    .getEntriesByType('resource')
    .filter((entry): entry is PerformanceResourceTiming => 'transferSize' in entry)
    .reduce((total, entry) => total + entry.transferSize, 0);
}

export function PerformanceMonitor() {
  const gl = useThree((state) => state.gl);
  const setMetrics = usePerformanceStore((state) => state.setMetrics);
  const frameCount = useRef(0);
  const frameTimeTotal = useRef(0);
  const lastSampleAt = useRef(0);

  useFrame((_, delta) => {
    const now = performance.now();

    if (lastSampleAt.current === 0) {
      lastSampleAt.current = now;
      return;
    }

    frameCount.current += 1;
    frameTimeTotal.current += delta * 1000;

    const elapsedMs = now - lastSampleAt.current;

    if (elapsedMs < SAMPLE_INTERVAL_MS) {
      return;
    }

    const frames = frameCount.current;
    const renderInfo = gl.info.render;

    setMetrics({
      assetTransferBytes: assetTransferBytes(),
      calls: renderInfo.calls,
      fps: Math.round((frames * 1000) / elapsedMs),
      frameTimeMs: frameTimeTotal.current / frames,
      lines: renderInfo.lines,
      points: renderInfo.points,
      triangles: renderInfo.triangles,
    });

    frameCount.current = 0;
    frameTimeTotal.current = 0;
    lastSampleAt.current = now;
  });

  return null;
}
