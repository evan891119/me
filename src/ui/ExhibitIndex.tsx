import { activeMuseumExhibits } from '../content/exhibits';
import { useAppStore } from '../state/useAppStore';

export function ExhibitIndex() {
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const isPointerLocked = useAppStore((state) => state.isPointerLocked);
  const openContent = useAppStore((state) => state.openContent);

  if (isOverlayOpen || isPointerLocked) {
    return null;
  }

  return (
    <aside className="exhibit-index" aria-label="Museum exhibits">
      <p className="phase-label">Exhibits</p>
      <div className="exhibit-index__list">
        {activeMuseumExhibits.map((exhibit) => (
          <button key={exhibit.id} type="button" onClick={() => openContent(exhibit.id)}>
            <span>{exhibit.title}</span>
            <small>{exhibit.sectionId}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}
