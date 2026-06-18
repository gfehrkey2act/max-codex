"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  deleteNoteAction,
  type NoteActionResult,
  updateNoteAction,
} from "@/src/lib/note-actions";
import { emptyTipTapDocument, type TipTapDocument } from "@/src/lib/tiptap";

type SaveStatus = "saved" | "unsaved" | "saving" | "error";

type NoteEditorProps = {
  id: string;
  title: string;
  contentJson: string;
  updatedAt: string;
};

type ToolbarButtonProps = {
  isActive?: boolean;
  label: string;
  onPress: () => void;
};

export function NoteEditor({ id, title, contentJson, updatedAt }: NoteEditorProps) {
  const router = useRouter();
  const [draftTitle, setDraftTitle] = useState(title);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [lastSavedAt, setLastSavedAt] = useState(updatedAt);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const [isDeleting, startDeleteTransition] = useTransition();
  const savedTitleRef = useRef(title);
  const savedContentRef = useRef(contentJson);
  const draftTitleRef = useRef(title);
  const isSavingRef = useRef(false);

  const editor = useEditor({
    content: parseInitialContent(contentJson),
    editorProps: {
      attributes: {
        "aria-label": "Note body",
        class: "tiptap-editor-content",
      },
    },
    extensions: [StarterKit],
    immediatelyRender: false,
    onUpdate({ editor: currentEditor }) {
      markUnsaved(draftTitleRef.current, JSON.stringify(currentEditor.getJSON()));
    },
  });

  const isDirty = saveStatus === "unsaved" || saveStatus === "error";
  const canSave = editor !== null && isDirty && !isSavingRef.current;
  const statusText = getStatusText(saveStatus);
  const formattedSavedAt = formatUpdatedAt(lastSavedAt);

  useEffect(() => {
    if (saveStatus !== "unsaved") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveCurrentNote();
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [revision, saveStatus]);

  function markUnsaved(nextTitle: string, nextContent: string): void {
    const hasChanges = nextTitle !== savedTitleRef.current || nextContent !== savedContentRef.current;
    setSaveStatus(hasChanges ? "unsaved" : "saved");
    setErrorMessage(null);
    setRevision((currentRevision) => currentRevision + 1);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const nextTitle = event.currentTarget.value;
    const nextContent = editor === null ? savedContentRef.current : JSON.stringify(editor.getJSON());

    draftTitleRef.current = nextTitle;
    setDraftTitle(nextTitle);
    markUnsaved(nextTitle, nextContent);
  }

  function handleSaveClick(): void {
    void saveCurrentNote();
  }

  function handleClearClick(): void {
    if (editor === null) {
      return;
    }

    editor.commands.setContent(emptyTipTapDocument);
    markUnsaved(draftTitleRef.current, JSON.stringify(emptyTipTapDocument));
  }

  function handleDeleteClick(): void {
    const confirmed = window.confirm("Delete this note? This cannot be undone.");

    if (!confirmed) {
      return;
    }

    startDeleteTransition(async () => {
      const result = await deleteNoteAction(id);

      if (result.ok) {
        router.replace("/notes");
        router.refresh();
        return;
      }

      setSaveStatus("error");
      setErrorMessage(result.error.message);
    });
  }

  async function saveCurrentNote(): Promise<void> {
    if (editor === null || isSavingRef.current) {
      return;
    }

    const content = editor.getJSON();
    const serializedContent = JSON.stringify(content);
    const nextTitle = draftTitleRef.current;

    if (nextTitle === savedTitleRef.current && serializedContent === savedContentRef.current) {
      setSaveStatus("saved");
      return;
    }

    isSavingRef.current = true;
    setSaveStatus("saving");
    setErrorMessage(null);

    const result = await updateNoteAction({
      contentJson: content,
      id,
      title: nextTitle,
    });

    isSavingRef.current = false;
    handleSaveResult(result, nextTitle, serializedContent);
  }

  function handleSaveResult(
    result: NoteActionResult,
    nextTitle: string,
    serializedContent: string,
  ): void {
    if (!result.ok) {
      setSaveStatus("error");
      setErrorMessage(result.error.message);
      return;
    }

    const normalizedSavedTitle = nextTitle.trim().slice(0, 160);
    const currentTitle = draftTitleRef.current;
    const currentContent = editor === null ? serializedContent : JSON.stringify(editor.getJSON());

    savedTitleRef.current = normalizedSavedTitle;
    savedContentRef.current = serializedContent;
    setLastSavedAt(result.updatedAt ?? new Date().toISOString());
    setSaveStatus(
      currentTitle === normalizedSavedTitle && currentContent === serializedContent ? "saved" : "unsaved",
    );
    router.refresh();
  }

  function handleParagraphClick(): void {
    editor?.chain().focus().setParagraph().run();
  }

  function handleHeadingOneClick(): void {
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  }

  function handleHeadingTwoClick(): void {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  }

  function handleBoldClick(): void {
    editor?.chain().focus().toggleBold().run();
  }

  function handleItalicClick(): void {
    editor?.chain().focus().toggleItalic().run();
  }

  function handleStrikeClick(): void {
    editor?.chain().focus().toggleStrike().run();
  }

  function handleBulletListClick(): void {
    editor?.chain().focus().toggleBulletList().run();
  }

  function handleOrderedListClick(): void {
    editor?.chain().focus().toggleOrderedList().run();
  }

  function handleBlockquoteClick(): void {
    editor?.chain().focus().toggleBlockquote().run();
  }

  function handleCodeBlockClick(): void {
    editor?.chain().focus().toggleCodeBlock().run();
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="note-editor-title">
      <div className="flex flex-col gap-3 border-b border-[var(--acc-border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--acc-strong)]">{statusText}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Last saved {formattedSavedAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded-md border border-[var(--acc-border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--acc-soft)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={editor === null || isDeleting}
            onClick={handleClearClick}
            type="button"
          >
            Clear
          </button>
          <button
            className="rounded-md bg-[var(--acc-strong)] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canSave || isDeleting}
            onClick={handleSaveClick}
            type="button"
          >
            {saveStatus === "saving" ? "Saving" : "Save"}
          </button>
          <button
            className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDeleting}
            onClick={handleDeleteClick}
            type="button"
          >
            {isDeleting ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>

      <label className="block" htmlFor="note-editor-title">
        <span className="sr-only">Note title</span>
        <input
          className="w-full rounded-md border border-[var(--acc-border)] bg-white px-3 py-3 text-2xl font-semibold text-[var(--foreground)] outline-none transition focus:border-[var(--acc-strong)] focus:ring-4 focus:ring-[var(--acc-soft)]"
          id="note-editor-title"
          maxLength={160}
          onChange={handleTitleChange}
          placeholder="Untitled note"
          type="text"
          value={draftTitle}
        />
      </label>

      <div className="rounded-lg border border-[var(--acc-border)] bg-white shadow-sm shadow-teal-950/5">
        <div className="flex flex-wrap gap-1 border-b border-[var(--acc-border)] bg-[var(--background)] p-2">
          <ToolbarButton
            isActive={editor?.isActive("paragraph")}
            label="Paragraph"
            onPress={handleParagraphClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("heading", { level: 1 })}
            label="H1"
            onPress={handleHeadingOneClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("heading", { level: 2 })}
            label="H2"
            onPress={handleHeadingTwoClick}
          />
          <ToolbarButton isActive={editor?.isActive("bold")} label="Bold" onPress={handleBoldClick} />
          <ToolbarButton
            isActive={editor?.isActive("italic")}
            label="Italic"
            onPress={handleItalicClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("strike")}
            label="Strike"
            onPress={handleStrikeClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("bulletList")}
            label="Bullet list"
            onPress={handleBulletListClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("orderedList")}
            label="Numbered list"
            onPress={handleOrderedListClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("blockquote")}
            label="Quote"
            onPress={handleBlockquoteClick}
          />
          <ToolbarButton
            isActive={editor?.isActive("codeBlock")}
            label="Code"
            onPress={handleCodeBlockClick}
          />
        </div>
        {editor === null ? (
          <div className="min-h-[360px] p-5 text-sm text-[var(--muted)]">Loading editor...</div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {errorMessage === null ? null : (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </section>
  );
}

function ToolbarButton({ isActive = false, label, onPress }: ToolbarButtonProps) {
  return (
    <button
      aria-pressed={isActive}
      className="rounded-md border border-transparent px-2.5 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--acc-border)] hover:bg-white aria-pressed:border-[var(--acc-strong)] aria-pressed:bg-[var(--acc-soft)] aria-pressed:text-[var(--acc-strong)]"
      onClick={onPress}
      type="button"
    >
      {label}
    </button>
  );
}

function parseInitialContent(contentJson: string): TipTapDocument {
  try {
    const parsed: unknown = JSON.parse(contentJson);

    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as TipTapDocument;
    }
  } catch {
    return emptyTipTapDocument;
  }

  return emptyTipTapDocument;
}

function getStatusText(status: SaveStatus): string {
  if (status === "unsaved") {
    return "Unsaved changes";
  }

  if (status === "saving") {
    return "Saving";
  }

  if (status === "error") {
    return "Error";
  }

  return "Saved";
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "just now";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
