"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      await authClient.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <button
      className="rounded-md bg-[var(--acc-strong)] px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-950/10 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isPending}
      onClick={handleLogout}
      type="button"
    >
      {isPending ? "Logging out..." : "Log out"}
    </button>
  );
}
