"use client";

import { ErrorPlaceholder } from "@/src/components/error-placeholder";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return <ErrorPlaceholder label="App route placeholder" onReset={reset} />;
}
