# Program-test

A collection of experimental computing projects, software emulators, and research workbenches maintained in a single repository.

## Projects

### CRISPER Studio

**Location:** [`projects/crisper-studio/`](projects/crisper-studio/)

A local-first computational DNA sequence analysis and research-workbench prototype, with a React + TypeScript browser interface, optional Electron desktop shell, and SQLite persistence in desktop mode.

- Sequence normalization and validation for A, C, G, T, and N.
- Base composition, GC percentage, and reverse-complement analysis.
- In-silico edit previews and clearly labelled illustrative sequence-window scores.
- Browser storage and desktop SQLite-backed project, sequence, simulation, and note records.
- Unit tests and GitHub Actions CI.
- GitHub Pages deployment workflow.

**Web app:** [Open CRISPER Studio on GitHub Pages](https://arkansasio.github.io/Program-test/)

See the [CRISPER Studio README](projects/crisper-studio/README.md), [architecture guide](projects/crisper-studio/docs/ARCHITECTURE.md), [database guide](projects/crisper-studio/docs/DATABASE.md), and [implementation status](projects/crisper-studio/docs/IMPLEMENTATION-STATUS.md).

### ENIAC-inspired emulator (planned)

The repository originally contained planning notes for an educational ENIAC-inspired decimal-machine emulator. That implementation is **not yet present** in the current source tree. See [the roadmap](docs/ROADMAP.md) for the historical plan; do not treat it as implemented functionality.

## Development: CRISPER Studio

Requires Node.js 20 or newer and npm.

```sh
cd projects/crisper-studio
npm install
npm test
npm run build
npm run dev
```

To start the optional Electron desktop shell:

```sh
npm run desktop
```

To build a Windows installer on a Windows host:

```sh
npm run package:win
```

## GitHub Pages

The deployment workflow is [`.github/workflows/crisper-studio-pages.yml`](.github/workflows/crisper-studio-pages.yml). In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The current Vite base path targets the project URL `/Program-test/`.

## Scientific and data-safety limitations

CRISPER Studio is a software prototype for computational exploration. Its sequence-window score is a transparent UI heuristic, not a validated biological prediction. It is not clinical software and does not supply wet-lab protocols. Imported sequence data may be sensitive; process only data you are authorized to use.

## Verification

The source includes unit tests and build workflows, but a release should only be marked verified after GitHub Actions completes successfully. Check [the latest workflow runs](https://github.com/ArkansasIo/Program-test/actions) for the current result.
