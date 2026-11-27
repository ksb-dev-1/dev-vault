# DevVault: Project Overview

## What it is

A place for developers to store the small, useful things they keep losing: code snippets, terminal commands, AI prompts, notes and links. One searchable vault instead of scattered files, bookmarks and chat history.

## Problem

Developers save useful snippets and commands in notes apps, old repos, browser bookmarks and chats. They can't find them later, and they never see how a snippet changed over time.

## Users

Individual developers and students who want a fast, personal knowledge base. Single-user accounts (no teams).

## Item types

- All plans: Snippet, Command, Prompt, Note, Link
- Pro only: File, Image (stored in Cloudinary)

## Features

### Must have

- Auth: email + password, Google, GitHub (done)
- Create, edit, delete items of all types: five on every plan (snippet, command, prompt, note, link) and two Pro only (file, image)
- Item detail opens in a side drawer with Favorite, Pin, Copy, Edit, Delete
- **Copy button:** copies content (snippet, command, prompt, note), URL (link) or file URL (file, image)
- Collections (group items; an item can be in several collections)
- Tags
- **Pins:** "need it now". Dashboard shows the first 5 pinned items, with a "Show more" button for the rest
- **Favorites:** "keep for later". Items have a Favorites filter. Favorite collections show at the top of the sidebar under "Favorites"; the rest show under "Other collections" (no duplicates). Collections can be favorited, not pinned
- **Search:** matches title, description, content and tag names. Case-insensitive, partial match (`ILIKE`). Combines with filters
- **Filter** by type, tag, collection, favorites
- **Ctrl+K / Cmd+K** focuses the search box
- Syntax highlighting and a code editor for snippets and commands
- Free and Pro plans with Stripe
- File and image items with Cloudinary uploads (Pro only, max 5 MB per file)

### Standout

- **Version history:** every edit saves the old title, description, content, language and url; view past versions, compare, restore. Free keeps the last 3 versions per item, Pro unlimited
- **Public share link** for an item (read-only, revocable):
  - `/share/[itemId]` shows the item only when `is_public = true`; turning sharing off makes the link "Not found"
  - Available on Free and Pro
  - Snippet, command, prompt, note, link only (no files or images)
  - Shows title, description, content (highlighted), language and a Copy button. Hides tags, collections and owner info
- **AI helpers (Gemini free models, Pro only):** auto-suggest tags, explain a snippet

### Last

- Change password, delete account
- Landing page: built after all features are done, and lists only features that actually exist
- Public profile, Chrome extension (optional, only if time allows)

## Plans

|                      | Free            | Pro       |
| -------------------- | --------------- | --------- |
| Items                | 5               | Unlimited |
| Collections          | 1               | Unlimited |
| File and image items | Not available   | Included (max 5 MB each) |
| Version history      | Last 3 per item | Unlimited |
| AI helpers           | Not available   | Included  |
| Public share link    | Included        | Included  |

- Pro = Stripe subscription with status `active`. Any other status = Free.
- Limits apply only when creating something. If a Pro user downgrades, they keep all existing items, collections, files and versions, and can still edit and delete them; they just can't create more than the Free limits allow.

The Free limits of 5 items and 1 collection are for **testing**. Before deploying, change them in `src/lib/plans.ts` (planned: 50 items, 3 collections).

## Data model

See `CLAUDE.md` for the table list. Diagram: item and collection are many-to-many (`item_collection`), item and tag are many-to-many (`item_tag`), user has one optional `subscription`, item has many `item_version` rows.

Planned schema change: add `description` and `url` to `item_version` (when building version history).

## Out of scope

Seen in design references but not planned: AI summaries, prompt optimizer, data export, yearly billing, free trial.

## Non-goals

- No teams, sharing between accounts, or real-time collaboration
- No mobile app
- No separate backend: everything is in the Next.js app

## Definition of done

Deployed on a custom domain, Stripe test-mode upgrade works end to end, key logic covered by tests, README with screenshots and a short architecture explanation.
