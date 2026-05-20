import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  eyebrow?: string;
  navItems?: string[];
};

export function PageShell({ children, eyebrow, navItems = [] }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between border-b border-[var(--acc-border)] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--acc-strong)]">
              TinyNotes
            </p>
            {eyebrow ? <p className="mt-1 text-sm text-[var(--muted)]">{eyebrow}</p> : null}
          </div>
          {navItems.length > 0 ? (
            <nav aria-label="Placeholder navigation" className="flex flex-wrap justify-end gap-2">
              {navItems.map((item) => (
                <span
                  className="rounded-full border border-[var(--acc-border)] px-3 py-1 text-sm text-[var(--muted)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </nav>
          ) : null}
        </header>
        <div className="flex flex-1 flex-col py-10">{children}</div>
      </div>
    </main>
  );
}
