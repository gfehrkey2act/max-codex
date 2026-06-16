import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
