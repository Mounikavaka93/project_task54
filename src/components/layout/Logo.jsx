import { Link } from "react-router-dom";
import { cx } from "../../utils/cx";

export default function Logo({ tone = "dark", className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Folio home"
      className={cx("group inline-flex shrink-0 items-center gap-2.5", tone === "light" ? "text-cream" : "text-ink", className)}
    >
      <span className="folio-mark grid h-9 w-9 place-items-center border border-current">
        <svg viewBox="0 0 24 24" className="h-5 w-5 overflow-visible" aria-hidden="true">
          <path d="M5 3.5h3.2v17H5z" fill="#7C2430" />
          <rect className="folio-cover" x="8" y="3.5" width="10" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="font-display text-[1.45rem] leading-none tracking-tight">Folio</span>
    </Link>
  );
}
