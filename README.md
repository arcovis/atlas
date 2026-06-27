# Atlas

Atlas is a Wynncraft companion app built as a proof of concept and portfolio piece. It is meant to show how a quest browser, quest details view, and journey tree can all stay in sync inside one workspace.

This is an MVP. It is not a finished product, not a polished release, and not a full game companion platform. The UI is intentionally functional over beautiful. I am not a web designer, so some of the visual choices may feel rough around the edges. That is honest, and it is part of the point: this project exists to demonstrate structure, interaction, and product thinking rather than art direction.

## What It Does

Atlas gives you a single workspace for browsing Wynncraft quests:

- Search for quests in the left panel
- Read quest details in the centre panel
- Explore the quest journey tree in the right panel
- Click any quest in the search list or journey tree to update the whole view
- Keep the selected quest reflected in the URL

The idea is to make quest discovery feel like using a companion app rather than bouncing between separate pages.

## How It Works

The app is built around one shared selected quest state.

### Data

Quest data lives in `lib/data/quests.ts` and is typed in `types/quest.ts`. The current data is hardcoded seed data, which is enough for the MVP and keeps the project easy to reason about.

### Workspace

The main orchestration happens in `components/quests/QuestWorkspace.tsx`.

That component:

- loads the quests
- tracks the selected quest
- keeps the URL in sync
- passes the selected quest to the details panel and journey tree

So instead of navigation causing full page changes, the workspace updates in place.

### Search

`components/quests/QuestSearch.tsx` filters the quest list as you type. Selecting a result updates the shared quest state, which then updates the details and journey panels too.

### Quest Details

`components/quests/QuestDetailsPanel.tsx` renders the selected quest as a journal-style readout. It focuses on:

- the quest title
- the quest location
- the starting NPC
- rewards
- item rewards

This is the core “quest reading” view of the app.

### Journey Tree

`components/quests/ProgressiveQuestTree.tsx` renders the quest progression tree. It expands progressively instead of dumping the full tree at once, so the page stays readable and less expensive to render.

## How To Use It

### Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Navigate the app

1. Type in the search panel to find a quest.
2. Click a quest in the search results to load it in the centre and right panels.
3. Click quests inside the journey tree to jump through the questline.
4. Use the browser back and forward buttons if you want to move between previously selected quests.

### Useful routes

- `/quest/[id]` - main quest workspace for a selected quest
- `/search` - search-focused entry point
- `/background` - blank background preview page

## Why I Built It

This project is mainly for my CV and portfolio. I wanted something that shows:

- front-end state management
- data-driven UI
- URL/state synchronisation
- recursive UI rendering
- a clean split between search, details, and progression
- a bit of product thinking around how people actually browse quests

It is not trying to pretend to be a finished commercial product. It is trying to show that I can build a real interactive workspace and keep it coherent.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- React Flow for quest journey structures
- `next/font/google` for typography

## Typography

The app currently uses:

- `Cinzel` for the `ATLAS` wordmark
- `Cormorant Garamond` for prominent fantasy-style display text
- `Inter` for normal UI, body text, search, and list content

That setup is intentional. The app should stay readable first, with decorative fonts used sparingly.

## Important Note

This is a proof of concept and an MVP. It is not a finished visual design system. The layout, data model, and interaction flow are the main things this project is meant to show.

If you are looking at it as a hiring signal, the value here is in the architecture and interaction model, not in flashy visuals.

## Development

Common commands:

```bash
npm run dev
npm run build
npm run start
```

<img width="1773" height="934" alt="image" src="https://github.com/user-attachments/assets/740fde4d-5e0c-4353-828e-7a005ca48f43" />
