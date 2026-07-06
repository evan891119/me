import type { MuseumMetadata, MuseumSection } from './types';

export const museumMetadata: MuseumMetadata = {
  phaseLabel: 'Phase 3.2',
  title: 'First-Person Portfolio Museum',
  summary: 'Prototype exhibits now render from typed content data.',
};

export const museumSections: MuseumSection[] = [
  {
    id: 'lobby',
    title: 'Lobby',
    description: 'Orientation, movement affordance, and first impression.',
  },
  {
    id: 'background',
    title: 'Background Gallery',
    description: 'A compact introduction to background, focus, and values.',
  },
  {
    id: 'projects',
    title: 'Projects Gallery',
    description: 'Selected projects as explorable exhibits.',
  },
  {
    id: 'skills',
    title: 'Skills Workshop',
    description: 'Capabilities connected to concrete work.',
  },
  {
    id: 'ideas',
    title: 'Ideas Room',
    description: 'Notes, principles, and technical opinions.',
  },
  {
    id: 'contact',
    title: 'Contact Exit',
    description: 'Clear contact path and final call to action.',
  },
];
