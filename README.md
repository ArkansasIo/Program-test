# Program-test

A repository for experimental computing systems and historical computer/operating-system emulation projects.

## Current project: ENIAC OS research clone

This repository is being organized as a reproducible software model of an ENIAC-inspired computing environment. The implementation is an educational emulator and command-line workbench; it is not an original ENIAC control system and does not claim cycle-accurate hardware reproduction.

### Planned layout

- `projects/eniac-os/` — standalone ENIAC-inspired environment
- `docs/` — architecture, design notes, and implementation status
- `tests/` — automated tests
- `.github/workflows/` — build and test automation

### Scope

The project aims to provide a deterministic software simulation of a decimal arithmetic machine, configurable program steps, memory/register inspection, and a simple monitor interface. Historical claims and modeled behavior will be documented separately from new software conveniences.

## Status

Initial repository scaffold. Features are not considered complete until implemented and covered by tests.

## Development

See `docs/ROADMAP.md` and `projects/eniac-os/README.md` as they are added.