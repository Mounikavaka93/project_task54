import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { wait } from "../../utils/format";
import Modal from "../ui/Modal";
import StatusMessage from "../ui/StatusMessage";
import Button from "../ui/Button";

const profiles = {
  google: {
    label: "Google",
    name: "Maya Chen",
    email: "maya.chen@gmail.com",
  },
  apple: {
    label: "Apple",
    name: "Jordan Blake",
    email: "jordan.blake@icloud.com",
  },
};

export default function SocialAuth({ onAuthenticated }) {
  const { signInSocial } = useAuth();
  const [provider, setProvider] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const profile = provider ? profiles[provider] : null;

  async function continueWithProvider() {
    setBusy(true);
    setError("");
    await wait(700);
    const result = signInSocial(provider);
    setBusy(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setProvider(null);
    onAuthenticated(result.name);
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => setProvider("google")} className="social-btn">
          <GoogleMark />
          Google
        </button>
        <button type="button" onClick={() => setProvider("apple")} className="social-btn">
          <AppleMark />
          Apple
        </button>
      </div>
      <style>{`
        .social-btn {
          display: inline-flex;
          height: 3rem;
          width: 100%;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          border-radius: 6px;
          border: 1px solid var(--color-line);
          background: var(--color-cream);
          font-size: 0.95rem;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .social-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(20, 24, 22, 0.35);
          box-shadow: 0 12px 30px -18px rgba(20, 24, 22, 0.6);
        }
        .social-btn:focus-visible {
          outline: 2px solid var(--color-copper);
          outline-offset: 2px;
        }
      `}</style>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or use email
        <span className="h-px flex-1 bg-line" />
      </div>
      <Modal
        open={Boolean(profile)}
        title={profile ? `Continue with ${profile.label}` : "Continue"}
        onClose={() => {
          if (!busy) {
            setProvider(null);
            setError("");
          }
        }}
      >
        {profile ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-paper p-4">
              <p className="font-medium text-ink">{profile.name}</p>
              <p className="text-sm text-muted">{profile.email}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              This is a preview sign-in. Folio will use this name on your commissions. No password is sent to {profile.label}.
            </p>
            <StatusMessage>{error}</StatusMessage>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setProvider(null)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={continueWithProvider} disabled={busy}>
                {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {busy ? "Connecting" : "Continue"}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8A6.4 6.4 0 1 1 12 5.6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.8 3.2 14.6 2.2 12 2.2 6.8 2.2 2.6 6.4 2.6 11.6S6.8 21 12 21c5.4 0 9-3.8 9-9.1 0-.6 0-1-.1-1.5H12Z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M16.4 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.9-.8c-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7 1.9-1.1 2.6-2.1c.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.8-2.2-3.7ZM14.7 6.8c.6-.7 1-1.7.9-2.8-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.7-.9 2.7 1.1.1 2.1-.5 2.8-1.3Z" />
    </svg>
  );
}
