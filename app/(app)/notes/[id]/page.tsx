import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteEditor } from "@/src/components/note-editor";
import { getNoteForUser } from "@/src/lib/notes";
import { getCurrentSession } from "@/src/lib/session";

type NoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const [{ id }, session] = await Promise.all([params, getCurrentSession()]);

  if (session === null) {
    notFound();
  }

  const note = getNoteForUser(id, session.user.id);

  if (note === null) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        className="w-fit text-sm font-semibold text-[var(--acc-strong)] underline-offset-4 hover:underline"
        href="/notes"
      >
        Back to notes
      </Link>
      <NoteEditor
        contentJson={note.contentJson}
        id={note.id}
        title={note.title}
        updatedAt={note.updatedAt}
      />
    </div>
  );
}
