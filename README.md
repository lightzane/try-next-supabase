## Development

### Next.js

```bash
pnpm dev
```

### Supabase

Prerequisite: **Docker Desktop** (Or **OrbStack** — macOS)

```bash
pnpm supabase start

# seed data
pnpm supabase reset

# reset without seed
pnpm supabase reset --no-seed

# create a migration (after creating/modifying schemas)
pnpm supabase db diff -f <name>

# verify and apply migration
pnpm supabase reset

# stop
pnpm supabase stop
```
