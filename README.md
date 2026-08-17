# Anchorboard

Anchorboard is a small context-switch planner for turning scattered tasks into calm, compatible work sessions.

## Features

- Add tasks with duration and mental-energy level.
- See the total amount of planned work at a glance.
- Persist the board in localStorage.
- English and Arabic translations with automatic RTL direction.
- Light and dark themes.
- Zod validation for task input.
- Two TanStack Router routes: the board and an explanation guide.
- Small shadcn/ui-inspired components included in `src/components/ui`.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. To make a production build:

```bash
npm run build
npm run preview
```

## Concept

The app is intentionally not an urgency-driven task list. It asks what kind of energy a task requires, helping users batch similar work and protect attention from unnecessary context switching.