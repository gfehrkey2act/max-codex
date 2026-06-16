import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const dbPath = process.env.DB_PATH ?? "./data/tinynotes.db";

const globalForDatabase = globalThis as typeof globalThis & {
  tinyNotesDatabase?: Database;
};

function ensureDatabaseDirectory(path: string): void {
  if (path === ":memory:" || path === "" || path.startsWith("file:")) {
    return;
  }

  mkdirSync(dirname(resolve(path)), { recursive: true });
}

function createDatabase(): Database {
  ensureDatabaseDirectory(dbPath);

  const database = new Database(dbPath, { create: true, strict: true });
  database.run("PRAGMA foreign_keys = ON;");

  return database;
}

const database = globalForDatabase.tinyNotesDatabase ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.tinyNotesDatabase = database;
}

export const auth = betterAuth({
  baseURL: process.env.APP_URL ?? process.env.BETTER_AUTH_URL,
  database,
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    requireEmailVerification: false,
  },
  secret: process.env.AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET,
  plugins: [nextCookies()],
});
