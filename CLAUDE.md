# DevVault

A developer knowledge hub: save code snippets, commands, prompts, notes and links in one searchable place. Free and Pro plans.
Full scope is in `context/project-overview.md`. Read it before planning any feature.

## About the developer (important)

The developer is learning and must be able to explain every line in an interview.

- After each feature, explain what you built and why, in plain language.
- Keep explanations short. Prefer a small example over theory.
- Never add a library or pattern without saying why it is needed.

## Stack

- Next.js (App Router), TypeScript, Tailwind, shadcn/ui
- Drizzle ORM + Neon Postgres (`neon-serverless` driver, so transactions work)
- Better Auth (email + password, Google, GitHub). Already built, do not rebuild.
- Resend + react-email, Zod, Stripe (Free/Pro), Cloudinary (attachments), Gemini free models (AI features)
- Vitest for unit tests, Playwright for end-to-end tests

## Commands

- `npm run dev` start the app
- `npm run db:generate` create a migration from schema changes
- `npm run db:migrate` apply migrations (never use `drizzle-kit push`)
- `npm run test` run tests

## Where things live

- `src/db/schema.ts` all tables and relations
- `src/db/index.ts` the `db` client (schema is passed in, so `db.query` works)
- `src/lib/plans.ts` `PLAN_LIMITS`: the only place plan limits are defined
- `src/lib/get-server-session.ts` current session on the server; `requireUser()` wraps it and throws if logged out
- `src/features/<feature>/` one folder per feature (items, collections, tags, billing, ...):
  - `actions.ts` server actions (mutations)
  - `queries.ts` reads
  - `schemas.ts` Zod schemas
  - `components/` UI for that feature
  - `*.test.ts` tests for that feature
- `src/app/` pages and routes only; keep them thin and call into `src/features/`
- `drizzle/` generated migrations (commit them)

## Database model

Auth tables (Better Auth, do not edit by hand): user, session, account, verification.
App tables:

- `item`: type (snippet, command, prompt, note, link, file, image), title, description, content, language, url, file_url, file_public_id, file_name, file_size, is_favorite, is_pinned, is_public
  - links use `url`; files and images use the `file_*` columns (the file itself lives in Cloudinary)
- `collection`: name, description, is_favorite
- `item_collection`: join table (item <-> collection, many-to-many)
- `tag` and `item_tag`: tags per user, join table to items
- `subscription`: one row per paying user (Stripe IDs, status). No row = Free.
- `item_version`: saved copy of an item's title/description/content/language/url on each edit

All app tables have `user_id` with `ON DELETE CASCADE`, except join tables and `item_version`, which are owned through their item.

## Rules

1. **Plan first.** For any feature, write a short plan and wait for approval before coding.
2. **State rendering per page.** For each page, say whether it is server-rendered (SSR) or client-rendered (CSR) and why.
3. **Validate all input with Zod** on the server.
4. **Authorize on the server, always.** Every server action and query starts with `requireUser()` and only touches rows where `user_id` is the current user. `proxy.ts` only redirects pages; it does not protect server actions. Hiding a button in the UI is not security.
5. **Join tables have no `user_id`.** Before inserting into `item_collection` or `item_tag`, check that both rows belong to the current user.
6. **Plan limits** are checked on the server using `PLAN_LIMITS`.
   - Pro = a `subscription` row with `status = 'active'`. Any other status (or no row) = Free.
   - Limits apply only when **creating** (items, collections, uploads). After a downgrade, existing data stays and stays editable.
   - File and image items are Pro only. When a file item is deleted, also delete it from Cloudinary using `file_public_id`.
   - When an account is deleted, first delete all of that user's Cloudinary files, then delete the user.
7. **Editing an item = one transaction:** save the old values to `item_version`, then update `item`. Both succeed or both fail (`db.transaction`).
8. **Tests before implementation** for business logic (limits, ownership checks, version history). Tests use a separate Neon branch (`DATABASE_URL` in `.env.test`). Never run tests against the dev database.
9. **Small commits**, one feature per commit, conventional messages (`feat(...)`, `fix(...)`).
10. **Frozen scope.** Do not add features that are not in `context/project-overview.md`. Suggest them instead.
11. Never commit `.env` or `.env.test`. Keep `.env.example` up to date.
12. **Stripe:** only the webhook (with its signature verified) writes to `subscription`. The checkout success page never changes the plan.
