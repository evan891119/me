import { museumSections } from './content/museum';

export function App() {
  return (
    <main className="app-shell">
      <section className="intro-panel" aria-labelledby="site-title">
        <p className="phase-label">Phase 1 Bootstrap</p>
        <h1 id="site-title">First-Person Portfolio Museum</h1>
        <p>
          A clean Vite + React + TypeScript foundation for the upcoming 3D
          museum prototype.
        </p>
      </section>

      <section className="status-panel" aria-label="Planned museum sections">
        {museumSections.map((section) => (
          <article key={section.id}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
