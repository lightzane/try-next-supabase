# Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).
Enforced automatically on `main` branch by `scripts/verify-commit.cjs`.

---

## Anatomy of a Commit Message

```
<type>(<scope>): <summary>

[optional body]
```

The `(<scope>)` is optional — use it to name the area of the codebase affected:

```
feat(kofi): add expandable FAB with donate link
^──^ ^───^  ^─────────────────────────────────^
 │     │                     │
 │     │                     └─ summary — imperative mood ("add", not "added" or "adds")
 │     │                        max 72 characters
 │     └─ scope — component, module, or feature area (optional)
 └─ type (see table below)
```

Without a scope:

```
feat: add emoji reaction picker to chat messages
^──^  ^────────────────────────────────────────^
 │                        │
 │                        └─ summary — imperative mood, max 72 characters
 └─ type (see table below)
```

The optional body is for non-obvious context only — the _why_, not the _what_:

```
fix: prevent confetti worker singleton from displacing dust canvas

canvas-confetti's getWorker() is a module-level IIFE that shares one
Worker across all instances using useWorker:true. When schoolPride
fires, it calls worker.init(globalCanvas) and overwrites the Worker's
active binding, silently displacing the dust canvas. After schoolPride
ends its canvas is removed from the DOM, leaving the Worker bound to
a detached OffscreenCanvas — all subsequent dust bursts render to it
invisibly. Setting useWorker:false on the dust instance gives it an
independent main-thread rendering path.
^─────────────────────────────────────────────────────────────────────^
│
└─ body — only when the fix is not obvious from reading the diff
```

---

## Types

| Type       | Use when…                                                                    |
| ---------- | ---------------------------------------------------------------------------- |
| `feat`     | Adding a new feature or user-visible behavior                                |
| `fix`      | Correcting a bug                                                             |
| `style`    | Visual/UI changes only — CSS, spacing, colors, layout; **zero logic change** |
| `chore`    | Build, config, tooling, or dependency changes                                |
| `docs`     | Documentation only                                                           |
| `refactor` | Restructuring code without changing behavior                                 |
| `test`     | Adding or updating tests                                                     |
| `perf`     | Measurable performance improvement                                           |

> **`style` vs `chore` vs `refactor`**
>
> - `style` — what the _user_ sees changes (colors, spacing, layout). No TypeScript logic touched.
> - `chore` — what the _developer_ sees changes (config, build scripts, deps). No product behavior touched.
> - `refactor` — code is restructured (renamed, extracted, reorganized) but behavior is identical.

---

## Branch Naming

Branch names follow the same type prefix as the commit:

```
feat/<short-description>
fix/<short-description>
style/<short-description>
chore/<short-description>
docs/<short-description>
refactor/<short-description>
perf/<short-description>
```

Examples:

```
feat/chat-reply-threading
fix/confetti-worker-singleton
style/home-page-hero-spacing
chore/upgrade-vite-7
docs/add-readme-and-dev-guide
refactor/extract-stone-manager
```

---

## When Is This Enforced?

Only on **`main`**. Feature branches are free — `wip`, `draft`, `checkpoint`,
`fix typo` are all fine and are squashed away before they ever reach `main`.

---

## Good vs Bad

```
✅  feat: add QR code color picker to settings
✅  feat(kofi): add expandable FAB with donate link
✅  fix: clear default favicon icon when QR URL changes
✅  fix(fanorona): prevent double-capture on withdrawal move
✅  style: position Lite badge at top-right of home page title
✅  chore: upgrade Tailwind CSS to v4
✅  docs: add README and development guide
✅  refactor: extract stone animation logic into stone-manager utility
```

```
❌  updates                           — vague, no type
❌  fix bug                           — which bug?
❌  WIP: still working                — draft message on main
❌  added the thing John asked for    — no type, references a person
❌  FEAT: Add Thing                   — wrong case (must be lowercase)
❌  feat: added a new thing           — wrong mood (use "add", not "added")
```
