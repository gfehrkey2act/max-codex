import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future account registration form."
        title="Register"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Form placeholder" title="Account details">
          <p>Name, email, and password fields will be added with better-auth later.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="State placeholder" title="Registration result">
          <p>Success and error states are intentionally not wired in this scaffold.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
