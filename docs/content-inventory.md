# Content Inventory

## Status

Issue 7.1 is ready for real content, but the launch copy is not available yet.

Do not replace prototype copy in `src/content/exhibits.ts` until the fields below are filled with real information.

## Site Metadata

- Site title:
- One-sentence summary:
- Preferred contact email:
- Preferred profile links:
  - GitHub:
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
- Launch title:
- Launch summary:
- Body:
  - 
  - 
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
- Launch title:
- Launch summary:
- Body:
  - Problem:
  - Role:
  - Stack:
  - Outcome:
- Tags:
- Links:
  - Repository:
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
  - Skill cluster 1:
  - Skill cluster 2:
  - Skill cluster 3:
- Tags:
- Related projects:
- Notes:

### Contact Terminal

- Current placeholder ID: `contact-terminal`
- Section: `contact`
- Purpose: Provide a clear follow-up path.
- Launch title:
- Launch summary:
- Body:
  - 
  - 
- Tags:
- Links:
  - Email:
  - GitHub:
  - LinkedIn:
  - Other:
- Notes:

## Placeholder Content Still In Source

These source values should be replaced once the inventory is filled:

- `src/content/museum.ts`
  - `First-Person Portfolio Museum`
  - `Prototype exhibits now render from typed content data.`
- `src/content/exhibits.ts`
  - `Welcome Console`
  - `Background Timeline`
  - `Selected Project Plinth`
  - `Skills Workbench`
  - `Contact Terminal`
  - `Repository placeholder`
  - `Email placeholder`
  - `hello@example.com`

## Replacement Checklist

- Replace prototype titles, summaries, body copy, tags, and links in `src/content/exhibits.ts`.
- Replace site title and summary in `src/content/museum.ts`.
- Verify every external link.
- Confirm contact email is correct.
- Run `npm run lint`.
- Run `npm run build`.
- Manually verify overlay readability in the browser.
