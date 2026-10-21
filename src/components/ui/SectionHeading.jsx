import { cx } from "../../utils/cx";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
  action,
  className = "",
}) {
  const centered = align === "center";

  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cx(centered ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow ? (
          <p className={cx("text-[0.72rem] font-medium uppercase tracking-[0.22em]", light ? "text-sand" : "text-moss")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cx(
            "mt-3 font-display text-[2rem] leading-[1.08] sm:text-4xl lg:text-5xl",
            light ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {text ? (
          <p className={cx("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-cream/75" : "text-muted")}>
            {text}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
