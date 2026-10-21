import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, LoaderCircle } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import SocialAuth from "../components/auth/SocialAuth";
import TermsDialog from "../components/auth/TermsDialog";
import Button from "../components/ui/Button";
import { PasswordField } from "../components/ui/TextField";
import TextField from "../components/ui/TextField";
import StatusMessage from "../components/ui/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { wait } from "../utils/format";
import { cx } from "../utils/cx";
import { passwordChecks, validateSignUp } from "../utils/validate";

const empty = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  terms: false,
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const destination = location.state?.from || "/home";
  const checks = passwordChecks(values.password);

  useEffect(() => {
    document.title = "Create account — Folio";
  }, []);

  useEffect(() => {
    if (!success) return undefined;
    const id = window.setTimeout(() => navigate(destination), 900);
    return () => window.clearTimeout(id);
  }, [success, navigate, destination]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess("");
  }

  function handleBlur(field) {
    const next = validateSignUp(values);
    setErrors((current) => ({ ...current, [field]: next[field] }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateSignUp(values);
    setErrors(nextErrors);
    setSuccess("");
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    await wait(800);
    const result = register(values);
    setSubmitting(false);
    if (!result.ok) {
      setErrors((current) => ({ ...current, [result.field]: result.message }));
      return;
    }
    setSuccess("Account created. Opening the shelf.");
  }

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Stack of hardcover books"
      quote="They saved the inscription and rebuilt the spine around it."
      attribution="Amira Hassan · Vellum Guest Book"
    >
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-moss">Join the list</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Create an account</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Already a member?{" "}
        <Link to="/signin" state={location.state} className="font-medium text-forest underline decoration-copper underline-offset-4">
          Sign in
        </Link>
        .
      </p>

      <div className="mt-8">
        <SocialAuth onAuthenticated={() => setSuccess("Signed in. Opening the shelf.")} />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <StatusMessage tone="success">{success}</StatusMessage>
        <TextField
          id="signup-name"
          name="name"
          label="Full name"
          value={values.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          onBlur={() => handleBlur("fullName")}
          error={errors.fullName}
          autoComplete="name"
          placeholder="Mounika Vaka"
        />
        <TextField
          id="signup-email"
          label="Email address"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          autoComplete="email"
          placeholder="you@email.com"
        />
        <TextField
          id="signup-phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          onBlur={() => handleBlur("phone")}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+1 415 555 0148"
        />
        <div>
          <PasswordField
            id="signup-password"
            label="Password"
            name="new-password"
            value={values.password}
            onChange={(event) => update("password", event.target.value)}
            onBlur={() => handleBlur("password")}
            error={errors.password}
            autoComplete="new-password"
          />
          <ul className="mt-2 space-y-1 text-sm">
            <CheckItem ok={checks.length} label="At least 8 characters" />
            <CheckItem ok={checks.letter} label="At least one letter" />
            <CheckItem ok={checks.number} label="At least one number" />
          </ul>
        </div>
        <PasswordField
          id="signup-confirm"
          label="Confirm password"
          name="confirm-password"
          value={values.confirm}
          onChange={(event) => update("confirm", event.target.value)}
          onBlur={() => handleBlur("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
        />
        <div>
          <div className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              id="signup-terms"
              type="checkbox"
              checked={values.terms}
              onChange={(event) => update("terms", event.target.checked)}
              onBlur={() => handleBlur("terms")}
              aria-invalid={errors.terms ? "true" : "false"}
              className="mt-1 h-4 w-4 shrink-0 accent-forest"
            />
            <p>
              <label htmlFor="signup-terms" className="cursor-pointer">
                I agree to the Terms & Conditions
              </label>{" "}
              <button
                type="button"
                className="cursor-pointer font-medium text-forest underline decoration-copper underline-offset-4"
                onClick={() => setTermsOpen(true)}
              >
                Read terms
              </button>
            </p>
          </div>
          {errors.terms ? <p className="mt-1.5 text-sm text-danger">{errors.terms}</p> : null}
        </div>
        <Button type="submit" className="w-full" disabled={submitting || Boolean(success)}>
          {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {submitting ? "Creating account" : "Sign up"}
        </Button>
      </form>
      <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
    </AuthLayout>
  );
}

function CheckItem({ ok, label }) {
  return (
    <li className={cx("flex items-center gap-2", ok ? "text-moss" : "text-muted")}>
      <Check className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </li>
  );
}
