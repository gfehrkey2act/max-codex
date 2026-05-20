import type { ReactNode } from "react";

type PlaceholderGridProps = {
  children: ReactNode;
};

export function PlaceholderGrid({ children }: PlaceholderGridProps) {
  return <div className="mt-10 grid gap-4 md:grid-cols-2">{children}</div>;
}
