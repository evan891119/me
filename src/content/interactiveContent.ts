import { activeMuseumExhibits } from './exhibits';
import { worldDiscoveries } from './exteriorWorld';
import type { ExhibitLink, ExhibitMedia, MuseumExhibit, WorldDiscovery } from './types';

export interface InteractiveContentItem {
  id: string;
  kind: 'exhibit' | 'discovery';
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  tags: string[];
  links?: ExhibitLink[];
  media?: ExhibitMedia[];
}

function exhibitContent(exhibit: MuseumExhibit): InteractiveContentItem {
  return {
    id: exhibit.id,
    kind: 'exhibit',
    eyebrow: exhibit.sectionId,
    title: exhibit.title,
    summary: exhibit.summary,
    body: exhibit.body,
    tags: exhibit.tags,
    links: exhibit.links,
    media: exhibit.media,
  };
}

function discoveryContent(discovery: WorldDiscovery): InteractiveContentItem {
  return {
    id: discovery.id,
    kind: 'discovery',
    eyebrow: discovery.zoneId.replaceAll('-', ' '),
    title: discovery.title,
    summary: discovery.summary,
    body: discovery.body,
    tags: discovery.tags,
    links: discovery.links,
  };
}

export const interactiveContent = [
  ...activeMuseumExhibits.map(exhibitContent),
  ...worldDiscoveries.map(discoveryContent),
];

export function findInteractiveContent(id: string | null) {
  return interactiveContent.find((item) => item.id === id);
}
