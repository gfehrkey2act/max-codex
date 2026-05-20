import type { ReactNode } from "react";

type PlaceholderPanelProps = {
  children?: ReactNode;
  label: string;
  title: string;
};

export function PlaceholderPanel({ children, label, title }: PlaceholderPanelProps) {
  return (
    <section className="rounded-lg border border-[var(--acc-border)] bg-white/75 p-5 shadow-sm shadow-teal-950/5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--acc-strong)]">
        {label}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-normal text-[var(--foreground)]">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-6 text-[var(--muted)]">
        {children ?? <p>Static placeholder content. Feature logic will be added later.</p>}
      </div>
    </section>
  );
}
