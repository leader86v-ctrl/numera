# REQUIREMENTS.md — Numera (web-first)

Execute tasks strictly in order. Rules of engagement are in `CLAUDE.md`. Each task = one branch = one PR.

---

## Task 1 — Scaffold project

**Story:** As a developer, I want a clean Expo TypeScript project with testing configured, so all later tasks have a consistent foundation.

**Acceptance criteria:**
- [ ] Expo app (managed, TypeScript template); `npx expo start --web` opens the app in a browser
- [ ] Jest + jest-expo configured; `npm test` passes with one sample test
- [ ] ESLint + Prettier configured; `npm run lint` passes
- [ ] Folders created: `src/logic/`, `src/screens/`, `src/components/`, `src/content/`
- [ ] README: how to run (web), test, lint

---

## Task 2 — Chaldean letter-to-number mapping

**Story:** As a user, I want my name converted using the authentic Chaldean system, so results match classical numerology references.

**Acceptance criteria:**
- [ ] `src/logic/chaldean.ts` exports `letterValue(char: string): number` implementing the table in CLAUDE.md
- [ ] Exports `nameValue(name: string): number` returning the raw (unreduced) sum
- [ ] Case-insensitive; non-alphabetic chars return 0 and are ignored in sums

**Required tests (all must pass):**
- [ ] `letterValue('A') === 1`, `letterValue('f') === 8`, `letterValue('O') === 7`
- [ ] `letterValue('-') === 0`, `letterValue(' ') === 0`, `letterValue('5') === 0`
- [ ] For every letter A–Z: `letterValue(x) !== 9` and `letterValue(x)` is between 1 and 8
- [ ] `nameValue('ANNA') === 12`
- [ ] `nameValue('anna') === nameValue('ANNA')`
- [ ] `nameValue('Mary-Jane O\'Neil') === nameValue('MaryJane ONeil')`

---

## Task 3 — Digit reduction with compound preservation

**Story:** As a user, I want to see both my compound number and its single-digit reduction (e.g., 15/6), because compound numbers carry their own meaning in Chaldean numerology.

**Acceptance criteria:**
- [ ] `src/logic/reduce.ts` exports `reduce(n: number): { compound: number; single: number }`
- [ ] `compound` = last two-digit (or original one-digit) value before final reduction; `single` = fully reduced 1–9
- [ ] Throws a typed error for n < 0 or non-integer input

**Required tests:**
- [ ] `reduce(12)` → `{compound: 12, single: 3}`
- [ ] `reduce(7)` → `{compound: 7, single: 7}`
- [ ] `reduce(29)` → `{compound: 29, single: 2}`
- [ ] `reduce(1997)` → `single === 8` and compound is a two-digit number
- [ ] `reduce(-1)` and `reduce(2.5)` throw

---

## Task 4 — Psychic & Destiny numbers

**Story:** As a user, I want my Psychic and Destiny numbers computed from my birth date.

**Acceptance criteria:**
- [ ] `src/logic/dateNumbers.ts` exports `psychicNumber(day: number)` and `destinyNumber(day: number, month: number, year: number)`
- [ ] Psychic = reduce(day). Destiny = reduce(sum of all digits of DD, MM, YYYY)
- [ ] Both return `{compound, single}` via Task 3's reducer
- [ ] Invalid dates (day 0/32, month 0/13, impossible combos like 31-02) throw a typed error

**Required tests:**
- [ ] `psychicNumber(8).single === 8`; `psychicNumber(17).single === 8`
- [ ] `destinyNumber(23, 11, 1980).single === 7`
- [ ] `psychicNumber(0)`, `psychicNumber(32)`, `destinyNumber(31, 2, 2000)` throw
- [ ] No function ever returns NaN

---

## Task 5 — Input screen

**Story:** As a user, I want a simple screen to enter my full name and birth date.

**Acceptance criteria:**
- [ ] Text input for full name (multi-word allowed) with accessibility label
- [ ] Date input that works on web (three dropdowns or a web-compatible picker — agent's choice, must work in desktop Chrome and iPhone Safari)
- [ ] "Calculate" button disabled until name is non-empty and date is valid
- [ ] Component test: button disabled/enabled states

---

## Task 6 — Results screen

**Story:** As a user, I want a clear results view showing my three numbers.

**Acceptance criteria:**
- [ ] Three cards: Psychic, Destiny, Name — each shows `compound/single` (e.g., "23/5") and a title
- [ ] "Calculate again" returns to input with previous values preserved
- [ ] Snapshot test with fixed input (name "ANNA", date 23-11-1980)

---

## Task 7 — Web export + Vercel deployment

**Story:** As the product owner, I want a live URL so I can use the app on my phone immediately.

**Acceptance criteria:**
- [ ] `npx expo export --platform web` produces a working static build
- [ ] `vercel.json` / config committed; deployment instructions in `docs/deploy.md` (product owner connects the repo to Vercel once)
- [ ] PWA manifest: app name, icon, standalone display — "Add to Home Screen" works on iPhone Safari
- [ ] GitHub Actions workflow: on PR → install, lint, test; merge to `main` blocked unless green

---

## Task 8 — Interpretations content

**Story:** As a user, I want short meaning texts for each number so the result is understandable.

**Acceptance criteria:**
- [ ] `src/content/interpretations.ts`: numbers 1–9 plus compounds 11 and 22 → `{title, short, detail}`
- [ ] All texts are placeholders marked `TODO(vishal)` — the product owner supplies final copy; do NOT write final interpretation content
- [ ] Results cards render `short`; tapping a card expands `detail`
- [ ] Test: every entry has non-empty title and short

---

## Task 9 — Calculation history

**Story:** As a user, I want past calculations saved on my device so I can revisit and compare them.

**Acceptance criteria:**
- [ ] Each calculation saved (name, date, results, timestamp) via AsyncStorage
- [ ] History screen: list entries, tap to reopen results, delete individual entries
- [ ] Privacy test: assert no network APIs (`fetch`, `XMLHttpRequest`, `axios`) appear anywhere in `src/`

---

## Task 10 — Polish

**Story:** As a user, I want the app to look intentional and finished.

**Acceptance criteria:**
- [ ] App icon + favicon + splash configured (simple geometric numerology-themed design)
- [ ] Dark mode follows system setting
- [ ] Consistent spacing/typography across screens
- [ ] Lighthouse accessibility score ≥ 90 on the deployed site

---

## Out of scope for v1 (do not build)

Compatibility calculations, name-change suggestions, Vedic astrology, localization, sharing, accounts, native iOS/Android builds.
