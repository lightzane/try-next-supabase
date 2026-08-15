Reference: https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=pkce

## Adding Password-Based Auth

Also, this was discovered in https://supabase.com/library/docs/nextjs/password-based-auth
which generates the entire block with ease.

```bash
pnpm dlx shadcn@latest add @supabase/password-based-auth-nextjs
```

Result:

```bash
 Checking registry.
✔ Installing dependencies.
✔ The file button.tsx already exists. Would you like to overwrite? … no
✔ The file client.ts already exists. Would you like to overwrite? … no
✔ The file server.ts already exists. Would you like to overwrite? … no
✔ Created 18 files:
  - src/components/ui/card.tsx
  - src/components/ui/input.tsx
  - src/components/ui/label.tsx
  - src/app/auth/login/page.tsx
  - src/app/auth/error/page.tsx
  - src/app/protected/page.tsx
  - src/app/auth/confirm/route.ts
  - src/components/login-form.tsx
  - src/middleware.ts
  - src/app/auth/sign-up/page.tsx
  - src/app/auth/sign-up-success/page.tsx
  - src/components/sign-up-form.tsx
  - src/app/auth/forgot-password/page.tsx
  - src/app/auth/update-password/page.tsx
  - src/components/forgot-password-form.tsx
  - src/components/update-password-form.tsx
  - src/components/logout-button.tsx
  - src/lib/supabase/middleware.ts
ℹ Skipped 3 files: (files might be identical, use --overwrite to overwrite)
  - src/components/ui/button.tsx
  - src/lib/supabase/client.ts
  - src/lib/supabase/server.ts
```

- But I have removed auto-generated `middleware.ts`
  as `proxy.ts` was already created and since in Next.js v16+ uses `proxy.ts`
- I have also fixed the bug in resetting the passowrd by redirecting to `/auth/callback` before `/auth/update-password` (see [`forget-password-form.tsx`](./src/components/forgot-password-form.tsx#33))
- Also replaced deprecated typing from ~~`React.FormEvent`~~ to `React.SubmitEvent`

Note on `components.json`:

```json
{
  "registries": {
    "@supabase": "https://supabase.com/ui/r/{name}.json"
  }
}
```

This tells the CLI: "the namespace `@supabase` resolves to Supabase's own component registry." So instead of only running npx shadcn add button, you could run something like:

```bash
pnpm dlx shadcn@latest add @supabase/password-based-auth-nextjs
```

and the CLI substitutes `{name}` into the URL template (`https://supabase.com/ui/r/password-based-auth-nextjs.json`), fetches that registry item's manifest (source files, dependencies, etc.), and installs it into your project using the aliases paths defined above (`@/components`, `@/lib`, etc.).
