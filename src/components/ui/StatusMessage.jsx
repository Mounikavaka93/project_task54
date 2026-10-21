import { CircleAlert, CircleCheck } from "lucide-react";
import { cx } from "../../utils/cx";

export default function StatusMessage({ tone = "error", children }) {
  if (!children) return null;
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={cx(
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        isError ? "border-danger/20 bg-danger-soft text-danger" : "border-moss/30 bg-sage text-forest",
      )}
    >
      {isError ? (
        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <p>{children}</p>
    </div>
  );
}
