import { AuthForm } from "@/src/components/auth-form";

export default function LoginPage() {
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
