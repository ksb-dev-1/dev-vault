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
- `item_version`: saved copy of an item's title/content/language on each edit

All app tables have `user_id` with `ON DELETE CASCADE`, except join tables and `item_version`, which are owned through their item.

## Rules

1. **Plan first.** For any feature, write a short plan and wait for approval before coding.
2. **State rendering per page.** For each page, say whether it is server-rendered (SSR) or client-rendered (CSR) and why.
3. **Validate all input with Zod** on the server.
4. **Authorize on the server, always.** Every query and mutation must check the logged-in user owns the data. Hiding a button in the UI is not security.
5. **Join tables have no `user_id`.** Before inserting into `item_collection` or `item_tag`, check that both rows belong to the current user.
6. **Plan limits** are checked on the server using `PLAN_LIMITS`. Pro = a `subscription` row with `status = 'active'`. File and image items are Pro only. When a file item is deleted, also delete it from Cloudinary using `file_public_id`.
7. **Editing an item = one transaction:** save the old values to `item_version`, then update `item`. Both succeed or both fail (`db.transaction`).
8. **Tests before implementation** for business logic (limits, ownership checks, version history).
9. **Small commits**, one feature per commit, conventional messages (`feat(...)`, `fix(...)`).
10. **Frozen scope.** Do not add features that are not in `context/project-overview.md`. Suggest them instead.
11. Never commit `.env`. Keep `.env.example` up to date.
