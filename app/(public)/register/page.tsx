import { AuthForm } from "@/src/components/auth-form";

export default function RegisterPage() {
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
