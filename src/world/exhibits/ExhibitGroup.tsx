import { activeMuseumExhibits } from '../../content/exhibits';
import { ExhibitObject } from './ExhibitObject';

export function ExhibitGroup() {
  return (
    <>
      {activeMuseumExhibits.map((exhibit) => (
        <ExhibitObject key={exhibit.id} exhibit={exhibit} />
      ))}
    </>
  );
}
