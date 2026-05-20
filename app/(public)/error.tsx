"use client";

import { ErrorPlaceholder } from "@/src/components/error-placeholder";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return <ErrorPlaceholder label="Public route placeholder" onReset={reset} />;
}
