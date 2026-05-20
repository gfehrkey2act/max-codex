import { PageHeader } from "@/src/components/page-header";
import { PlaceholderPanel } from "@/src/components/placeholder-panel";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          description="Custom 404 placeholder for missing pages and resources."
          title="Not Found"
        />
        <div className="mt-10">
          <PlaceholderPanel label="404 placeholder" title="Missing route or resource">
            <p>Real resource lookup failures will route here when data access is implemented.</p>
          </PlaceholderPanel>
        </div>
      </div>
    </main>
  );
}
