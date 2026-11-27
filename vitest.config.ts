import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { parse } from "dotenv";
import { defineConfig } from "vitest/config";

// Tests must never use the dev database (CLAUDE.md rule 8).
// Variables come only from .env.test. DATABASE_URL starts empty, so if
// .env.test is missing, any test that touches the DB fails loudly instead of
// silently falling back to the dev database in .env.
const testEnv = existsSync(".env.test")
  ? parse(readFileSync(".env.test"))
  : {};

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    env: { DATABASE_URL: "", ...testEnv },
  },
});
