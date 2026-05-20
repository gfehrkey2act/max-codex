import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function NotesPage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future authenticated notes list."
        title="Notes"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="List placeholder" title="User notes">
          <p>Notes sorted by last updated will be rendered here once data access exists.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="Empty state placeholder" title="No notes yet">
          <p>The real empty state will be added with note creation support.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
