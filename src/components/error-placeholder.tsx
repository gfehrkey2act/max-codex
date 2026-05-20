type ErrorPlaceholderProps = {
  label: string;
  onReset?: () => void;
};

export function ErrorPlaceholder({ label, onReset }: ErrorPlaceholderProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-[var(--acc-border)] bg-white/75 p-6 shadow-sm shadow-teal-950/5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--acc-strong)]">
          Error boundary
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal text-[var(--foreground)]">
          {label}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Static error placeholder. Real error handling will be wired up later.
        </p>
        {onReset ? (
          <button
            className="mt-5 rounded-md bg-[var(--acc-strong)] px-4 py-2 text-sm font-medium text-white"
            onClick={onReset}
            type="button"
          >
            Reset placeholder
          </button>
        ) : null}
      </div>
    </div>
  );
}
