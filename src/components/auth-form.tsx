"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { authClient } from "@/src/lib/auth-client";

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
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const passwordAutoComplete = mode === "login" ? "current-password" : "new-password";
  const errorId = `${mode}-auth-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPending) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = getFormString(formData, "email").trim().toLowerCase();
    const password = getFormString(formData, "password");

    if (email === "" || password === "") {
      setError("Enter an email and password.");
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      const result =
        mode === "login"
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({
              email,
              name: deriveNameFromEmail(email),
              password,
            });

      if (result.error !== null) {
        setError(getGenericError(mode));
        return;
      }

      router.replace("/notes");
      router.refresh();
    } catch (submissionError) {
      console.error(submissionError);
      setError(getGenericError(mode));
    } finally {
      setIsPending(false);
    }
  }

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

        <form
          aria-describedby={error === null ? undefined : errorId}
          className="rounded-lg border border-[var(--acc-border)] bg-white/85 p-6 shadow-sm shadow-teal-950/5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            <label className="block" htmlFor={`${mode}-email`}>
              <span className="text-sm font-medium text-[var(--foreground)]">Email</span>
              <input
                autoComplete="email"
                className="mt-2 w-full rounded-md border border-[var(--acc-border)] bg-white px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--acc-strong)] focus:ring-4 focus:ring-[var(--acc-soft)]"
                disabled={isPending}
                id={`${mode}-email`}
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>

            <label className="block" htmlFor={`${mode}-password`}>
              <span className="text-sm font-medium text-[var(--foreground)]">Password</span>
              <input
                autoComplete={passwordAutoComplete}
                className="mt-2 w-full rounded-md border border-[var(--acc-border)] bg-white px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--acc-strong)] focus:ring-4 focus:ring-[var(--acc-soft)]"
                disabled={isPending}
                id={`${mode}-password`}
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </label>
          </div>

          {error === null ? null : (
            <p
              className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
              id={errorId}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            className="mt-6 w-full rounded-md bg-[var(--acc-strong)] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-[var(--acc-soft)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Please wait..." : submitLabel}
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

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function deriveNameFromEmail(email: string): string {
  const [localPart] = email.split("@");
  const name = localPart.trim();

  return name === "" ? email : name;
}

function getGenericError(mode: AuthFormProps["mode"]): string {
  if (mode === "login") {
    return "Unable to sign in with those credentials.";
  }

  return "Unable to create an account with those details.";
}
