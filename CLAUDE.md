# CLAUDE.md — Project instructions for the AI agent

You are the developer for this project. The product owner (Vishal) writes requirements; you implement them. Read this file fully before doing anything.

## Project

**Numera** — a Chaldean Numerology Calculator. User enters a full name and birth date → app shows Psychic number, Destiny number, and Name number in compound/single format (e.g., "23/5") with short interpretations. Private by design: all logic on-device, no backend, no network calls.

**Primary platform: WEB** (Expo web export, deployed to Vercel). iOS native comes later — do not work on native builds unless explicitly asked.

## Stack (do not deviate without asking)

- Expo (managed workflow) + React Native + **TypeScript strict mode**
- Jest + jest-expo for tests
- ESLint + Prettier
- AsyncStorage for persistence (with localStorage behavior on web)
- No backend, no analytics, no external APIs, no additional state libraries (React state/context is enough)

## Workflow rules

1. Work on **one task at a time**, in the order listed in `REQUIREMENTS.md`. Do not start a task until the previous one is complete.
2. For each task: create a branch `task/<number>-<short-name>`, implement, ensure `npm test` and `npm run lint` pass, then open a PR titled `Task <number>: <name>`. Never commit directly to `main`.
3. Every logic task must include the unit tests listed in its acceptance criteria. **Tests are the definition of done** — if a listed test case is not implemented and passing, the task is not done.
4. If a requirement is ambiguous, ask the product owner in the PR description rather than guessing. Never silently change scope.
5. Keep changes small: if a task grows beyond ~300 lines of diff, stop and propose splitting it.
6. Do not add features not listed in REQUIREMENTS.md (no login, no sharing, no ads, no extra numbers/systems).

## Code conventions

- Folder structure:
  - `src/logic/` — pure functions only, no React imports, 100% unit tested
  - `src/screens/` — screen components
  - `src/components/` — shared UI components
  - `src/content/` — static interpretation texts
- Pure logic must never depend on UI. UI must never contain numerology math.
- All numerology functions return `{ compound: number; single: number }` — never bare numbers.
- Accessibility labels on every input and result card.

## Domain rules (critical — verify against tests, not intuition)

**Chaldean letter values (this is NOT Pythagorean — do not use A=1..I=9 tables):**

| Value | Letters |
|---|---|
| 1 | A, I, J, Q, Y |
| 2 | B, K, R |
| 3 | C, G, L, S |
| 4 | D, M, T |
| 5 | E, H, N, X |
| 6 | U, V, W |
| 7 | O, Z |
| 8 | F, P |

- **No letter ever maps to 9.** A test must assert this.
- Case-insensitive. Spaces, hyphens, apostrophes, digits → value 0, excluded from sums.
- Reduction keeps the compound number: 1997 → 26 → 8 is reported as compound 26, single 8.
- Psychic number = reduced day of month. Destiny number = reduced sum of all digits of full date (DD, MM, YYYY).

## Privacy rule (tested)

No `fetch`, `XMLHttpRequest`, `axios`, or any network call anywhere in `src/`. A test greps/asserts this. All data stays in AsyncStorage/localStorage.

## Commands

- `npm start` / `npx expo start --web` — run in browser
- `npm test` — Jest
- `npm run lint` — ESLint
- `npx expo export --platform web` — production web build
