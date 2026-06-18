import { createNoteAction } from "@/src/lib/note-actions";

export default function NewNotePage() {
  return (
    <section className="max-w-2xl rounded-lg border border-[var(--acc-border)] bg-white/80 p-6 shadow-sm shadow-teal-950/5">
      <p className="text-sm font-medium text-[var(--acc-strong)]">New note</p>
      <h1 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">Create a blank note</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        TinyNotes creates the note first, then opens the editor so every change has a secure place to
        autosave.
      </p>
      <form action={createNoteAction} className="mt-6">
        <button
          className="rounded-md bg-[var(--acc-strong)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800"
          type="submit"
        >
          Create note
        </button>
      </form>
    </section>
  );
}
