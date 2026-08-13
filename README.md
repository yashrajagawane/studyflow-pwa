# 📚 Student Study Planner

A free, mobile-first student productivity PWA for planning tasks, study sessions, and progress.

## Live project

- Repository: [github.com/yashrajagawane/studyflow-pwa](https://github.com/yashrajagawane/studyflow-pwa)
- Live app: [studyflow-pwa.vercel.app](https://studyflow-pwa.vercel.app)
- Deployment: free Vercel Hobby tier, connected to the `master` branch

## Current status

The local-first MVP is implemented through Phase 16. The public production deployment is live on Vercel, production acceptance is complete, and the free upgrade layer is complete. Tasks, progress, study sessions, settings, persistence, accessibility polish, PWA packaging, backups, focus mode, streaks, and planning filters are complete.

## Features

- Create, edit, complete, filter, and delete study tasks
- Search tasks by title, subject, or notes
- Sort tasks by deadline, priority, title, or date added
- Filter tasks by priority
- Filter tasks by subject
- Subjects, priorities, deadlines, notes, and overdue indicators
- Daily and weekly progress calculated from real task data
- Current study streak calculated from completed-task dates
- Longest study streak from completion history
- Client-side 25-minute focus timer
- Add, edit, sort, and delete timed study sessions
- Browser localStorage persistence across refreshes and reopening
- Safe clear-data confirmation
- Local JSON backup export and import
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

The MVP stores tasks and sessions in the current browser's local storage. Data is device-local and is not sent to a server. Settings includes a local JSON backup export/import flow for moving data between browsers. Clearing data is available in Settings and requires explicit confirmation. Clearing browser storage without a backup can remove access to local data.

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

- Phase 14: free Vercel deployment ✅
- Phase 15: production acceptance and final handoff ✅
- Future Phase 17: Supabase synchronization, multi-device support, notifications, calendar integration, and AI study assistance

## Author

Built as a portfolio project by Yashraj Agawane.
