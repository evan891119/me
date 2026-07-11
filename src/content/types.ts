export type MuseumSectionId =
  | 'lobby'
  | 'background'
  | 'projects'
  | 'skills'
  | 'ideas'
  | 'contact';

export type ExhibitDisplayStyle =
  | 'welcome'
  | 'project'
  | 'skill'
  | 'timeline'
  | 'note'
  | 'contact';

export type ExhibitLinkKind = 'website' | 'repository' | 'profile' | 'email' | 'document';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Transform {
  position: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
}

export interface ExhibitLink {
  href: string;
  kind: ExhibitLinkKind;
  label: string;
}

export interface ExhibitMedia {
  alt: string;
  src: string;
  transform?: Transform;
  type: 'image' | 'model' | 'video';
}

export interface MuseumSection {
  id: MuseumSectionId;
  title: string;
  description: string;
}

export interface MuseumMetadata {
  phaseLabel: string;
  title: string;
  summary: string;
}

export interface MuseumExhibit {
  id: string;
  enabled?: boolean;
  title: string;
  sectionId: MuseumSectionId;
  summary: string;
  body: string[];
  tags: string[];
  displayStyle: ExhibitDisplayStyle;
  transform: Transform;
  interactionRadius: number;
  links?: ExhibitLink[];
  media?: ExhibitMedia[];
  relatedExhibitIds?: string[];
}

export type ExteriorZoneId =
  | 'arrival-plaza'
  | 'west-garden'
  | 'east-signal-yard'
  | 'south-archive-grove';

export type DiscoveryDisplayStyle = 'memory' | 'signal' | 'cache';

export interface WorldDiscovery {
  id: string;
  title: string;
  zoneId: ExteriorZoneId;
  summary: string;
  body: string[];
  tags: string[];
  displayStyle: DiscoveryDisplayStyle;
  transform: Transform;
  interactionRadius: number;
  links?: ExhibitLink[];
}
