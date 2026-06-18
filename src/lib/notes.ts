import "server-only";

import { randomUUID } from "node:crypto";
import { database } from "@/src/lib/auth";
import { emptyTipTapDocument, parseTipTapDocument, serializeTipTapDocument } from "@/src/lib/tiptap";

export type NoteListItem = {
  id: string;
  title: string;
  shareEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NoteDetail = NoteListItem & {
  contentJson: string;
};

type NoteListRow = {
  id: string;
  title: string;
  share_enabled: number;
  created_at: string;
  updated_at: string;
};

type NoteDetailRow = NoteListRow & {
  content_json: string;
};

export function listNotesForUser(userId: string): NoteListItem[] {
  const rows = database
    .query(
      `
        SELECT id, title, share_enabled, created_at, updated_at
        FROM note
        WHERE user_id = ?
        ORDER BY updated_at DESC;
      `,
    )
    .all(userId) as NoteListRow[];

  return rows.map(mapNoteListRow);
}

export function getNoteForUser(noteId: string, userId: string): NoteDetail | null {
  const row = database
    .query(
      `
        SELECT id, title, share_enabled, content_json, created_at, updated_at
        FROM note
        WHERE id = ? AND user_id = ?
        LIMIT 1;
      `,
    )
    .get(noteId, userId) as NoteDetailRow | null;

  if (row === null) {
    return null;
  }

  return {
    ...mapNoteListRow(row),
    contentJson: JSON.stringify(parseTipTapDocument(row.content_json)),
  };
}

export function createNoteForUser(userId: string): string {
  const id = randomUUID();
  const now = timestamp();
  const contentJson = JSON.stringify(emptyTipTapDocument);

  database
    .query(
      `
        INSERT INTO note (id, user_id, title, content_json, share_enabled, created_at, updated_at)
        VALUES (?, ?, '', ?, 0, ?, ?);
      `,
    )
    .run(id, userId, contentJson, now, now);

  return id;
}

export function updateNoteForUser(input: {
  contentJson: unknown;
  noteId: string;
  title: string;
  userId: string;
}): string | null {
  const serializedContent = serializeTipTapDocument(input.contentJson);

  if (serializedContent === null) {
    return null;
  }

  const updatedAt = timestamp();
  const result = database
    .query(
      `
        UPDATE note
        SET title = ?, content_json = ?, updated_at = ?
        WHERE id = ? AND user_id = ?;
      `,
    )
    .run(normalizeTitle(input.title), serializedContent, updatedAt, input.noteId, input.userId);

  return result.changes === 1 ? updatedAt : null;
}

export function deleteNoteForUser(noteId: string, userId: string): boolean {
  const result = database
    .query("DELETE FROM note WHERE id = ? AND user_id = ?;")
    .run(noteId, userId);

  return result.changes === 1;
}

function mapNoteListRow(row: NoteListRow): NoteListItem {
  return {
    id: row.id,
    title: row.title,
    shareEnabled: row.share_enabled === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeTitle(title: string): string {
  return title.trim().slice(0, 160);
}

function timestamp(): string {
  return new Date().toISOString();
}
