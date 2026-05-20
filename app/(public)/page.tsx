import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function HomePage() {
  return (
    <>
      <PageHeader
        description="Dummy home route for the future auth-aware redirect. No redirect or session check is implemented yet."
        title="Home"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Future behavior" title="Authenticated users">
          <p>This route will eventually redirect authenticated users to the notes list.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="Future behavior" title="Guests">
          <p>This route will eventually redirect unauthenticated visitors to the login page.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
