# 📚 Student Study Planner

A free, mobile-first student productivity PWA for planning tasks, study sessions, and progress.

## Live project

- Repository: [github.com/yashrajagawane/studyflow-pwa](https://github.com/yashrajagawane/studyflow-pwa)
- Deployment: planned through the free Vercel tier in Phase 14

## Current status

The local-first MVP is implemented through Phase 12. Phase 13 prepares the repository for collaboration and deployment. Tasks, progress, study sessions, settings, persistence, accessibility polish, and PWA packaging are complete.

## Features

- Create, edit, complete, filter, and delete study tasks
- Subjects, priorities, deadlines, notes, and overdue indicators
- Daily and weekly progress calculated from real task data
- Add, edit, sort, and delete timed study sessions
- Browser localStorage persistence across refreshes and reopening
- Safe clear-data confirmation
- Responsive dark UI for desktop and mobile
- Installable PWA with service-worker app-shell caching
- No login, backend, analytics, paid API, or secret required for the MVP

## Tech stack

React · Vite · Tailwind CSS · JavaScript · vite-plugin-pwa · localStorage

## Project structure

```text
src/
├── components/   reusable UI for layout, tasks, schedule, progress, and common states
├── context/      shared planner state
├── hooks/        persistence and domain actions
├── pages/        Dashboard, Tasks, Schedule, Progress, Settings
├── services/     safe localStorage adapter
├── utils/        dates, validation, progress, and schedule rules
└── App.jsx       app navigation and composition
```

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
npm run preview
```

## PWA testing

The production build generates a web manifest and service worker. For the most accurate installation test, use the final HTTPS Vercel URL in Chrome on Android:

1. Open the public URL.
2. Open the browser menu.
3. Choose **Install app** or **Add to Home screen**.
4. Launch Study Planner from the phone home screen.
5. Confirm local tasks remain available after reopening.

## Data and privacy

The MVP stores tasks and sessions in the current browser's local storage. Data is device-local and is not sent to a server. Clearing data is available in Settings and requires explicit confirmation. Clearing browser storage or switching devices can remove access to local data.

## Free deployment

The deployment path is:

```text
GitHub → Vercel free tier → public HTTPS vercel.app URL → PWA installation
```

Recommended Vercel settings:

```text
Framework: Vite
Install command: npm install
Build command: npm run build
Output directory: dist
```

No paid domain, database, API, or Google Play Store publication is required.

## Roadmap

- Phase 14: free Vercel deployment
- Phase 15: production acceptance and final screenshots/documentation
- Future: Supabase synchronization, export/import backups, notifications, focus tools, and AI study assistance

## Author

Built as a portfolio project by Yashraj Agawane.
