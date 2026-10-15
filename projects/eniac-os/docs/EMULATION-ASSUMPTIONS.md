# Emulation assumptions

1. This is a software model inspired by ENIAC concepts, not a bit-for-bit or cycle-accurate reproduction.
2. Machine behavior must be explicit and deterministic; undocumented behavior must be marked as an implementation choice.
3. Decimal representation, sign handling, carry/overflow behavior, and sequencing rules must be specified before implementation.
4. Monitor commands and file formats are modern convenience features, not claims about the original ENIAC interface.
5. Historical details should be backed by citations to reliable primary or scholarly sources when added.
6. Every machine operation should have tests for normal values, boundary values, invalid input, and reset/repeat behavior.