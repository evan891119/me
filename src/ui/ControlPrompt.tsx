import { useAppStore } from '../state/useAppStore';

export function ControlPrompt() {
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const canUsePointerLock =
    typeof HTMLCanvasElement !== 'undefined' &&
    'requestPointerLock' in HTMLCanvasElement.prototype;

  if (isPointerLocked) {
    return (
      <div className="control-strip" aria-live="polite">
        WASD move · Mouse look · Esc exit
      </div>
    );
  }

  if (!canUsePointerLock) {
    return (
      <section className="enter-world-panel" aria-labelledby="pointer-lock-unavailable-title">
        <div>
          <p className="phase-label">Fallback</p>
          <h2 id="pointer-lock-unavailable-title">Pointer lock unavailable</h2>
          <p>Open this site in a desktop browser with keyboard and mouse support.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="enter-world-panel" aria-labelledby="enter-world-title">
      <div>
        <p className="phase-label">Controls</p>
        <h2 id="enter-world-title">Enter the museum</h2>
        <p>Use keyboard and mouse. Movement is intentionally slow for comfort.</p>
      </div>
      <button id="enter-world-button" type="button">
        Click to enter
      </button>
    </section>
  );
}
