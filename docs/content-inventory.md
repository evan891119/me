# Content Inventory

## Status

Issue 7.1 is complete for the approved minimal launch set.

All six museum sections have concise source copy in `src/content/exhibits.ts`. Five are currently active; `Background Timeline` is retained with `enabled: false` so it does not render, focus, or appear in the index.

## Site Metadata

- Site title: Evan's Portfolio Museum
- One-sentence summary: A first-person portfolio museum about my projects, tools, and engineering work.
- Preferred contact email: sneezycat@sneezycat.dev
- Preferred profile links:
  - GitHub: https://github.com/evan891119
  - LinkedIn:
  - Personal site:
  - Other:

## Exhibit Copy Requirements

Keep each exhibit concise enough to read inside the overlay without breaking the first-person flow.

Recommended limits:

- Title: 2-5 words
- Summary: 1 sentence
- Body: 2-4 short paragraphs
- Tags: 2-5 tags
- Links: only intentional external actions

## Exhibits

### Welcome Console

- Source ID: `welcome-console`
- Section: `lobby`
- Purpose: Orient the visitor in the first minute.
- Launch title: Welcome Console
- Launch summary: A short orientation exhibit for the first minute of the museum.
- Body:
  - The museum layout and exhibit interaction are explained briefly.
  - Visitors are directed to use `E` when an exhibit comes into focus.
- Tags: orientation, museum
- Related exhibits:
  - `project-plinth`
  - `contact-terminal`
- Notes:

### Background Timeline

- Runtime status: Disabled

- Source ID: `background-timeline`
- Section: `background`
- Purpose: Explain background, current focus, and the transitions that matter.
- Launch title: Background Timeline
- Launch summary: The approach and priorities behind the work shown in this museum.
- Body:
  - Start with the real constraint and smallest useful version.
  - Focus on maintainable systems and products that can be operated after release.
- Tags: background, timeline

### Selected Project Plinth

- Source ID: `project-plinth`
- Section: `projects`
- Purpose: Show one featured project case study.
- Launch title: discord-voice-relay-bot
- Launch summary: A self-hosted Discord voice relay bot for bridging voice channels across separate servers.
- Body:
  - Problem: Discord communities often need to talk across separate servers without moving everyone into the same Discord server or exposing a public hosted service.
  - Role: I built a self-hosted Discord voice relay bot that lets communities bridge voice channels across different Discord servers using Discord-native slash commands and short-lived pairing codes.
  - Stack: Node.js, npm workspaces, discord.js, @discordjs/voice, modular packages for bridge core, Discord adapter, local config, and local state storage. The project also includes Docker Compose support and JSON lifecycle/recovery logging.
  - Outcome: The MVP supports /bridge create, /bridge join <code>, /bridge status, and /bridge leave, with bidirectional voice forwarding, multi-speaker mixing, automatic cleanup when channels empty, multiple simultaneous bridge pairs, basic reconnect handling, and experimental opt-in three-endpoint group bridges.
- Tags: discord, voice, node.js, self-hosted
- Links:
  - Repository: https://github.com/evan891119/discord-voice-relay-bot
  - Live demo:
  - Case study:
- Notes:

### Skills Workbench

- Source ID: `skills-workbench`
- Section: `skills`
- Purpose: Show capabilities connected to actual work, not a generic keyword wall.
- Launch title: Skills Workbench
- Launch summary: A compact exhibit for capabilities connected to actual work.
- Body:
  - Product structure, frontend implementation, Node.js services, deployment, and operations.
  - Clear boundaries, measured performance, and maintainable tooling.
- Tags: skills, engineering, product

### Contact Terminal

- Source ID: `contact-terminal`
- Section: `contact`
- Purpose: Provide a clear follow-up path.
- Launch title: Contact Terminal
- Launch summary: The easiest way to reach me for projects, collaboration, or technical conversations.
- Body:
  - If you want to talk about a project, collaboration, or technical idea, email is the best place to start.
  - You can also find more of my work on GitHub.
- Tags:
- Links:
  - Email: sneezycat@sneezycat.dev
  - GitHub: https://github.com/evan891119
  - LinkedIn:
  - Other:
- Notes:

### Working Principles

- Source ID: `ideas-note`
- Section: `ideas`
- Purpose: Capture concise engineering principles without creating a text-heavy room.
- Launch title: Working Principles
- Launch summary: A short set of ideas that shape how I build and evaluate software.
- Tags: ideas, systems, craft
- Related exhibits:
  - `background-timeline`
  - `skills-workbench`

## Placeholder Content Still In Source

No visible placeholder or empty media-slot copy remains in the current source.

## Replacement Checklist

- Done: Confirm site title and summary fit the first viewport.
- Done: Verify every current external link in rendered QA.
- Done: Confirm contact email is correct.
- Done: Run `npm run lint` and `npm run build`.
- Done: Verify overlay readability in the browser.
- Optional: Replace or expand copy later without changing render code.
