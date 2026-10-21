import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import StatusMessage from "../components/ui/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { wait } from "../utils/format";
import { validateEmailField } from "../utils/validate";

export default function ForgotPasswordPage() {
  const { requestReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [resent, setResent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Reset password — Folio";
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextError = validateEmailField(email);
    setResent(false);
    if (nextError) {
      setError(nextError);
      setSentTo("");
      return;
    }
    setSubmitting(true);
    setError("");
    await wait(700);
    const result = requestReset(email);
    setSubmitting(false);
    if (!result.ok) {
      setSentTo("");
      setError(result.message);
      return;
    }
    setSentTo(result.email);
  }

  async function resend() {
    setSubmitting(true);
    setResent(false);
    await wait(600);
    setSubmitting(false);
    setResent(true);
  }

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Paper and notes on a studio desk"
      quote="We send the reset note to the inbox on your member card."
      attribution="Folio desk"
    >
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-moss">Account help</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Reset password</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Enter the email on your account. Remembered it?{" "}
        <Link to="/signin" className="font-medium text-forest underline decoration-copper underline-offset-4">
          Return to sign in
        </Link>
        .
      </p>

      {sentTo ? (
        <div className="mt-8 space-y-4">
          <StatusMessage tone="success">
            A reset link is on its way to {sentTo}. This preview does not send a real email.
          </StatusMessage>
          {resent ? <StatusMessage tone="success">Sent again to {sentTo}.</StatusMessage> : null}
          <Button type="button" variant="outline" onClick={resend} disabled={submitting}>
            {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            Resend link
          </Button>
          <p className="text-sm">
            <Link to="/signin" className="font-medium text-forest underline decoration-copper underline-offset-4">
              Back to sign in
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <TextField
            id="reset-email"
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            error={error}
            placeholder="mounika@foliobindery.com"
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {submitting ? "Sending" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
