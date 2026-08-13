# 📚 Student Study Planner — Master Implementation Plan

This is the source of truth for building the Student Study Planner from an empty repository to a polished, free, installable PWA. The roadmap is intentionally incremental so every phase can be understood, tested, committed, and demonstrated.

## 1. Product definition

### Product vision

Give students one calm, useful place to decide what to study, when to study it, and whether they are making progress.

### MVP user promise

A student can open the app, create study tasks and sessions, complete work, see real progress, refresh or reopen the browser without losing data, and install the app on a supported phone without paying for hosting or backend services.

### MVP boundaries

The MVP is local-first and single-device. It will not include accounts, cloud sync, payments, AI, push notifications, or Google Play Store publication. These are deliberately deferred until the core experience is stable.

### Free infrastructure

| Need | Free choice | Why |
| --- | --- | --- |
| UI | React + Vite | Fast, popular, portfolio-friendly |
| Styling | Tailwind CSS + project CSS | Responsive design without a paid design system |
| Icons | Original CSS/SVG or a free open-source icon package | Avoid copyrighted artwork |
| State | React state, Context, and custom hooks | Simple enough for the MVP |
| Storage | Browser `localStorage` | No account, server, or database required |
| PWA | `vite-plugin-pwa` | Manifest and service-worker generation |
| Source control | Git + GitHub | Free repository and history |
| Hosting | Vercel free tier | Free HTTPS and Git-based deployments |

## 2. Decisions that must remain consistent

- Use JavaScript rather than TypeScript for the first build so the project remains beginner-friendly.
- Use date-only strings in `YYYY-MM-DD` format for deadlines and schedule dates.
- Store timestamps as ISO strings only for audit fields such as `createdAt` and `completedAt`.
- Treat the user's local browser date as the source of truth for “today” and “this week.”
- Use `pending` and `completed` as task statuses; do not invent extra states until needed.
- Use `low`, `medium`, and `high` priorities with visible text as well as color or icons.
- Start with a schedule list rather than a complex calendar library.
- Keep task and schedule storage behind a service/context boundary so cloud storage can replace it later.
- Do not put secrets in this frontend. The MVP has no environment variables.
- Do not show sample tasks as real statistics. If demo data is ever added, label it clearly and make it removable.
- Keep dark mode as the primary visual theme; avoid theme complexity until the core product works.

## 3. Recommended project architecture

```text
src/
  components/
    common/          reusable buttons, badges, empty states, modals
    layout/          app shell, page header, sidebar, mobile navigation
    tasks/           task form, card, list, filters
    schedule/        schedule form, session card, session list
    progress/        stat cards, daily progress, weekly progress
  context/           shared planner state and actions
  data/              constants and default values
  hooks/              useTasks, useSchedule, useLocalStorage
  pages/              Dashboard, Tasks, Schedule, Progress, Settings
  services/           storage adapter and safe serialization
  utils/              date, validation, progress, ID helpers
  App.jsx             page selection and app composition
  main.jsx            React entry point
  index.css           global CSS and Tailwind entry
  App.css             app-specific visual styles while the design system evolves
```

The app should have one shared planner state rather than separate, duplicated task state in every page. UI components should receive data and callbacks and should not directly manipulate `localStorage`.

## 4. Data contracts

### Task

```javascript
{
  id: "task-unique-id",
  title: "Practice Binary Trees",
  subject: "DSA",
  priority: "high",
  status: "pending",
  deadline: "2026-08-20",
  notes: "Solve 10 problems",
  createdAt: "2026-08-12T10:00:00.000Z",
  completedAt: null
}
```

Required validation:

- `title` is non-empty after trimming.
- `subject` is a non-empty string.
- `priority` is `low`, `medium`, or `high`.
- `status` is `pending` or `completed`.
- `deadline` is empty or a valid `YYYY-MM-DD` date.
- `notes` is optional and bounded to a reasonable length.

### Study session

```javascript
{
  id: "session-unique-id",
  title: "DSA Practice",
  subject: "DSA",
  date: "2026-08-12",
  startTime: "09:00",
  endTime: "10:00",
  notes: ""
}
```

Schedule validation must reject an end time earlier than or equal to the start time.

### Storage keys and versioning

```text
study-planner-tasks
study-planner-schedule
study-planner-settings
study-planner-schema-version
```

The storage adapter must handle missing data, malformed JSON, and future schema migrations without crashing the UI. Clear-data must remove only this app's keys and must always require confirmation.

## 5. Phase-by-phase execution plan

Every implementation phase has the same completion gate: implement a focused change, test it, update `IMPLEMENTATION_STATUS.md`, and create a meaningful Git commit.

### Phase 0 — Product analysis and architecture

Objective: turn the idea into an agreed, buildable MVP.

Deliverables:

- MVP scope and future scope
- Data contracts and validation rules
- Storage strategy and timezone strategy
- Navigation/page map
- Free technology and deployment decisions
- This master implementation plan and the status tracker

Files: planning documents only.

Verification: requirements review and architecture consistency check.

Exit gate: no unresolved decision can change the MVP architecture.

### Phase 1 — Project initialization

Objective: create a clean, reproducible frontend foundation.

Tasks:

- Initialize React/Vite
- Install only required open-source packages
- Configure Tailwind through Vite
- Configure `dev`, `build`, `preview`, and `lint` scripts
- Add metadata, `.gitignore`, README foundation, and source entry points
- Verify the first production build
- Create the first Git checkpoint

Files: `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/index.css`, `README.md`, `.gitignore`.

Verification: `npm install`, `npm run lint`, `npm run build`.

Exit gate: a clean clone can install and build the project.

### Phase 2 — Design system and application shell

Objective: create the reusable visual and navigation foundation before adding complex features.

Tasks:

- Extract shell, sidebar, mobile navigation, page header, and common controls into reusable components
- Define color tokens, typography, spacing, border radius, shadows, and focus states
- Add page-level navigation for Dashboard, Tasks, Schedule, Progress, and Settings
- Define active, hover, disabled, loading, and error states
- Add responsive rules for small mobile, mobile, tablet, and desktop
- Ensure navigation works without a routing dependency unless routing becomes necessary

Files: `src/components/layout/*`, `src/components/navigation/*`, `src/components/common/*`, `src/App.jsx`, `src/App.css`.

Verification: navigation switching, keyboard use, focus visibility, phone/tablet/desktop widths, no horizontal overflow.

Exit gate: every planned page has a stable shell and the visual language is reusable.

### Phase 3 — Dashboard information architecture

Objective: make the dashboard clearly explain the student's current day.

Tasks:

- Add greeting and local current date
- Add today summary: total, completed, remaining, and percentage
- Add today's task preview with a link to the full Tasks page
- Add upcoming/overdue summary
- Add weekly progress preview
- Add quick-add task action
- Add honest empty, loading, and recoverable error states

Files: `src/pages/Dashboard.jsx`, `src/components/progress/*`, `src/components/tasks/*`, `src/utils/progressUtils.js`.

Verification: empty data and boundary values render correctly; no hardcoded progress appears as user data.

Exit gate: dashboard structure is ready to consume the shared planner state.

### Phase 4 — Task domain and CRUD

Objective: implement the first complete, useful workflow.

Tasks:

- Create task form with accessible labels
- Validate title, subject, priority, deadline, and notes
- Add task card/list with status, subject, priority, deadline, and overdue indicator
- Add edit flow that reuses the same validation
- Add complete/incomplete toggle with `completedAt` updates
- Add delete flow and confirmation for destructive deletion
- Add task filters: all, today, upcoming, completed, overdue
- Add sorting that is predictable and documented in the UI where useful

Files: `src/pages/Tasks.jsx`, `src/components/tasks/*`, `src/utils/validation.js`, `src/utils/dateUtils.js`, `src/data/constants.js`.

Verification: full CRUD matrix, invalid input, empty lists, same-day dates, overdue dates, keyboard-only interaction.

Exit gate: task management works fully in memory and never loses UI state unexpectedly.

### Phase 5 — Shared state and local persistence

Objective: make the app reliable across page changes and browser sessions.

Tasks:

- Add planner context or a clearly centralized state provider
- Add safe storage adapter with parse/serialize helpers
- Load initial data once
- Persist all task changes
- Add schedule persistence support in preparation for Phase 7
- Handle storage disabled, full, malformed, or unavailable states gracefully
- Add schema version key and migration boundary

Files: `src/context/StudyPlannerContext.jsx`, `src/hooks/*`, `src/services/storageService.js`, `src/utils/storageUtils.js`.

Verification: refresh, close/reopen, malformed values, storage errors, and multiple changes in sequence.

Exit gate: tasks survive a browser restart and UI components no longer own persistence logic.

### Phase 6 — Real progress and analytics foundation

Objective: calculate useful progress from the task domain without fake data.

Tasks:

- Calculate today totals and completion percentage
- Calculate current-week totals by local date
- Define how tasks with no deadline are treated
- Add completed count, remaining count, overdue count, and weekly activity
- Add progress page with a clear explanation of calculations
- Make zero-task and zero-activity states intentional

Files: `src/utils/progressUtils.js`, `src/pages/Progress.jsx`, `src/components/progress/*`.

Verification: no tasks, one task, all complete, mixed status, overdue tasks, week boundary, and local timezone behavior.

Exit gate: every statistic can be traced to stored task data.

### Phase 7 — Study schedule domain

Objective: add simple, reliable planning sessions.

Tasks:

- Add session form with date and time validation
- Add session list grouped or sorted by date/time
- Add edit and delete actions
- Add subject association without requiring a separate subject database
- Persist sessions through the shared storage adapter
- Add empty and invalid-data states

Files: `src/pages/Schedule.jsx`, `src/components/schedule/*`, context/service updates.

Verification: create/edit/delete, ordering, invalid time ranges, same-day sessions, mobile forms, persistence.

Exit gate: schedule is useful without introducing a heavy calendar dependency.

### Phase 8 — Settings, recovery, and privacy

Objective: give users control over local data and explain the product honestly.

Tasks:

- Add app information and version/build information where useful
- Explain local-only storage and device limitations
- Add clear-all-data confirmation modal
- Add recovery messaging if stored data cannot be read
- Add an optional export/import JSON feature only if it remains simple and safe
- Ensure no secret or personal data is sent anywhere in the MVP

Files: `src/pages/Settings.jsx`, `src/components/common/ConfirmationModal.jsx`, storage utilities.

Verification: cancel/confirm destructive action, corrupted data recovery, reload after reset, and privacy copy review.

Exit gate: users cannot accidentally erase data and understand where their data lives.

### Phase 9 — UX polish, accessibility, and responsive QA

Objective: turn functional screens into a comfortable product.

Tasks:

- Improve mobile tap targets and bottom navigation behavior
- Add loading, disabled, success, and error feedback
- Check modal focus behavior and Escape handling
- Check semantic headings, labels, button names, and screen-reader text
- Check contrast and non-color indicators
- Check long titles, long notes, empty subjects, and narrow screens
- Remove layout shifts and horizontal scrolling
- Add subtle transitions only where they improve clarity

Verification matrix: 320px phone, common Android phone, iPhone-sized viewport, tablet, desktop, keyboard, reduced-motion preference, and slow interaction simulation.

Exit gate: no known high-impact UX or accessibility defect remains.

### Phase 10 — PWA packaging and offline architecture

Objective: make the app installable and useful after the first successful load.

Tasks:

- Add `vite-plugin-pwa`
- Configure manifest name, short name, description, start URL, scope, standalone display, theme color, and background color
- Add original 192×192 and 512×512 icons, plus favicon/maskable variants if practical
- Configure service-worker app-shell caching
- Ensure localStorage data remains available offline
- Add an update strategy so new deployments can reach users safely
- Avoid caching secrets or unrelated external content

Files: `vite.config.js`, `public/icons/*`, `index.html`, and generated PWA output.

Verification: manifest validity, icon loading, service-worker registration, cache contents, standalone mode, and offline reload.

Exit gate: a production build is installable on supported browsers.

### Phase 11 — Automated and manual testing

Objective: catch regressions before deployment.

Tasks:

- Add lightweight unit tests for date, validation, storage, and progress utilities if test tooling remains low-cost and understandable
- Add a manual acceptance checklist for every MVP feature
- Test malformed localStorage data
- Test production preview, not only development mode
- Test browser console for errors and warnings
- Test PWA behavior through Chrome DevTools Application panel

Verification checklist:

1. Start, build, and preview
2. Add/edit/delete/complete/undo task
3. Priority, subject, deadline, notes
4. Daily and weekly calculations
5. Schedule CRUD
6. Settings reset confirmation
7. Refresh and browser reopening
8. Responsive layouts and no overflow
9. Manifest, icons, service worker, install, and offline

Exit gate: all critical checks pass and known limitations are documented.

### Phase 12 — Production cleanup and performance

Objective: remove prototype residue and keep the app lightweight.

Tasks:

- Remove unused Vite starter assets and dead code
- Remove unused dependencies
- Check bundle size and render performance
- Optimize icons and images
- Review error boundaries and fallback behavior
- Confirm production metadata and favicon
- Run final lint/build/preview checks

Exit gate: repository contains only intentional product code and assets.

### Phase 13 — GitHub repository and collaboration workflow

Objective: create a professional, reproducible public repository.

Tasks:

- Choose repository name and visibility
- Ensure branch and commit history are understandable
- Complete `.gitignore`
- Add README with features, screenshots, setup, PWA installation, deployment, and roadmap
- Add a short contributing/development workflow if useful
- Verify no secrets, `node_modules`, or unwanted `dist` output is committed
- Push the selected branch to GitHub

Exit gate: a clean clone can follow the README and reproduce the build.

### Phase 14 — Free Vercel deployment

Objective: publish the app using only the free Vercel tier.

Tasks:

- Import the GitHub repository into Vercel
- Use Vite settings: install `npm install`, build `npm run build`, output `dist`
- Deploy to the free HTTPS `vercel.app` domain
- Confirm the production branch and automatic deployment behavior
- Record the live URL in the README and status file

Exit gate: production URL loads successfully over HTTPS.

### Phase 15 — Production acceptance and handoff

Objective: verify the real public app and finish the MVP.

Tasks:

- Test production URL on desktop and mobile
- Test task CRUD, schedule, progress, refresh, and reset
- Install from Chrome on Android where available
- Test offline after first load
- Check service-worker updates after a new deployment
- Capture final screenshots
- Update README and `IMPLEMENTATION_STATUS.md`
- Create final release commit/tag if useful

Exit gate: the app is safe to demonstrate and the documentation matches reality.

### Phase 16 — Future product upgrades

Only after the MVP is stable:

- Supabase authentication and cloud synchronization
- Export/import backup improvements — first slice implemented and verified as local JSON backup in Settings
- Multi-device support
- Notifications and recurring tasks
- Streaks, goals, XP, and badges
- Pomodoro/focus mode
- Exam countdown and calendar integration
- AI-generated study plans and exam preparation assistant

Each future upgrade gets its own data, privacy, cost, and testing review before implementation.

## 6. Repository quality rules

- Keep changes small and explain the purpose of each phase.
- Do not claim a feature is complete without testing it.
- Do not add a backend, authentication, or AI to solve an MVP problem.
- Do not commit secrets, API keys, `node_modules`, or unnecessary build output.
- Do not use fake statistics in the UI.
- Update the status document after every completed phase.
- Use meaningful commits such as `Add task CRUD workflow` or `Add PWA manifest and offline caching`.

## 7. Final release checklist

- [ ] Clean install works
- [ ] Lint passes
- [ ] Production build passes
- [ ] Dashboard uses real data
- [ ] Task CRUD works
- [ ] Schedule CRUD works
- [ ] Progress is calculated dynamically
- [ ] Local data survives refresh and reopening
- [ ] Reset requires confirmation
- [ ] Responsive and accessible behavior is checked
- [ ] Manifest and icons work
- [ ] Service worker and offline mode work
- [ ] GitHub repository is clean and documented
- [ ] Vercel deployment is live
- [ ] Production acceptance tests pass
