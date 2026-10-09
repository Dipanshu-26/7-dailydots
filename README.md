# Dailydots

Dailydots is a small daily journal app. Write one entry per day, pick a mood, and browse, edit, or delete past entries. Entries are stored in the browser's `localStorage`; there is no backend.

## Features

- Home page with the latest entry, total entries written, and latest mood.
- Add an entry with a date, a mood (Bright, Good, Steady, Low, Tough), and free text, with a live character counter under the journal text box.- Quick date picker for the past 7 days, plus a native date input for any other date.
- One entry per date: saving to a date that already has an entry updates it.
- "My journals" archive, sorted newest first, with edit and delete (delete asks for confirmation).
- Responsive layout with a mobile navigation menu and a "Page not found" route.

## Tech stack

| Area | Technology |
| --- | --- |
| Build tool | [Vite](https://vite.dev/) |
| UI | React, React Router (`react-router-dom`), `lucide-react` icons |
| Language | TypeScript (`strict` mode) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Persistence | Browser `localStorage` |

## Prerequisites

- Node.js and npm (a current LTS release of Node.js is recommended).

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at <http://127.0.0.1:4173>. The port is fixed (`--strictPort`), so startup fails if it is already in use.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on `127.0.0.1:4173`. |
| `npm run build` | Type-check with `tsc -b`, then create a production build in `dist/`. |
| `npm run lint` | Type-check only (`tsc -b --pretty false`). There is no ESLint setup. |
| `npm run preview` | Serve the production build locally. |

The project has no test runner or `format`/`typecheck`/`test` scripts.

## Configuration

No environment variables are required. The app does not read any `VITE_*` variables or connect to external services, apart from loading the DM Sans and Fraunces fonts from Google Fonts in [src/index.css](src/index.css).

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/journals` | My journals (archive) |
| `/new` | Add an entry |
| `/edit/:date` | Edit the entry for a date (`YYYY-MM-DD`) |
| `*` | Page not found |

## Project structure

```text
.
├── index.html                 # Vite entry HTML
├── public/assets/logo.webp    # Logo served at /assets/logo.webp
├── src/
│   ├── main.tsx               # React root, StrictMode, BrowserRouter
│   ├── App.tsx                # Layout, pages, editor, date picker
│   ├── types.ts               # MOODS, Mood, JournalEntry, JournalDraft
│   ├── index.css              # Tailwind import and theme tokens
│   └── services/
│       └── journalService.ts  # localStorage data access
├── vite.config.ts             # React and Tailwind plugins
├── tsconfig*.json             # TypeScript configuration
└── .github/                   # Coding instructions for contributors and agents
```

## Documentation

- [Architecture and data storage](docs/architecture.md)

## Contributing

Follow the repository guidelines in [AGENTS.md](AGENTS.md) and the files in [.github/instructions/](.github/instructions). Before opening a change, run `npm run lint` and `npm run build`.

## Known limitations

- Data lives only in the current browser profile. Clearing site data removes all entries, and entries are not synced between devices.
- Entries that fail validation when read from storage are silently ignored.
