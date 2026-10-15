# CRISPER Studio Clone

CRISPER Studio is a cross-platform desktop/web research-workbench prototype for computational DNA sequence analysis, project tracking, and CRISPR editing *simulation*. It is a separate project within `Program-test`; it does not modify the ENIAC simulator.

## Source package

The full source package is provided as **CRISPER-Studio-Complete-Clone.zip** in the associated ChatGPT conversation. It contains 21 files, including the React/TypeScript interface, Electron desktop shell, SQLite schema, DNA analysis utilities, tests, and architecture/database documentation.

## Stack

- React + TypeScript + Vite for the user interface
- Electron for the Windows desktop shell
- SQLite for local project and experiment metadata
- Vitest for DNA utility tests

## Planned/implemented areas

- DNA sequence input and basic computational sequence statistics
- Research projects and experiment records
- Local SQLite persistence through Electron's main process
- CRISPR concept/simulation workspace (not laboratory control)
- Documentation and automated test scaffold

Feature completeness must be established by running the test and build commands below; the source package has not yet been verified in this environment.

## Run locally

Requires a supported Node.js release and npm.

```sh
npm install
npm test
npm run build
npm run desktop
```

Run commands from the extracted `CRISPER-Studio-Full/` directory. If a script is missing or fails, update `package.json` and the relevant source before treating the application as runnable.

## Safety and scope

This is computational research software. It must not be presented as a validated clinical tool, a substitute for expert review, or a workflow for performing biological experiments. Simulation results are illustrative and must be labeled as such. Do not include personal, patient-identifiable, or confidential genomic data in demo projects.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Database schema and data model](docs/DATABASE.md)
- [Repository roadmap](../../docs/ROADMAP.md)
