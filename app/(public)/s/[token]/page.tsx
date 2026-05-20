import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function SharedNotePage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future public shared note view."
        title="Shared Note"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Content placeholder" title="Sanitized note">
          <p>Sanitized rendered note content will appear here after share lookup is implemented.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="Route placeholder" title="Token handling">
          <p>The token segment is present in the route, but no token lookup is performed yet.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
