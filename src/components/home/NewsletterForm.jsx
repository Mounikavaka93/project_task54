import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { wait } from "../../utils/format";
import { validateEmailField } from "../../utils/validate";
import Button from "../ui/Button";
import StatusMessage from "../ui/StatusMessage";

const STORAGE_KEY = "northline.newsletter";

function readList() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function NewsletterForm({ idPrefix = "newsletter" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const nextError = validateEmailField(email);
    setSuccess("");
    if (nextError) {
      setError(nextError);
      return;
    }
    const normalized = email.trim().toLowerCase();
    const existing = readList();
    if (existing.includes(normalized)) {
      setError("This email is already on the list.");
      return;
    }
    setError("");
    setLoading(true);
    await wait(650);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, normalized]));
    setLoading(false);
    setSuccess(`You are on the list. Notes will go to ${normalized}.`);
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`${idPrefix}-email`}>
          Email address
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setSuccess("");
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${idPrefix}-error` : undefined}
          className="h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-5 text-base text-ink outline-none placeholder:text-muted/70 focus:border-forest"
        />
        <Button type="submit" disabled={loading} className="sm:min-w-36">
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {loading ? "Joining" : "Get notes"}
        </Button>
      </div>
      {error ? (
        <div id={`${idPrefix}-error`}>
          <StatusMessage>{error}</StatusMessage>
        </div>
      ) : null}
      <StatusMessage tone="success">{success}</StatusMessage>
    </form>
  );
}
