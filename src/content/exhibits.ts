import type { MuseumExhibit } from './types';

export const museumExhibits: MuseumExhibit[] = [
  {
    id: 'welcome-console',
    title: 'Welcome Console',
    sectionId: 'lobby',
    summary: 'A short orientation exhibit for the first minute of the museum.',
    body: [
      'This prototype starts with a compact lobby, conservative movement, and readable interaction surfaces.',
      'Final personal copy is intentionally deferred until the first content inventory is decided.',
    ],
    tags: ['orientation', 'prototype'],
    displayStyle: 'welcome',
    transform: {
      position: { x: 0, y: 1.05, z: -3.35 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 2.4, y: 1.1, z: 0.2 },
    },
    interactionRadius: 2.2,
    relatedExhibitIds: ['project-plinth', 'contact-terminal'],
  },
  {
    id: 'background-timeline',
    title: 'Background Timeline',
    sectionId: 'background',
    summary: 'A placeholder for the story arc behind the work.',
    body: [
      'This exhibit will summarize background, current focus, and the transitions that matter.',
      'It should stay concise enough to read inside an overlay without breaking the exploration flow.',
    ],
    tags: ['background', 'timeline'],
    displayStyle: 'timeline',
    transform: {
      position: { x: -2.7, y: 0.95, z: -2.25 },
      rotation: { x: 0, y: 0.2, z: 0 },
      scale: { x: 1.2, y: 0.9, z: 0.8 },
    },
    interactionRadius: 1.8,
  },
  {
    id: 'project-plinth',
    title: 'Selected Project Plinth',
    sectionId: 'projects',
    summary: 'A prototype slot for one featured project case study.',
    body: [
      'Project exhibits should explain the problem, the role, the stack, and what changed because of the work.',
      'The first real project list is still undecided, so this seed stays intentionally generic.',
    ],
    tags: ['project', 'case-study'],
    displayStyle: 'project',
    transform: {
      position: { x: 0, y: 0.95, z: -0.4 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1.4, y: 0.9, z: 1.4 },
    },
    interactionRadius: 1.9,
    links: [
      {
        href: 'https://github.com/',
        kind: 'repository',
        label: 'Repository placeholder',
      },
    ],
  },
  {
    id: 'skills-workbench',
    title: 'Skills Workbench',
    sectionId: 'skills',
    summary: 'A compact exhibit for capabilities connected to actual work.',
    body: [
      'The skills area should avoid a generic keyword wall.',
      'Each skill cluster should connect back to projects, tools, or decisions visible elsewhere in the museum.',
    ],
    tags: ['skills', 'engineering', 'product'],
    displayStyle: 'skill',
    transform: {
      position: { x: 2.7, y: 0.95, z: -2.25 },
      rotation: { x: 0, y: -0.2, z: 0 },
      scale: { x: 1.2, y: 0.9, z: 0.8 },
    },
    interactionRadius: 1.8,
  },
  {
    id: 'contact-terminal',
    title: 'Contact Terminal',
    sectionId: 'contact',
    summary: 'A clear endpoint for contacting or following up.',
    body: [
      'This exhibit should eventually hold the real contact path and selected profile links.',
      'It should remain easy to find from the lobby and from the end of the museum path.',
    ],
    tags: ['contact', 'exit'],
    displayStyle: 'contact',
    transform: {
      position: { x: 0, y: 1.05, z: 2.75 },
      rotation: { x: 0, y: Math.PI, z: 0 },
      scale: { x: 1.6, y: 1.0, z: 0.4 },
    },
    interactionRadius: 2,
    links: [
      {
        href: 'mailto:hello@example.com',
        kind: 'email',
        label: 'Email placeholder',
      },
    ],
    relatedExhibitIds: ['welcome-console'],
  },
];
