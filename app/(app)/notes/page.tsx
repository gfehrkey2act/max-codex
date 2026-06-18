import Link from "next/link";
import { createNoteAction } from "@/src/lib/note-actions";
import { listNotesForUser } from "@/src/lib/notes";
import { getCurrentSession } from "@/src/lib/session";

export default async function NotesPage() {
  const session = await getCurrentSession();
  const notes = session === null ? [] : listNotesForUser(session.user.id);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--acc-strong)]">Your workspace</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[var(--foreground)] sm:text-5xl">
            Notes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Create, edit, and revisit your private rich text notes.
          </p>
        </div>
        <form action={createNoteAction}>
          <button
            className="rounded-md bg-[var(--acc-strong)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800"
            type="submit"
          >
            New note
          </button>
        </form>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--acc-border)] bg-white/70 p-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">No notes yet</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Start with a blank note, then use the editor to add formatted content.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {notes.map((note) => (
            <Link
              className="rounded-lg border border-[var(--acc-border)] bg-white/80 p-5 shadow-sm shadow-teal-950/5 transition hover:border-[var(--acc-strong)] hover:bg-white"
              href={`/notes/${note.id}`}
              key={note.id}
            >
              <article>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">
                    {note.title === "" ? "Untitled note" : note.title}
                  </h2>
                  <time className="text-sm text-[var(--muted)]" dateTime={note.updatedAt}>
                    Updated {formatUpdatedAt(note.updatedAt)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
