import { useEffect } from 'react';
import { museumExhibits } from '../content/exhibits';
import { useAppStore } from '../state/useAppStore';

export function InteractionPrompt() {
  const focusedExhibitId = useAppStore((state) => state.focusedExhibitId);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const openExhibit = useAppStore((state) => state.openExhibit);
  const exhibit = museumExhibits.find((item) => item.id === focusedExhibitId);

  useEffect(() => {
    if (!focusedExhibitId || isOverlayOpen || !isPointerLocked) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || event.repeat) {
        return;
      }

      event.preventDefault();
      document.exitPointerLock?.();
      openExhibit(focusedExhibitId);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedExhibitId, isOverlayOpen, isPointerLocked, openExhibit]);

  if (!exhibit || isOverlayOpen || !isPointerLocked) {
    return null;
  }

  return (
    <div className="interaction-prompt" aria-live="polite">
      <span>Focused exhibit</span>
      <strong>{exhibit.title}</strong>
      <kbd>E</kbd>
    </div>
  );
}
