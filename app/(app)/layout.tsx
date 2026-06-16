import { redirect } from "next/navigation";
import { getCurrentSession } from "@/src/lib/session";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  if (session === null) {
    redirect("/login");
  }

  return <div className="flex flex-1 flex-col gap-10">{children}</div>;
}
