type LoadingPlaceholderProps = {
  label: string;
};

export function LoadingPlaceholder({ label }: LoadingPlaceholderProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-[var(--acc-border)] bg-white/75 p-6 shadow-sm shadow-teal-950/5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--acc-strong)]">
          Loading
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal text-[var(--foreground)]">
          {label}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Placeholder loading state. No data fetching is implemented in this scaffold.
        </p>
      </div>
    </div>
  );
}
