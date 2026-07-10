# Deploying Numera to Vercel

Numera is a static Expo web export — no backend, no server-side rendering, no environment
variables required. This is a one-time setup; every subsequent push to `main` redeploys
automatically.

## One-time setup (product owner)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is simplest).
2. **Add New… → Project**, then select the `numera` GitHub repository.
3. On the "Configure Project" screen:
   - **Framework Preset**: `Other`
   - **Build Command**: `npx expo export --platform web` (already set in `vercel.json`, Vercel
     should pick this up automatically)
   - **Output Directory**: `dist` (also set in `vercel.json`)
   - **Environment Variables**: none needed
4. Click **Deploy**. The first build takes a few minutes.
5. Once deployed, Vercel gives you a URL like `numera-<hash>.vercel.app`. You can add a custom
   domain later from the project's **Settings → Domains** if you want.

After this one-time setup, every push to `main` (i.e. every merged PR) triggers a new deployment
automatically — nothing further to configure.

## Verifying the deploy

- Open the Vercel URL in desktop Chrome — the app should load and behave the same as
  `npx expo start --web`.
- Open the same URL in **iPhone Safari**, tap the Share icon, then **Add to Home Screen**. The
  app should install with the Numera name/icon and launch full-screen (no Safari address bar)
  when opened from the home screen.

## CI

`.github/workflows/ci.yml` runs install, lint, and test on every PR targeting `main`. Configure
branch protection on `main` (Settings → Branches → Add rule) to require the `CI / test` check to
pass before merging, once the workflow has run at least once (GitHub only lists a check as
available to require after it has executed).

## Local production build

To build and preview the static export locally before pushing:

```
npx expo export --platform web
npx serve dist
```
