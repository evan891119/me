import { useEffect } from 'react';
import { museumExhibits } from '../content/exhibits';
import { useAppStore } from '../state/useAppStore';

export function ExhibitOverlay() {
  const selectedExhibitId = useAppStore((state) => state.selectedExhibitId);
  const closeExhibit = useAppStore((state) => state.closeExhibit);
  const exhibit = museumExhibits.find((item) => item.id === selectedExhibitId);

  useEffect(() => {
    if (!exhibit) {
      return;
    }

    document.exitPointerLock?.();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeExhibit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeExhibit, exhibit]);

  if (!exhibit) {
    return null;
  }

  return (
    <section
      className="exhibit-overlay"
      aria-labelledby="exhibit-overlay-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="exhibit-overlay__header">
        <div>
          <p className="phase-label">{exhibit.sectionId}</p>
          <h2 id="exhibit-overlay-title">{exhibit.title}</h2>
        </div>
        <button className="icon-button" type="button" onClick={closeExhibit} aria-label="Close exhibit">
          X
        </button>
      </div>

      <p className="exhibit-overlay__summary">{exhibit.summary}</p>

      <div className="exhibit-overlay__body">
        {exhibit.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {exhibit.media ? (
        <div className="media-placeholder" aria-label="Media placeholder">
          {exhibit.media.length} media item{exhibit.media.length === 1 ? '' : 's'} planned
        </div>
      ) : (
        <div className="media-placeholder" aria-label="Media placeholder">
          Media slot
        </div>
      )}

      <div className="tag-row" aria-label="Tags">
        {exhibit.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {exhibit.links && exhibit.links.length > 0 ? (
        <div className="link-list" aria-label="Links">
          {exhibit.links.map((link) => (
            <a key={`${link.kind}-${link.href}`} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
