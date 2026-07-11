import { useEffect, type PointerEvent } from 'react';
import { findInteractiveContent } from '../content/interactiveContent';
import { useAppStore } from '../state/useAppStore';
import { requestMuseumPointerLock } from '../world/pointerLockEvents';

export function ExhibitOverlay() {
  const selectedContentId = useAppStore((state) => state.selectedContentId);
  const closeContent = useAppStore((state) => state.closeContent);
  const shouldResumePointerLockOnClose = useAppStore(
    (state) => state.shouldResumePointerLockOnClose,
  );
  const content = findInteractiveContent(selectedContentId);

  const handlePointerClose = () => {
    if (!shouldResumePointerLockOnClose) {
      closeContent();
      return;
    }

    closeContent(true);
    const pointerLockRequest = requestMuseumPointerLock();
    void pointerLockRequest?.catch(() => {
      useAppStore.getState().setPointerLocked(false);
    });
  };

  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handlePointerClose();
    }
  };

  useEffect(() => {
    if (!content) {
      return;
    }

    document.exitPointerLock?.();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeContent, content]);

  if (!content) {
    return null;
  }

  return (
    <div
      className="exhibit-overlay-backdrop"
      onPointerDown={handleBackdropPointerDown}
    >
      <section
        className="exhibit-overlay"
        aria-labelledby="exhibit-overlay-title"
        aria-modal="true"
        role="dialog"
      >
        <div className="exhibit-overlay__header">
          <div>
            <p className="phase-label">{content.eyebrow}</p>
            <h2 id="exhibit-overlay-title">{content.title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={handlePointerClose} aria-label="Close exhibit">
            X
          </button>
        </div>

        <p className="exhibit-overlay__summary">{content.summary}</p>

        <div className="exhibit-overlay__body">
          {content.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {content.media && content.media.length > 0 ? (
          <div className="exhibit-media" aria-label="Exhibit media">
            {content.media.map((media) => {
              if (media.type === 'image') {
                return <img key={media.src} src={media.src} alt={media.alt} loading="lazy" />;
              }

              if (media.type === 'video') {
                return (
                  <video key={media.src} controls preload="metadata" aria-label={media.alt}>
                    <source src={media.src} />
                  </video>
                );
              }

              return (
                <p className="exhibit-media__model-note" key={media.src}>
                  {media.alt}
                </p>
              );
            })}
          </div>
        ) : null}

        <div className="tag-row" aria-label="Tags">
          {content.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {content.links && content.links.length > 0 ? (
          <div className="link-list" aria-label="Links">
            {content.links.map((link) => (
              <a key={`${link.kind}-${link.href}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
