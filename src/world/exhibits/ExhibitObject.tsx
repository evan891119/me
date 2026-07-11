import { lazy, Suspense } from 'react';
import type { MuseumExhibit, Vec3 } from '../../content/types';
import { StaticBox } from '../primitives/StaticBox';
import { exhibitDisplayStyles } from './exhibitDisplayStyles';

interface ExhibitObjectProps {
  exhibit: MuseumExhibit;
}

const ExhibitModelAsset = lazy(() =>
  import('./ExhibitModelAsset').then((module) => ({ default: module.ExhibitModelAsset })),
);

function toTuple({ x, y, z }: Vec3): [number, number, number] {
  return [x, y, z];
}

export function ExhibitObject({ exhibit }: ExhibitObjectProps) {
  const { transform } = exhibit;
  const style = exhibitDisplayStyles[exhibit.displayStyle];
  const position = toTuple(transform.position);
  const rotation: [number, number, number] = transform.rotation
    ? toTuple(transform.rotation)
    : [0, 0, 0];
  const scale: [number, number, number] = transform.scale
    ? toTuple(transform.scale)
    : [1, 1, 1];
  const modelMedia = exhibit.media?.find((media) => media.type === 'model');

  return (
    <StaticBox
      position={position}
      rotation={rotation}
      scale={scale}
      token={style.baseMaterial}
      userData={{ exhibitId: exhibit.id }}
    >
      <group scale={scale}>
        {style.details.map((detail, index) => (
          <StaticBox
            key={`${exhibit.displayStyle}-detail-${index}`}
            collider={false}
            position={detail.position}
            rotation={detail.rotation}
            scale={detail.scale}
            token={detail.material === 'accent' ? style.accentMaterial : style.baseMaterial}
          />
        ))}
        {modelMedia ? (
          <Suspense fallback={null}>
            <ExhibitModelAsset key={modelMedia.src} media={modelMedia} />
          </Suspense>
        ) : null}
      </group>
    </StaticBox>
  );
}
