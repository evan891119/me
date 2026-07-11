import { useAppStore } from '../state/useAppStore';

export function CameraModeIndicator() {
  const cameraMode = useAppStore((state) => state.cameraMode);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);

  if (!isPointerLocked || isOverlayOpen) return null;

  return (
    <div className="camera-mode-indicator" aria-live="polite">
      <span>{cameraMode === 'firstPerson' ? 'First person' : 'Third person'}</span>
      <kbd>V</kbd>
      <small>Switch view</small>
    </div>
  );
}
