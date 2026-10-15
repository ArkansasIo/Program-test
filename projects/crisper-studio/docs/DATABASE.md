# CRISPER Studio Database

The package defines its local SQLite schema in `electron/schema.sql`. Review that file as the source of truth when changing table definitions.

## Data model goals

- **Projects** group research workspaces and descriptive metadata.
- **Sequences** store sequence labels, validated nucleotide text, and analysis metadata.
- **Experiments** record simulation inputs, method/version labels, parameters, and results.
- **Audit events** may record application-level changes without storing unnecessary sensitive data.
- **Settings** store user interface and local application preferences.

## Integrity and security

- Enable SQLite foreign-key enforcement for each connection.
- Use prepared/parameterized statements.
- Validate DNA alphabet and length before persistence.
- Use transactions for multi-table changes.
- Back up the database before migrations.
- Do not log raw genomic sequences unless the user explicitly enables a suitable local diagnostic mode.
- Keep real patient or identifiable genomic data out of sample fixtures.

## Migrations

Schema changes should be versioned and tested against both a new database and a copy of the prior supported schema. Avoid silently dropping user data. The current clone is an initial prototype; a formal migration runner and recovery tests should be added before production use.
