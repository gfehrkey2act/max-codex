import { Database } from "bun:sqlite";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

type Direction = "up" | "down";

type Migration = {
  version: string;
  path: string;
  up: string;
  down: string;
};

type MigrationRow = {
  version: string;
};

const migrationsDir = resolve("migrations");
const dbPath = process.env.DB_PATH ?? "./data/tinynotes.db";
const direction = parseDirection(process.argv[2]);

function parseDirection(value: string | undefined): Direction {
  if (value === undefined || value === "up") {
    return "up";
  }

  if (value === "down") {
    return "down";
  }

  throw new Error(`Unsupported migration direction "${value}". Use "up" or "down".`);
}

function ensureDatabaseDirectory(path: string): void {
  if (path === ":memory:" || path === "" || path.startsWith("file:")) {
    return;
  }

  mkdirSync(dirname(resolve(path)), { recursive: true });
}

function loadMigrations(): Migration[] {
  return readdirSync(migrationsDir)
    .filter((fileName) => fileName.endsWith(".sql"))
    .sort((left, right) => left.localeCompare(right))
    .map((fileName) => {
      const path = join(migrationsDir, fileName);
      const sql = readFileSync(path, "utf8");
      const upMarker = "-- migrate:up";
      const downMarker = "-- migrate:down";
      const upStart = sql.indexOf(upMarker);
      const downStart = sql.indexOf(downMarker);

      if (upStart === -1 || downStart === -1 || downStart <= upStart) {
        throw new Error(`${fileName} must contain ordered "${upMarker}" and "${downMarker}" sections.`);
      }

      return {
        version: basename(fileName),
        path,
        up: sql.slice(upStart + upMarker.length, downStart).trim(),
        down: sql.slice(downStart + downMarker.length).trim(),
      };
    });
}

function ensureMigrationsTable(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);
}

function getAppliedVersions(db: Database): Set<string> {
  const rows = db.query("SELECT version FROM schema_migrations ORDER BY version;").all() as MigrationRow[];

  return new Set(rows.map((row) => row.version));
}

function timestamp(): string {
  return new Date().toISOString();
}

function migrateUp(db: Database, migrations: Migration[]): void {
  const appliedVersions = getAppliedVersions(db);
  const pendingMigrations = migrations.filter((migration) => !appliedVersions.has(migration.version));

  if (pendingMigrations.length === 0) {
    console.log("No pending migrations.");
    return;
  }

  const applyMigration = db.transaction((migration: Migration) => {
    db.run(migration.up);
    db.query("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?);").run(
      migration.version,
      timestamp(),
    );
  });

  for (const migration of pendingMigrations) {
    applyMigration(migration);
    console.log(`Applied ${migration.version}`);
  }
}

function migrateDown(db: Database, migrations: Migration[]): void {
  const appliedVersions = getAppliedVersions(db);
  const latestMigration = migrations
    .filter((migration) => appliedVersions.has(migration.version))
    .at(-1);

  if (latestMigration === undefined) {
    console.log("No applied migrations to roll back.");
    return;
  }

  const rollbackMigration = db.transaction((migration: Migration) => {
    db.query("DELETE FROM schema_migrations WHERE version = ?;").run(migration.version);
    db.run(migration.down);
  });

  rollbackMigration(latestMigration);
  console.log(`Rolled back ${latestMigration.version}`);
}

function main(): void {
  ensureDatabaseDirectory(dbPath);

  const migrations = loadMigrations();
  const db = new Database(dbPath, { create: true, strict: true });

  try {
    db.run("PRAGMA foreign_keys = ON;");
    ensureMigrationsTable(db);

    if (direction === "up") {
      migrateUp(db, migrations);
    } else {
      migrateDown(db, migrations);
    }
  } finally {
    db.close();
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
