# CRISPER Studio Clone

CRISPER Studio is a computational DNA analysis and research-workbench prototype. It is a separate project within `Program-test`, distinct from the ENIAC simulator.

## Current repository implementation

The browser prototype and core sequence utilities are committed here:

- `src/main.tsx` — React browser UI
- `src/core/dna.ts` — sequence validation, counts, GC percentage, reverse complement, edit preview, illustrative sequence-window scoring
- `tests/dna.test.ts` — core utility tests
- `index.html`, `vite.config.ts`, `tsconfig.json`, `package.json` — web tooling
- `../../.github/workflows/crisper-studio.yml` — CI workflow for tests and production build

## Full desktop source archive

The supplied **CRISPER-Studio-Complete-Clone.zip** contains the additional Electron shell, SQLite schema, local persistence adapter, expanded UI, and related documentation. Not all files from that archive have been copied into this repository yet; the current GitHub project should be treated as a browser prototype plus documentation, not a complete desktop clone.

## Run the browser prototype

Requires Node.js 20+ and npm.

```sh
npm install
npm test
npm run build
npm run dev
```

Run these commands from this directory. Open the local URL printed by Vite.

## Verification status

Dependency installation was attempted in the current execution environment but timed out. The tests and production build have not been confirmed to pass here. The CI workflow is configured to run both on GitHub Actions.

## Safety and scope

This is computational research software. Sequence-window scores are illustrative heuristics, not validated biological predictions. The project does not provide laboratory protocols or validate biological activity.
