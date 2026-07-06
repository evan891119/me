import { museumExhibits } from '../content/exhibits';
import { museumMetadata } from '../content/museum';

interface FallbackViewProps {
  reason: 'canvas-error' | 'webgl-unavailable';
}

const contactExhibit = museumExhibits.find((exhibit) => exhibit.sectionId === 'contact');

export function FallbackView({ reason }: FallbackViewProps) {
  const title =
    reason === 'webgl-unavailable'
      ? '3D museum unavailable'
      : '3D museum could not start';

  return (
    <main className="fallback-shell">
      <section className="fallback-panel" aria-labelledby="fallback-title">
        <p className="phase-label">{museumMetadata.phaseLabel}</p>
        <h1 id="fallback-title">{title}</h1>
        <p>
          This portfolio is built as a desktop first-person WebGL experience.
          Open it in a desktop browser with hardware acceleration enabled.
        </p>
        <p>
          The contact path remains available here while the 3D scene is not running.
        </p>

        {contactExhibit ? (
          <div className="fallback-contact" aria-label="Contact">
            <h2>{contactExhibit.title}</h2>
            <p>{contactExhibit.summary}</p>
            {contactExhibit.links && contactExhibit.links.length > 0 ? (
              <div className="link-list">
                {contactExhibit.links.map((link) => (
                  <a key={`${link.kind}-${link.href}`} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
