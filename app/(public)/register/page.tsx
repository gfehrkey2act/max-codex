import { AuthForm } from "@/src/components/auth-form";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/src/lib/session";

export default async function RegisterPage() {
  const session = await getCurrentSession();

  if (session !== null) {
    redirect("/notes");
  }

  return (
    <AuthForm
      description="Create your account with an email address and password."
      mode="register"
      submitLabel="Create account"
      switchHref="/login"
      switchLabel="Sign in"
      switchPrompt="Already have an account?"
      title="Create your account"
    />
  );
}
