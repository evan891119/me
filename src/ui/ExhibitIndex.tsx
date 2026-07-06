import { museumExhibits } from '../content/exhibits';
import { useAppStore } from '../state/useAppStore';

export function ExhibitIndex() {
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const openExhibit = useAppStore((state) => state.openExhibit);

  if (isOverlayOpen) {
    return null;
  }

  return (
    <aside className="exhibit-index" aria-label="Prototype exhibits">
      <p className="phase-label">Exhibits</p>
      <div className="exhibit-index__list">
        {museumExhibits.map((exhibit) => (
          <button key={exhibit.id} type="button" onClick={() => openExhibit(exhibit.id)}>
            <span>{exhibit.title}</span>
            <small>{exhibit.sectionId}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}
