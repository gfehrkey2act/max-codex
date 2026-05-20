import { PageShell } from "@/src/components/page-shell";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageShell eyebrow="Public routes" navItems={["Home", "Login", "Register", "Shared note"]}>
      {children}
    </PageShell>
  );
}
