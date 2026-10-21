import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";

const explore = [
  { label: "The shelf", to: "/home" },
  { label: "Journals", to: "/home?category=Journals" },
  { label: "Restoration", to: "/home?category=Restoration" },
  { label: "Cloth", to: "/home?category=Cloth" },
  { label: "Leather", to: "/home?category=Leather" },
];

const company = [
  { label: "The studio", to: "/#approach" },
  { label: "Member notes", to: "/#stories" },
  { label: "Why Folio", to: "/#benefits" },
  { label: "Create an account", to: "/signup" },
];

const support = [
  { label: "Sign in", to: "/signin" },
  { label: "Forgot password", to: "/forgot-password" },
  { label: "Questions", to: "/home#faq" },
  { label: "Field notes", to: "/#field-notes" },
];

function SocialLink({ label, href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition duration-300 hover:-translate-y-0.5 hover:border-copper hover:text-copper"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
            A city bindery for journals, repairs, and the books you already own. Sewn signatures, named paper, one maker on the job.
          </p>
          <div className="mt-6 flex gap-2">
            <SocialLink label="Folio on Instagram" href="https://www.instagram.com">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </SocialLink>
            <SocialLink label="Folio on YouTube" href="https://www.youtube.com">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
                <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.2 5.7 12 5.7 12 5.7s-5.2 0-6.9.4A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.7.4 6.9.4 6.9.4s5.2 0 6.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10.4 14.8V9.2L15.2 12l-4.8 2.8Z" />
              </svg>
            </SocialLink>
            <SocialLink label="Folio on Pinterest" href="https://www.pinterest.com">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
                <path d="M12.2 3C7.4 3 5 6.3 5 9.8c0 2.1 1.2 4 3.1 4 .5 0 .8-.9.8-1.2 0-.3-.8-1.1-.8-2.6 0-3.1 2.3-5.2 5.3-5.2 2.6 0 4.4 1.5 4.4 4.1 0 3.4-1.5 5.8-3.6 5.8-1.1 0-2-.9-1.7-2.1.3-1.4.9-2.8.9-3.8 0-.9-.5-1.6-1.4-1.6-1.1 0-2 1.2-2 2.7 0 1 .3 1.7.3 1.7l-1.3 5.5c-.4 1.6-.1 3.6 0 3.8.1.1.2 0 .3-.1.4-.6 1.3-2.2 1.6-3.6.2-.7.7-2.3.7-2.3.4.8 1.6 1.4 2.8 1.4 3.7 0 6.3-3.4 6.3-7.6C20.7 5.8 17.4 3 12.2 3Z" />
              </svg>
            </SocialLink>
            <SocialLink label="Email Folio" href="mailto:hello@foliobindery.com">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                <path d="M4 7l8 6 8-6" />
              </svg>
            </SocialLink>
          </div>
        </div>
        <FooterColumn title="Explore" links={explore} />
        <FooterColumn title="Company" links={company} />
        <div>
          <FooterColumn title="Support" links={support} />
          <p className="mt-6 text-sm leading-relaxed text-cream/70">
            18 Quill Court
            <br />
            hello@foliobindery.com
            <br />
            +1 (415) 555-0198
          </p>
        </div>
      </Container>
      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Folio Bindery. All rights reserved.</p>
          <p>Preview build. Commissions and payments are simulated in this browser.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-sand">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-cream/80 transition hover:text-copper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
