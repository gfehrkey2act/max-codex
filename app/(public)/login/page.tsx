import { AuthForm } from "@/src/components/auth-form";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/src/lib/session";

export default async function LoginPage() {
  const session = await getCurrentSession();

  if (session !== null) {
    redirect("/notes");
  }

  return (
    <AuthForm
      description="Sign in with the email and password connected to your notes."
      mode="login"
      submitLabel="Sign in"
      switchHref="/register"
      switchLabel="Create an account"
      switchPrompt="New to TinyNotes?"
      title="Welcome back"
    />
  );
}
