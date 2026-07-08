# Content Inventory

## Status

Issue 7.1 is partially complete.

Site metadata, the featured project exhibit, and the contact exhibit have been synced into `src/content/`. Welcome, background, and skills still need launch-ready copy.

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

- Current placeholder ID: `welcome-console`
- Section: `lobby`
- Purpose: Orient the visitor in the first minute.
- Launch title: Welcome!!
- Launch summary: Welcome to my Museum
- Body:
  - hi
- Tags:
- Related exhibits:
  - `project-plinth`
  - `contact-terminal`
- Notes:

### Background Timeline

- Current placeholder ID: `background-timeline`
- Section: `background`
- Purpose: Explain background, current focus, and the transitions that matter.
- Launch title:
- Launch summary:
- Body:
  - 
  - 
- Tags:
- Links:
- Notes:

### Selected Project Plinth

- Current placeholder ID: `project-plinth`
- Section: `projects`
- Purpose: Show one featured project case study.
- Launch title: discord-voice-relay-bot
- Launch summary:
- Body:
  - Problem: Discord communities often need to talk across separate servers without moving everyone into the same Discord server or exposing a public hosted service.
  - Role: I built a self-hosted Discord voice relay bot that lets communities bridge voice channels across different Discord servers using Discord-native slash commands and short-lived pairing codes.
  - Stack: Node.js, npm workspaces, discord.js, @discordjs/voice, modular packages for bridge core, Discord adapter, local config, and local state storage. The project also includes Docker Compose support and JSON lifecycle/recovery logging.
  - Outcome: The MVP supports /bridge create, /bridge join <code>, /bridge status, and /bridge leave, with bidirectional voice forwarding, multi-speaker mixing, automatic cleanup when channels empty, multiple simultaneous bridge pairs, basic reconnect handling, and experimental opt-in three-endpoint group bridges.
- Tags:
- Links:
  - Repository: https://github.com/evan891119/discord-voice-relay-bot
  - Live demo:
  - Case study:
- Notes:

### Skills Workbench

- Current placeholder ID: `skills-workbench`
- Section: `skills`
- Purpose: Show capabilities connected to actual work, not a generic keyword wall.
- Launch title:
- Launch summary:
- Body:
  - Skill cluster 1: AI tools
  - Skill cluster 2:
  - Skill cluster 3:
- Tags:
- Related projects:
- Notes:

### Contact Terminal

- Current placeholder ID: `contact-terminal`
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

## Placeholder Content Still In Source

These source values should be replaced once the remaining inventory is filled:

- `src/content/museum.ts`
  - No known placeholder metadata remains.
- `src/content/exhibits.ts`
  - `Welcome Console`
  - `Background Timeline`
  - `Skills Workbench`

## Replacement Checklist

- Replace remaining prototype titles, summaries, body copy, tags, and links in `src/content/exhibits.ts`.
- Confirm site title and summary still fit after the remaining exhibits are written.
- Verify every external link.
- Confirm contact email is correct.
- Run `npm run lint`.
- Run `npm run build`.
- Manually verify overlay readability in the browser.
