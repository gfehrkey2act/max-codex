import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function NewNotePage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future new note editor."
        title="New Note"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Editor placeholder" title="TipTap editor">
          <p>The rich text editor will be mounted here in a later implementation step.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="Action placeholder" title="Create note">
          <p>Server Action submission is intentionally not implemented in this scaffold.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
