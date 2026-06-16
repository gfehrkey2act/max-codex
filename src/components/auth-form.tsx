import Link from "next/link";

type AuthFormProps = {
  description: string;
  mode: "login" | "register";
  submitLabel: string;
  switchHref: string;
  switchLabel: string;
  switchPrompt: string;
  title: string;
};

export function AuthForm({
  description,
  mode,
  submitLabel,
  switchHref,
  switchLabel,
  switchPrompt,
  title,
}: AuthFormProps) {
  const passwordAutoComplete = mode === "login" ? "current-password" : "new-password";

  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-[var(--acc-strong)]">TinyNotes</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[var(--foreground)]">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">{description}</p>
        </div>

        <form className="rounded-lg border border-[var(--acc-border)] bg-white/85 p-6 shadow-sm shadow-teal-950/5">
          <div className="space-y-5">
            <label className="block" htmlFor={`${mode}-email`}>
              <span className="text-sm font-medium text-[var(--foreground)]">Email</span>
              <input
                autoComplete="email"
                className="mt-2 w-full rounded-md border border-[var(--acc-border)] bg-white px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--acc-strong)] focus:ring-4 focus:ring-[var(--acc-soft)]"
                id={`${mode}-email`}
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </label>

            <label className="block" htmlFor={`${mode}-password`}>
              <span className="text-sm font-medium text-[var(--foreground)]">Password</span>
              <input
                autoComplete={passwordAutoComplete}
                className="mt-2 w-full rounded-md border border-[var(--acc-border)] bg-white px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--acc-strong)] focus:ring-4 focus:ring-[var(--acc-soft)]"
                id={`${mode}-password`}
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </label>
          </div>

          <button
            className="mt-6 w-full rounded-md bg-[var(--acc-strong)] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-[var(--acc-soft)]"
            type="button"
          >
            {submitLabel}
          </button>

          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            {switchPrompt}{" "}
            <Link
              className="font-semibold text-[var(--acc-strong)] underline-offset-4 hover:underline"
              href={switchHref}
            >
              {switchLabel}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
