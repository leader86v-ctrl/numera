# Numera

A Chaldean Numerology Calculator. Enter a full name and birth date to see the Psychic, Destiny, and
Name numbers in compound/single format (e.g. "23/5"), with short interpretations.

Private by design: all calculations happen on-device, no backend, no network calls.

Primary platform is **web** (Expo web export). iOS native support comes later.

## Requirements

- Node.js >= 18.13
- npm

## Run (web)

```
npm install
npm start
```

Then press `w` in the terminal, or run directly:

```
npx expo start --web
```

This opens the app in your default browser.

## Test

```
npm test
```

Runs the Jest test suite (via `jest-expo`).

## Lint

```
npm run lint
```

Runs ESLint (`eslint-config-expo`, with Prettier compatibility).

## Format

```
npm run format
```

Formats the codebase with Prettier.

## Project structure

- `src/logic/` — pure numerology functions, no React imports, fully unit tested
- `src/screens/` — screen components
- `src/components/` — shared UI components
- `src/content/` — static interpretation texts

## Production web build

```
npx expo export --platform web
```
