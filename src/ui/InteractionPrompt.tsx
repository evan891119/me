import { useEffect } from 'react';
import { findInteractiveContent } from '../content/interactiveContent';
import { useAppStore } from '../state/useAppStore';

export function InteractionPrompt() {
  const focusedContentId = useAppStore((state) => state.focusedContentId);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const openContent = useAppStore((state) => state.openContent);
  const content = findInteractiveContent(focusedContentId);

  useEffect(() => {
    if (!focusedContentId || isOverlayOpen || !isPointerLocked) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || event.repeat) {
        return;
      }

      event.preventDefault();
      document.exitPointerLock?.();
      openContent(focusedContentId);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedContentId, isOverlayOpen, isPointerLocked, openContent]);

  if (!content || isOverlayOpen || !isPointerLocked) {
    return null;
  }

  return (
    <div className="interaction-prompt" aria-live="polite">
      <span>{content.kind === 'discovery' ? 'Discovery nearby' : 'Focused exhibit'}</span>
      <strong>{content.title}</strong>
      <kbd>E</kbd>
    </div>
  );
}
