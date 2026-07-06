import { museumExhibits } from '../content/exhibits';
import { useAppStore } from '../state/useAppStore';

export function FocusedExhibitPrompt() {
  const focusedExhibitId = useAppStore((state) => state.focusedExhibitId);
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const exhibit = museumExhibits.find((item) => item.id === focusedExhibitId);

  if (!exhibit || isOverlayOpen) {
    return null;
  }

  return (
    <div className="focused-exhibit-prompt" aria-live="polite">
      <span>Focused exhibit</span>
      <strong>{exhibit.title}</strong>
    </div>
  );
}
