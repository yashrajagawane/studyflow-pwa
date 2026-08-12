# 📚 Student Study Planner

A free, mobile-first student productivity PWA for planning tasks, study sessions, and progress.

## Current status

The core local-first MVP is implemented through Phase 12. Tasks, progress, study sessions, settings, persistence, accessibility polish, and PWA packaging are complete. GitHub preparation and free Vercel deployment are next.

## Features

- Create, edit, complete, filter, and delete study tasks
- Subjects, priorities, deadlines, notes, and overdue indicators
- Daily and weekly progress calculated from real task data
- Add, edit, sort, and delete timed study sessions
- Browser localStorage persistence across refreshes and reopening
- Safe clear-data confirmation
- Responsive dark UI for desktop and mobile
- Installable PWA with service-worker app-shell caching

## Tech stack

React · Vite · Tailwind CSS · JavaScript · PWA · localStorage

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npm run build
npm run preview
```

Open the preview URL in a supported browser to inspect the production PWA manifest and service worker. Installation is best tested from the final HTTPS Vercel URL.

## Data and privacy

The MVP does not use accounts, analytics, a backend, or external APIs. Tasks and sessions stay in the browser's local storage on the current device. Clearing data is available in Settings and requires confirmation.

## Free deployment

The planned free deployment path is GitHub → Vercel free tier → public `vercel.app` URL. No paid domain, database, API, or Google Play Store publication is required.

## Roadmap

GitHub preparation, Vercel deployment, production acceptance, screenshots, and final documentation are next. Supabase synchronization and an AI study assistant are reserved for future versions.
