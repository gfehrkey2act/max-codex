import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function NoteDetailPage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future note editor and share controls."
        title="Note Detail"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Editor placeholder" title="Existing note">
          <p>Owned note content will be loaded and edited here later.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="Share placeholder" title="Public link controls">
          <p>Enable and disable share controls will be added after note actions exist.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
