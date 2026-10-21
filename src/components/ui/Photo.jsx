import { useState } from "react";
import { cx } from "../../utils/cx";

export default function Photo({ src, alt, className = "", priority = false }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cx(
          "bg-[linear-gradient(150deg,#121722_0%,#1c2333_48%,#7c2430_140%)]",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}
