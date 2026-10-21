const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}][\p{L}\s'.-]*$/u;

export function isEmail(value) {
  return emailPattern.test(value.trim());
}

export function isPhone(value) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return /^[+]?\d[\d\s().-]{8,}$/.test(trimmed) && digits.length >= 10 && digits.length <= 15;
}

export function passwordChecks(password) {
  return {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  };
}

export function isStrongPassword(password) {
  const checks = passwordChecks(password);
  return checks.length && checks.letter && checks.number;
}

export function validateSignUp(values) {
  const errors = {};
  const name = values.fullName.trim();

  if (!name) errors.fullName = "Enter your full name.";
  else if (name.length < 2) errors.fullName = "Name should be at least 2 characters.";
  else if (!namePattern.test(name)) errors.fullName = "Use letters, spaces, apostrophes, or hyphens.";

  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!isEmail(values.email)) errors.email = "Enter a valid email address.";

  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  else if (!isPhone(values.phone)) errors.phone = "Enter a valid phone number with 10 to 15 digits.";

  if (!values.password) errors.password = "Create a password.";
  else if (!isStrongPassword(values.password)) {
    errors.password = "Use 8 or more characters with at least one letter and one number.";
  }

  if (!values.confirm) errors.confirm = "Confirm your password.";
  else if (values.confirm !== values.password) errors.confirm = "Passwords do not match.";

  if (!values.terms) errors.terms = "Accept the terms to create an account.";

  return errors;
}

export function validateSignIn(values) {
  const errors = {};
  const identifier = values.identifier.trim();

  if (!identifier) errors.identifier = "Enter your email or username.";
  else if (identifier.includes("@") && !isEmail(identifier)) {
    errors.identifier = "Enter a valid email address.";
  }

  if (!values.password) errors.password = "Enter your password.";
  else if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";

  return errors;
}

export function validateEmailField(email) {
  if (!email.trim()) return "Enter your email address.";
  if (!isEmail(email)) return "Enter a valid email address.";
  return "";
}
