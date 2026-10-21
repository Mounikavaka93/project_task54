import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { cx } from "../../utils/cx";

export default function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  hint,
  name,
  autoComplete,
  placeholder,
  inputMode,
  rightSlot,
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div
        className={cx(
          "flex h-12 items-center rounded-xl border bg-cream transition",
          error ? "border-danger" : "border-line focus-within:border-forest",
        )}
      >
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          spellCheck={type === "email" || type === "password" ? false : undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-base text-ink outline-none placeholder:text-muted/70"
        />
        {rightSlot ? <div className="pr-1.5">{rightSlot}</div> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function PasswordField({ id, label, value, onChange, onBlur, error, autoComplete, name }) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      autoComplete={autoComplete}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-sand hover:text-ink"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      }
    />
  );
}

export function SelectField({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative rounded-xl border border-line bg-cream focus-within:border-forest">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="h-12 w-full cursor-pointer appearance-none bg-transparent px-3.5 pr-10 text-base text-ink outline-none"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      </div>
    </div>
  );
}
