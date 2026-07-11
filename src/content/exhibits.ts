import type { MuseumExhibit } from './types';
import { interiorExhibitTransforms } from './interiorLayout';

export const museumExhibits: MuseumExhibit[] = [
  {
    id: 'welcome-console',
    title: 'Welcome Console',
    sectionId: 'lobby',
    summary: 'A short orientation exhibit for the first minute of the museum.',
    body: [
      'This museum is a compact map of my work: projects at the center, background and skills along the galleries, and contact near the exit.',
      'Explore at your own pace. When an exhibit comes into focus, press E to open its full story.',
    ],
    tags: ['orientation', 'museum'],
    displayStyle: 'welcome',
    transform: interiorExhibitTransforms['welcome-console'],
    interactionRadius: 2.2,
    media: [
      {
        type: 'model',
        src: '/assets/models/exhibit-welcome-console.v1.glb',
        alt: 'Low-poly museum orientation console with a route map',
        transform: {
          position: { x: 0, y: -0.2, z: 0.7 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
        },
      },
    ],
    relatedExhibitIds: ['project-plinth', 'contact-terminal'],
  },
  {
    id: 'background-timeline',
    enabled: false,
    title: 'Background Timeline',
    sectionId: 'background',
    summary: 'The approach and priorities behind the work shown in this museum.',
    body: [
      'I approach projects by starting with the real constraint, building the smallest useful version, and improving it through testing and observation.',
      'The work shown here focuses on engineering decisions, maintainable systems, and products that can be operated after the first release.',
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
    title: 'discord-voice-relay-bot',
    sectionId: 'projects',
    summary: 'A self-hosted Discord voice relay bot for bridging voice channels across separate servers.',
    body: [
      'Problem: Discord communities often need to talk across separate servers without moving everyone into the same Discord server or exposing a public hosted service.',
      'Role: I built a self-hosted Discord voice relay bot that lets communities bridge voice channels across different Discord servers using Discord-native slash commands and short-lived pairing codes.',
      'Stack: Node.js, npm workspaces, discord.js, @discordjs/voice, modular packages for bridge core, Discord adapter, local config, and local state storage. The project also includes Docker Compose support and JSON lifecycle/recovery logging.',
      'Outcome: The MVP supports /bridge create, /bridge join <code>, /bridge status, and /bridge leave, with bidirectional voice forwarding, multi-speaker mixing, automatic cleanup when channels empty, multiple simultaneous bridge pairs, basic reconnect handling, and experimental opt-in three-endpoint group bridges.',
    ],
    tags: ['discord', 'voice', 'node.js', 'self-hosted'],
    displayStyle: 'project',
    transform: interiorExhibitTransforms['project-plinth'],
    interactionRadius: 1.9,
    media: [
      {
        type: 'model',
        src: '/assets/models/exhibit-project-voice-relay.v1.glb',
        alt: 'Low-poly dual-node voice relay artifact',
        transform: {
          position: { x: 0, y: 0.68, z: 0 },
          scale: { x: 0.55, y: 0.55, z: 0.55 },
        },
      },
    ],
    links: [
      {
        href: 'https://github.com/evan891119/discord-voice-relay-bot',
        kind: 'repository',
        label: 'Repository',
      },
    ],
  },
  {
    id: 'skills-workbench',
    title: 'Skills Workbench',
    sectionId: 'skills',
    summary: 'A compact exhibit for capabilities connected to actual work.',
    body: [
      'My work spans product structure, frontend implementation, Node.js services, deployment, and the operational details that keep software usable.',
      'I value clear boundaries, measured performance, and tools that make the next change easier instead of more fragile.',
    ],
    tags: ['skills', 'engineering', 'product'],
    displayStyle: 'skill',
    transform: interiorExhibitTransforms['skills-workbench'],
    interactionRadius: 1.8,
    media: [
      {
        type: 'model',
        src: '/assets/models/exhibit-skills-workbench.v1.glb',
        alt: 'Low-poly modular skills workbench artifact',
        transform: {
          position: { x: 0, y: 0.7, z: 0 },
          scale: { x: 0.5, y: 0.5, z: 0.5 },
        },
      },
    ],
  },
  {
    id: 'ideas-note',
    title: 'Working Principles',
    sectionId: 'ideas',
    summary: 'A short set of ideas that shape how I build and evaluate software.',
    body: [
      'Start with the user path and the operating constraint. Architecture is useful when it makes those two things easier to reason about.',
      'Prefer observable behavior over confident guesses, and keep performance, fallback paths, and maintenance costs visible from the beginning.',
    ],
    tags: ['ideas', 'systems', 'craft'],
    displayStyle: 'note',
    transform: interiorExhibitTransforms['ideas-note'],
    interactionRadius: 2,
    media: [
      {
        type: 'model',
        src: '/assets/models/exhibit-working-principles.v1.glb',
        alt: 'Low-poly three-branch working principles relief',
        transform: {
          position: { x: 0, y: 0, z: 0.62 },
          scale: { x: 0.55, y: 0.55, z: 0.55 },
        },
      },
    ],
    relatedExhibitIds: ['background-timeline', 'skills-workbench'],
  },
  {
    id: 'contact-terminal',
    title: 'Contact Terminal',
    sectionId: 'contact',
    summary: 'The easiest way to reach me for projects, collaboration, or technical conversations.',
    body: [
      'If you want to talk about a project, collaboration, or technical idea, email is the best place to start.',
      'You can also find more of my work on GitHub.',
    ],
    tags: ['contact', 'exit'],
    displayStyle: 'contact',
    transform: interiorExhibitTransforms['contact-terminal'],
    interactionRadius: 2,
    media: [
      {
        type: 'model',
        src: '/assets/models/exhibit-contact-terminal.v1.glb',
        alt: 'Low-poly communication terminal with dual signal antennas',
        transform: {
          position: { x: 0, y: -0.18, z: 0.9 },
          scale: { x: 0.52, y: 0.52, z: 0.52 },
        },
      },
    ],
    links: [
      {
        href: 'mailto:sneezycat@sneezycat.dev',
        kind: 'email',
        label: 'Email',
      },
      {
        href: 'https://github.com/evan891119',
        kind: 'profile',
        label: 'GitHub',
      },
    ],
    relatedExhibitIds: ['welcome-console', 'ideas-note'],
  },
];

export const activeMuseumExhibits = museumExhibits.filter(
  (exhibit) => exhibit.enabled !== false,
);
