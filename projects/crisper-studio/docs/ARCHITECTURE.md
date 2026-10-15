# CRISPER Studio Architecture

## Components

1. **Renderer UI** — React and TypeScript screens, forms, tables, and analysis views.
2. **Desktop host** — Electron main process creates the application window and owns privileged operations.
3. **Preload bridge** — a narrow, explicit IPC API exposes only required database operations to the renderer.
4. **Persistence** — SQLite stores local project, sequence-analysis, and experiment metadata.
5. **Analysis core** — pure TypeScript utilities perform input validation and deterministic sequence calculations.
6. **Tests** — unit tests cover core sequence functions independently of the desktop shell.

## Trust boundaries

The renderer must not receive unrestricted Node.js access. Keep `contextIsolation` enabled and `nodeIntegration` disabled. Validate all IPC arguments in the main process, use parameterized SQL statements, and avoid arbitrary SQL from the renderer. Treat imported sequence files and project metadata as untrusted input.

## Data flow

`UI input → validation → pure analysis function → displayed result`

Persistence flow:

`UI action → typed preload API → validated IPC handler → parameterized SQLite query`

## Verification

From the package root:

```sh
npm install
npm test
npm run build
npm run desktop
```

These commands are the intended verification path. A successful result must be recorded only after each command has actually run. This repository copy currently documents the package; it does not claim that these checks have passed.
