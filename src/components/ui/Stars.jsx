import { Star } from "lucide-react";

export default function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={index < full ? "h-3.5 w-3.5 fill-copper text-copper" : "h-3.5 w-3.5 text-line"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
