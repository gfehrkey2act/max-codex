"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNoteForUser, deleteNoteForUser, updateNoteForUser } from "@/src/lib/notes";
import { getCurrentSession } from "@/src/lib/session";

export type NoteActionResult =
  | {
      ok: true;
      updatedAt?: string;
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };

export async function createNoteAction(): Promise<void> {
  const session = await getCurrentSession();

  if (session === null) {
    redirect("/login");
  }

  const noteId = createNoteForUser(session.user.id);

  revalidatePath("/notes");
  redirect(`/notes/${noteId}`);
}

export async function updateNoteAction(input: {
  contentJson: unknown;
  id: string;
  title: string;
}): Promise<NoteActionResult> {
  const session = await getCurrentSession();

  if (session === null) {
    return actionError("UNAUTHORIZED", "Sign in to update this note.");
  }

  try {
    const updatedAt = updateNoteForUser({
      contentJson: input.contentJson,
      noteId: input.id,
      title: input.title,
      userId: session.user.id,
    });

    if (updatedAt === null) {
      return actionError("VALIDATION_ERROR", "Unable to save this note.");
    }

    revalidatePath("/notes");
    revalidatePath(`/notes/${input.id}`);

    return { ok: true, updatedAt };
  } catch (error) {
    console.error(error);
    return actionError("INTERNAL_ERROR", "Unable to save this note.");
  }
}

export async function deleteNoteAction(id: string): Promise<NoteActionResult> {
  const session = await getCurrentSession();

  if (session === null) {
    return actionError("UNAUTHORIZED", "Sign in to delete this note.");
  }

  try {
    const deleted = deleteNoteForUser(id, session.user.id);

    if (!deleted) {
      return actionError("NOT_FOUND", "Unable to delete this note.");
    }

    revalidatePath("/notes");

    return { ok: true };
  } catch (error) {
    console.error(error);
    return actionError("INTERNAL_ERROR", "Unable to delete this note.");
  }
}

function actionError(code: string, message: string): NoteActionResult {
  return {
    ok: false,
    error: {
      code,
      message,
    },
  };
}
