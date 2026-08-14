# 📚 Student Study Planner

A free, mobile-first student productivity PWA for planning tasks, study sessions, and progress.

## Live project

- Repository: [github.com/yashrajagawane/studyflow-pwa](https://github.com/yashrajagawane/studyflow-pwa)
- Live app: [studyflow-pwa.vercel.app](https://studyflow-pwa.vercel.app)
- Deployment: free Vercel Hobby tier, connected to the `master` branch

## Current status

The local-first MVP and free integration layer are implemented through Phase 17. The public production deployment is live on Vercel, production acceptance is complete, and the app supports recurring tasks, calendar export, and opt-in foreground browser reminders without an account or paid service.

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
- Daily and weekly recurring tasks
- iCalendar export for planned sessions
- Optional browser reminders while the app is open
- Optional Supabase email authentication and cloud synchronization
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

## Optional Supabase cloud sync

Cloud sync is disabled unless both Vite variables are configured. The local-only app remains fully functional without them.

1. Create a free Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql). The table is protected with Row Level Security so users can access only their own document.
3. Copy `.env.example` to `.env.local` and fill in the project URL and publishable key from Supabase's Connect dialog.
4. Restart Vite or trigger a new Vercel deployment after adding the same `VITE_` variables in the project settings.
5. Open Settings, create an account or sign in, then choose **Sync now**.

Only the app's task and session JSON is synchronized. Never put a Supabase secret/service-role key in this frontend.

## PWA testing

The production build generates a web manifest and service worker. For the most accurate installation test, use the final HTTPS Vercel URL in Chrome on Android:

1. Open the public URL.
2. Open the browser menu.
3. Choose **Install app** or **Add to Home screen**.
4. Launch Study Planner from the phone home screen.
5. Confirm local tasks remain available after reopening.

## Data and privacy

Without Supabase configuration, the app stores tasks and sessions only in the current browser. When optional cloud sync is enabled, the signed-in user's task and session JSON is stored in Supabase under Row Level Security. Settings includes local JSON backup export/import and merge flows. Clearing data is available in Settings and requires explicit confirmation.

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
- Phase 17: free local recurring tasks, calendar export, and foreground reminders ✅
- Phase 18 in progress: Supabase email authentication and cloud synchronization
- Future Phase 18 steps: multi-device conflict UX, background push, and AI study assistance

## Author

Built as a portfolio project by Yashraj Agawane.
