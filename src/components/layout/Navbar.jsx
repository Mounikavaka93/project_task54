import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cx } from "../../utils/cx";
import Button from "../ui/Button";
import Container from "./Container";
import Logo from "./Logo";

const landingLinks = [
  { label: "The work", hash: "expeditions" },
  { label: "Approach", hash: "approach" },
  { label: "Stories", hash: "stories" },
  { label: "Benefits", hash: "benefits" },
];

const homeLinks = [
  { label: "Explore", hash: "explore" },
  { label: "Categories", hash: "categories" },
  { label: "Trending", hash: "trending" },
  { label: "Gallery", hash: "gallery" },
  { label: "FAQ", hash: "faq" },
];

function linkClassName(onDark) {
  return cx(
    "relative text-sm transition after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-copper after:transition after:duration-300 hover:after:origin-left hover:after:scale-x-100",
    onDark ? "text-cream/85 hover:text-cream" : "text-ink/75 hover:text-ink",
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const onHome = pathname.startsWith("/home");
  const links = onHome ? homeLinks : landingLinks;
  const base = onHome ? "/home" : "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setUserOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setUserOpen(false);
      }
    }
    function onPointer(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setUserOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  function handleSignOut() {
    signOut();
    setUserOpen(false);
    setOpen(false);
    navigate("/");
  }

  const initial = user?.fullName?.trim()?.charAt(0)?.toUpperCase() || "N";

  return (
    <>
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-paper/95 backdrop-blur-md" : "border-transparent bg-paper/80 backdrop-blur-sm",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Container className="flex h-[4.5rem] items-center justify-between gap-3">
        <Logo />
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.hash} to={`${base}#${link.hash}`} className={linkClassName(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-cream pl-1.5 pr-3 text-sm transition hover:border-ink/30"
                  aria-expanded={userOpen}
                  aria-haspopup="menu"
                  onClick={() => setUserOpen((current) => !current)}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-forest font-medium text-cream">{initial}</span>
                  <span className="max-w-28 truncate">{user.fullName.split(" ")[0]}</span>
                </button>
                {userOpen ? (
                  <div role="menu" className="absolute right-0 mt-2 w-60 rounded-2xl border border-line bg-cream p-2 shadow-xl">
                    <p className="px-3 py-2 text-sm">
                      <span className="block font-medium text-ink">{user.fullName}</span>
                      <span className="block truncate text-muted">{user.email}</span>
                    </p>
                    <Link to="/home" role="menuitem" className="block rounded-xl px-3 py-2 text-sm hover:bg-sand" onClick={() => setUserOpen(false)}>
                      The shelf
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      className="block w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm hover:bg-sand"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link to="/signin" className="hidden px-3 text-sm text-ink/80 transition hover:text-ink md:inline">
                  Sign in
                </Link>
                <Button to={onHome ? "/signup" : "/signup"} size="sm">
                  {onHome ? "Join Folio" : "Open a card"}
                </Button>
              </>
            )}
          </div>
          <button
            type="button"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
    </header>
      {open ? (
        <div className="menu-in fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-paper [scrollbar-width:none] lg:hidden">
          <Container className="flex min-h-full flex-col py-6">
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.hash}
                  to={`${base}#${link.hash}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-3xl text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              {user ? (
                <>
                  <p className="text-sm text-muted">
                    Signed in as <span className="text-ink">{user.fullName}</span>
                  </p>
                  <Button to="/home" variant="forest" onClick={() => setOpen(false)}>
                    Browse the shelf
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button to="/signup" onClick={() => setOpen(false)}>
                    Open a card
                  </Button>
                  <Button to="/signin" variant="outline" onClick={() => setOpen(false)}>
                    Sign in
                  </Button>
                </>
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
