# DevVault: Project Overview

## What it is

A place for developers to store the small, useful things they keep losing: code snippets, terminal commands, AI prompts, notes and links. One searchable vault instead of scattered files, bookmarks and chat history.

## Problem

Developers save useful snippets and commands in notes apps, old repos, browser bookmarks and chats. They can't find them later, and they never see how a snippet changed over time.

## Users

Individual developers and students who want a fast, personal knowledge base. Single-user accounts (no teams).

## Item types

Snippet, Command, Prompt, Note, Link.

## Features

### Must have

- Auth: email + password, Google, GitHub (done)
- Create, edit, delete items of all five types
- Collections (group items; an item can be in several collections)
- Tags
- Favorites and pins
- Search and filter (by type, tag, collection)
- Syntax highlighting and a code editor for snippets and commands
- Free and Pro plans with Stripe

### Standout

- **Version history:** every edit saves the old version; view past versions, compare, restore
- **Public share link** for an item (read-only, revocable)
- **AI helpers (Gemini free models):** auto-suggest tags, explain a snippet
- File/image attachments (Cloudinary)

### Last

- Change password, delete account
- Public profile, Chrome extension (optional, only if time allows)

## Plans

|                                  | Free                          | Pro       |
| -------------------------------- | ----------------------------- | --------- |
| Items                            | 5                             | Unlimited |
| Collections                      | 1                             | Unlimited |
| Version history, AI, attachments | Pro only (decide per feature) | Included  |

The Free limits of 5 items and 1 collection are for **testing**. Before deploying, change them in `src/lib/plans.ts` (planned: 50 items, 3 collections).

## Data model

See `CLAUDE.md` for the table list. Diagram: item and collection are many-to-many (`item_collection`), item and tag are many-to-many (`item_tag`), user has one optional `subscription`, item has many `item_version` rows.

## Non-goals

- No teams, sharing between accounts, or real-time collaboration
- No mobile app
- No separate backend: everything is in the Next.js app

## Definition of done

Deployed on a custom domain, Stripe test-mode upgrade works end to end, key logic covered by tests, README with screenshots and a short architecture explanation.
