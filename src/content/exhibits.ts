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
    transform: {
      position: { x: 0, y: 0.95, z: -0.4 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1.4, y: 0.9, z: 1.4 },
    },
    interactionRadius: 1.9,
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
    summary: 'The easiest way to reach me for projects, collaboration, or technical conversations.',
    body: [
      'If you want to talk about a project, collaboration, or technical idea, email is the best place to start.',
      'You can also find more of my work on GitHub.',
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
    relatedExhibitIds: ['welcome-console'],
  },
];
