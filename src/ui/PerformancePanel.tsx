import { usePerformanceStore } from '../state/usePerformanceStore';

function formatBytes(bytes: number) {
  if (bytes <= 0) {
    return 'n/a';
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatNumber(value: number) {
  return Math.round(value).toLocaleString('en-US');
}

export function PerformancePanel() {
  const metrics = usePerformanceStore((state) => state.metrics);

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <aside className="performance-panel" aria-label="Development performance metrics">
      <p className="phase-label">Performance</p>
      <dl>
        <div>
          <dt>FPS</dt>
          <dd>{formatNumber(metrics.fps)}</dd>
        </div>
        <div>
          <dt>Frame</dt>
          <dd>{metrics.frameTimeMs.toFixed(1)} ms</dd>
        </div>
        <div>
          <dt>Calls</dt>
          <dd>{formatNumber(metrics.calls)}</dd>
        </div>
        <div>
          <dt>Triangles</dt>
          <dd>{formatNumber(metrics.triangles)}</dd>
        </div>
        <div>
          <dt>Lines</dt>
          <dd>{formatNumber(metrics.lines)}</dd>
        </div>
        <div>
          <dt>Points</dt>
          <dd>{formatNumber(metrics.points)}</dd>
        </div>
        <div>
          <dt>Transfer</dt>
          <dd>{formatBytes(metrics.assetTransferBytes)}</dd>
        </div>
      </dl>
    </aside>
  );
}
