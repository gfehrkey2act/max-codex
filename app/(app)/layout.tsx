import { PageShell } from "@/src/components/page-shell";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageShell eyebrow="Authenticated app routes" navItems={["Notes", "New note", "Account"]}>
      {children}
    </PageShell>
  );
}
