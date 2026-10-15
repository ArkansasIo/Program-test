# ENIAC OS — Educational Software Model

This folder contains the planned standalone ENIAC-inspired machine simulator and monitor. The name is descriptive: ENIAC was an electronic numerical integrator and computer, not a modern general-purpose computer with a conventional operating system. This project models selected concepts in software rather than asserting that ENIAC ran this OS.

## Planned modules

- `src/machine/` — decimal registers, arithmetic units, and machine state.
- `src/program/` — program-step representation and sequencing.
- `src/monitor/` — interactive command interface.
- `src/io/` — program and trace persistence.
- `tests/` — unit and integration tests.
- `docs/` — architecture and emulation assumptions.

## Planned capabilities

- Deterministic decimal arithmetic model.
- Inspectable machine state and execution trace.
- Program-step loading and saving in a documented text format.
- Testable monitor commands.

## Status

Documentation scaffold only. Source modules will be added as the model is implemented and tested.