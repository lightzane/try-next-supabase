// @ts-check
const pico = require("picocolors")
const { execSync } = require("node:child_process")
const { readFileSync } = require("node:fs")
const path = require("node:path")

// Feature branches allow any message (wip, draft, checkpoint, etc.).
// Only squash commits landing on `main` must follow Conventional Commits.
// See .github/commit-convention.md — "Squash Commit Message Format".
let branch = ""
try {
  branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim()
} catch {
  // Detached HEAD (rebase, bisect) — fall through and enforce.
}

if (branch && branch !== "main") {
  process.exit(0)
}

// ------- Enforce Conventional Commits on squash commits to main -------

const msgPath = path.resolve(".git/COMMIT_EDITMSG") // https://git-scm.com/docs/git-commit#Documentation/git-commit.txt-GITDIRCOMMITEDITMSG
const msg = readFileSync(msgPath, "utf-8").trim()

// Types must match .github/commit-convention.md exactly.
// Optional scope (...) is allowed but not required by convention.
// The `m` flag makes `$` match end-of-line, enforcing the 72-char cap on the
// summary only. `.` still won't match `\n`, so the optional body is untouched.
const commitRE = /^(revert: )?(feat|fix|style|chore|docs|refactor|test|perf)(\(.+\))?: .{1,72}$/m

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${pico.white(pico.bgRed(" ERROR "))} ${pico.red(`invalid commit message format.`)}\n\n` +
      pico.red(`  Squash commits to main must follow Conventional Commits:\n\n`) +
      `    ${pico.green(`feat: add emoji reaction picker to chat messages`)}\n` +
      `    ${pico.green(`fix: prevent confetti worker singleton displacing dust canvas`)}\n` +
      `    ${pico.green(`chore: upgrade Tailwind CSS to v4`)}\n` +
      `    ${pico.green(`style: tighten spacing on home page hero`)}\n\n` +
      pico.red(`  Valid types: feat  fix  style  chore  docs  refactor  test  perf\n`) +
      pico.red(`  Summary must be ≤72 characters.\n`) +
      pico.red(`  See .github/commit-convention.md for full guidelines.\n`)
  )
  process.exit(1)
}
