# Architecture

Dailydots is a client-only single-page app. There is no server, API, or database.

## Overview

```text
main.tsx ──> BrowserRouter ──> App ──> Layout (header, nav, footer, Routes)
                                         ├── HomePage
                                         ├── JournalsPage
                                         └── JournalEditor ── RecentDatePicker
                                                   │
                                    journalService (src/services)
                                                   │
                                         window.localStorage
```

## Modules

| File | Responsibility |
| --- | --- |
| [src/main.tsx](../src/main.tsx) | Mounts the app inside `StrictMode` and `BrowserRouter`. |
| [src/App.tsx](../src/App.tsx) | `Layout` (navigation, document title per route, route table), `HomePage`, `Stat`, `JournalsPage`, `RecentDatePicker`, `JournalEditor`, `NotFound`, and date helpers. |
| [src/types.ts](../src/types.ts) | `MOODS` constant, `Mood`, `JournalEntry`, `JournalDraft` types. |
| [src/services/journalService.ts](../src/services/journalService.ts) | All reads and writes of journal data. |
| [src/index.css](../src/index.css) | Tailwind import, fonts, and theme colors (`ink`, `muted`, `paper`, `sage`, `leaf`, `terracotta`, `sun`). |

Components read and write data only through `journalService`; they do not touch `localStorage` directly.

## Data model

Defined in [src/types.ts](../src/types.ts):

```ts
interface JournalEntry {
  id: string        // crypto.randomUUID()
  date: string      // local calendar date, YYYY-MM-DD
  mood: Mood        // 'bright' | 'good' | 'steady' | 'low' | 'tough'
  text: string
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

type JournalDraft = Pick<JournalEntry, 'date' | 'mood' | 'text'>
```

## Data storage

Entries are stored as a JSON array under the `localStorage` key `daily-journal.entries`.

`journalService` exposes:

| Method | Behavior |
| --- | --- |
| `getAll()` | Returns all valid entries, sorted by `date` descending. |
| `getByDate(date)` | Returns the entry for a date, or `undefined`. |
| `save(draft)` | Creates an entry, or updates the existing entry for the same `date` (keeps `id` and `createdAt`, refreshes `updatedAt`). Returns the saved entry. |
| `delete(id)` | Removes the entry with that `id`. |

Behavior to be aware of:

- **One entry per date.** `date` is the natural key for saves.
- **Defensive reads.** Stored data is parsed as `unknown` and each item is checked with a type guard. Invalid items, malformed JSON, or an unavailable `localStorage` produce an empty or filtered list instead of an error. Invalid items are dropped on the next write.
- **Writes are not guarded.** `localStorage.setItem` errors (for example, quota exceeded) are not caught.

## Editor behavior

- `/new` starts with today's date and the `steady` mood. `/edit/:date` loads the existing entry for that date.
- `RecentDatePicker` offers the last 7 days (`RECENT_DAYS_COUNT`); the date input allows any date.
- Saving with empty or whitespace-only text shows "Add a few words before saving." and does not save. Text is trimmed on save, and the app then navigates to `/journals`.
- If the selected date already has an entry while creating a new one, a notice says saving will update it.

## Styling

Tailwind CSS v4 is loaded through the Vite plugin; theme tokens are declared in a `@theme` block in `src/index.css` and used as utility classes (for example `text-ink`, `bg-sage`). Fonts are DM Sans (body) and Fraunces (`font-display`).

## Related instructions

Coding standards are maintained separately and are not repeated here:
[AGENTS.md](../AGENTS.md), [.github/instructions/](../.github/instructions), and [.github/copilot-instruction.md](../.github/copilot-instruction.md). Note that `copilot-instruction.md` describes a Supabase-backed setup, which the current code does not implement.
