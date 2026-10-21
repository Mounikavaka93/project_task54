import { Link } from "react-router-dom";
import { cx } from "../../utils/cx";

const variants = {
  primary: "bg-copper text-cream hover:bg-copper-deep",
  forest: "bg-forest text-cream hover:bg-forest-deep",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-forest hover:bg-white",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  "ghost-light": "bg-transparent text-cream border border-cream/30 hover:bg-cream/10",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

export default function Button({
  to,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = cx(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium tracking-wide transition duration-300",
    "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
    sizes[size],
    variants[variant],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
