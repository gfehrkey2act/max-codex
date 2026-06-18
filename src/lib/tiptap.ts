import type { JSONContent } from "@tiptap/core";

export type TipTapDocument = JSONContent & {
  type: "doc";
};

export const emptyTipTapDocument: TipTapDocument = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export const maxTipTapContentBytes = 256 * 1024;

export function parseTipTapDocument(value: string): TipTapDocument {
  try {
    const parsed: unknown = JSON.parse(value);

    if (isTipTapDocument(parsed)) {
      return parsed;
    }
  } catch {
    // Fall through to the empty document fallback.
  }

  return emptyTipTapDocument;
}

export function serializeTipTapDocument(content: unknown): string | null {
  if (!isTipTapDocument(content)) {
    return null;
  }

  const serialized = JSON.stringify(content);

  if (new TextEncoder().encode(serialized).byteLength > maxTipTapContentBytes) {
    return null;
  }

  return serialized;
}

function isTipTapDocument(value: unknown): value is TipTapDocument {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return (value as { type?: unknown }).type === "doc";
}
