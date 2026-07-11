import { useAppStore } from '../state/useAppStore';

export function ControlPrompt() {
  const hasEnteredWorld = useAppStore((state) => state.hasEnteredWorld);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const canUsePointerLock =
    typeof HTMLCanvasElement !== 'undefined' &&
    'requestPointerLock' in HTMLCanvasElement.prototype;

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

  if (isPointerLocked || isOverlayOpen) {
    return null;
  }

  return (
    <section className="enter-world-panel" aria-labelledby="enter-world-title">
      <div>
        <p className="phase-label">{hasEnteredWorld ? 'Paused' : 'Controls'}</p>
        <h2 id="enter-world-title">
          {hasEnteredWorld ? 'Resume world' : 'Enter the world'}
        </h2>
        <p>
          {hasEnteredWorld
            ? 'Click to return to first-person controls.'
            : 'Use keyboard and mouse. Movement is intentionally slow for comfort.'}
        </p>
      </div>
      <button id="enter-world-button" type="button">
        {hasEnteredWorld ? 'Click to resume' : 'Click to enter'}
      </button>
    </section>
  );
}
