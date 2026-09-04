# Akshit Manik — Portfolio

This directory is the single source of truth for the portfolio homepage and all five case studies.

## Commands

```bash
npm install
npm run dev
npm run build
npm start
```

Run commands from this directory. The case studies are npm workspaces, so they share the root dependency installation and lockfile; do not install dependencies inside each case-study folder.

## Structure

- `app/` — lightweight application shell and portfolio routes.
- `homepage/` — source files for the portfolio homepage.
- `case-studies/` — only the source code and runtime assets unique to each case study.
- `source-assets/` — original design exports, research, and archived project-tool metadata that is not shipped to visitors.
- `public/shared/` — scripts and styles shared by the homepage and case studies.
- `scripts/` — build orchestration and asset preparation.
- `dist/` — generated production build; recreated by `npm run build`.

The build script compiles each app, assembles the static case-study output, and then removes temporary build folders. Generated copies under `public/` are intentionally ignored by Git.
