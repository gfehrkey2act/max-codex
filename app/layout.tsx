import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyNotes",
  description: "Private notes with simple public sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] antialiased">
        <div className="flex min-h-screen flex-col text-[var(--foreground)]">
          <header className="border-b border-[var(--acc-border)] bg-[var(--background)]/95">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <Link
                className="text-lg font-semibold tracking-normal text-[var(--foreground)]"
                href="/"
              >
                TinyNotes
              </Link>
              <nav aria-label="Account navigation" className="flex items-center gap-2">
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--acc-soft)] hover:text-[var(--foreground)]"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="rounded-md bg-[var(--acc-strong)] px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800"
                  href="/register"
                >
                  Register
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
