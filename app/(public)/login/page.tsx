import { PageHeader } from "@/src/components/page-header";
import { PlaceholderGrid } from "@/src/components/placeholder-grid";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function LoginPage() {
  return (
    <>
      <PageHeader
        description="Placeholder route for the future email and password login form."
        title="Login"
      />
      <PlaceholderGrid>
        <PlaceholderPanel label="Form placeholder" title="Credentials">
          <p>Email and password fields will be added when authentication is implemented.</p>
        </PlaceholderPanel>
        <PlaceholderPanel label="State placeholder" title="Validation">
          <p>Generic inline validation messages will be added later.</p>
        </PlaceholderPanel>
      </PlaceholderGrid>
    </>
  );
}
