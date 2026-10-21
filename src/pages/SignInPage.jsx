import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import SocialAuth from "../components/auth/SocialAuth";
import Logo from "../components/layout/Logo";
import Button from "../components/ui/Button";
import { PasswordField } from "../components/ui/TextField";
import TextField from "../components/ui/TextField";
import StatusMessage from "../components/ui/StatusMessage";
import { DEMO_ACCOUNT, useAuth } from "../context/AuthContext";
import { wait } from "../utils/format";
import { validateSignIn } from "../utils/validate";

const initial = { identifier: "", password: "", remember: false };

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, rememberEmail } = useAuth();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const destination = location.state?.from || "/home";

  useEffect(() => {
    document.title = "Sign in — Folio";
    const remembered = rememberEmail();
    if (remembered) {
      setValues((current) => ({ ...current, identifier: remembered, remember: true }));
    }
  }, [rememberEmail]);

  useEffect(() => {
    if (!success) return undefined;
    const id = window.setTimeout(() => navigate(destination), 800);
    return () => window.clearTimeout(id);
  }, [success, navigate, destination]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
    setSuccess("");
  }

  function handleBlur(field) {
    const next = validateSignIn({ ...values, [field]: values[field] });
    setErrors((current) => ({ ...current, [field]: next[field] }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateSignIn(values);
    setErrors(nextErrors);
    setFormError("");
    setSuccess("");
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    await wait(700);
    const result = signIn(values);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    setSuccess("Welcome back. Opening the shelf.");
  }

  return (
    <div className="min-h-[100svh] bg-forest px-4 py-6 text-cream sm:px-8">
      <div className="mx-auto flex w-full max-w-xl items-center justify-between">
        <Logo tone="light" />
        <Link to="/" className="text-sm text-cream/70 transition hover:text-cream">
          Back to the bindery
        </Link>
      </div>
      <div className="mx-auto mt-8 w-full max-w-xl [perspective:1600px] sm:mt-14">
      <div className={`folio-card bg-paper text-ink shadow-[0_30px_80px_-36px_rgba(0,0,0,0.65)]${success ? " is-shut" : ""}`}>
        <div className="h-2 bg-copper sm:hidden" />
        <div className="border-copper px-5 py-8 sm:border-l-[14px] sm:px-10 sm:py-12">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-moss">Member card · No. 00481</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Sign in</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Use your email or username. New to the bench?{" "}
        <Link to="/signup" state={location.state} className="font-medium text-forest underline decoration-copper underline-offset-4">
          Create an account
        </Link>
        .
      </p>

      <div className="mt-8">
        <SocialAuth onAuthenticated={() => setSuccess("Signed in. Opening the shelf.")} />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <StatusMessage>{formError}</StatusMessage>
        <StatusMessage tone="success">{success}</StatusMessage>
        <TextField
          id="signin-identifier"
          label="Email or username"
          value={values.identifier}
          onChange={(event) => update("identifier", event.target.value)}
          onBlur={() => handleBlur("identifier")}
          error={errors.identifier}
          autoComplete="username"
          placeholder="mounika@foliobindery.com"
        />
        <PasswordField
          id="signin-password"
          label="Password"
          name="password"
          value={values.password}
          onChange={(event) => update("password", event.target.value)}
          onBlur={() => handleBlur("password")}
          error={errors.password}
          autoComplete="current-password"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={(event) => update("remember", event.target.checked)}
              className="h-4 w-4 accent-forest"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-forest underline decoration-copper underline-offset-4">
            Forgot password
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={submitting || Boolean(success)}>
          {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {submitting ? "Signing in" : "Sign in"}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream px-4 py-3 text-sm text-muted">
        <p>
          Demo account: <span className="text-ink">{DEMO_ACCOUNT.email}</span>
        </p>
        <p className="mt-1">
          Password: <span className="text-ink">{DEMO_ACCOUNT.password}</span>
        </p>
        <button
          type="button"
          className="mt-3 cursor-pointer font-medium text-forest underline decoration-copper underline-offset-4"
          onClick={() => {
            setValues({
              identifier: DEMO_ACCOUNT.email,
              password: DEMO_ACCOUNT.password,
              remember: true,
            });
            setErrors({});
            setFormError("");
          }}
        >
          Use demo account
        </button>
      </div>
        </div>
      </div>
      </div>
    </div>
  );
}
