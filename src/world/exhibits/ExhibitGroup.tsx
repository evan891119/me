import { museumExhibits } from '../../content/exhibits';
import { ExhibitObject } from './ExhibitObject';

export function ExhibitGroup() {
  return (
    <>
      {museumExhibits.map((exhibit) => (
        <ExhibitObject key={exhibit.id} exhibit={exhibit} />
      ))}
    </>
  );
}
