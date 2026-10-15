# CRISPER Studio Clone

CRISPER Studio is a local-first computational DNA analysis and research-workbench prototype. It is a separate project within `Program-test`, distinct from the ENIAC simulator.

## Source tree

- `src/main.tsx` — React entry point
- `src/ui/App.tsx` — research workspace interface
- `src/ui/styles.css` — responsive dark command-center theme
- `src/core/dna.ts` — sequence validation, composition counts, GC percentage, reverse complement, in-silico edit preview, and illustrative sequence-window heuristic
- `src/core/store.ts` — typed browser-storage and desktop persistence adapter
- `electron/main.cjs` — Electron main process and validated SQLite IPC handlers
- `electron/preload.cjs` — isolated desktop API bridge
- `electron/schema.sql` — SQLite schema for projects, sequences, simulations, notes, and audit events
- `tests/dna.test.ts` — unit tests for the analysis utilities
- `docs/` — architecture, database, and implementation-status documentation
- `electron-builder.yml` — Windows NSIS packaging configuration
- `../../.github/workflows/crisper-studio.yml` — GitHub Actions test/build workflow

## Run in a browser

Requires Node.js 20+ and npm.

```sh
npm install
npm test
npm run build
npm run dev
```

Open the local URL printed by Vite.

## Run the Windows desktop shell

```sh
npm install
npm run desktop
```

The Electron main process stores records in a local SQLite database under Electron's application data directory. Native dependency setup can vary by Node/Electron version; if SQLite reports a native module ABI error, run `npm run rebuild:native` after installing the platform build prerequisites.

To build a Windows installer on Windows:

```sh
npm run package:win
```

## Data and safety

The browser prototype stores demo data in browser local storage; desktop mode uses SQLite. Sequence-window scores are transparent educational heuristics and are not validated biological predictions. This software does not provide clinical guidance, laboratory protocols, or validation of biological activity. Treat imported sequence data as sensitive and use only data you are authorized to process.

## Verification status

Source files and a GitHub Actions workflow are committed. A local dependency installation previously timed out in the execution environment, so test and production-build success must be confirmed by the workflow before a release is considered verified.
