import { create } from 'zustand';

export interface PerformanceMetrics {
  assetTransferBytes: number;
  calls: number;
  fps: number;
  frameTimeMs: number;
  lines: number;
  points: number;
  triangles: number;
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  setMetrics: (metrics: PerformanceMetrics) => void;
}

export const initialPerformanceMetrics: PerformanceMetrics = {
  assetTransferBytes: 0,
  calls: 0,
  fps: 0,
  frameTimeMs: 0,
  lines: 0,
  points: 0,
  triangles: 0,
};

export const usePerformanceStore = create<PerformanceState>((set) => ({
  metrics: initialPerformanceMetrics,
  setMetrics: (metrics) => set({ metrics }),
}));
