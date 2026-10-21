import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "folio.users";
const SESSION_KEY = "folio.session";
const REMEMBER_KEY = "folio.remember";

export const DEMO_ACCOUNT = {
  id: "demo-mounika",
  fullName: "Mounika Vaka",
  username: "mounika",
  email: "mounika@foliobindery.com",
  phone: "+1 415 555 0148",
  password: "Binding2026",
};

const AuthContext = createContext(null);

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toSession(account) {
  return {
    id: account.id,
    fullName: account.fullName,
    username: account.username,
    email: account.email,
    phone: account.phone || "",
    provider: account.provider || "email",
  };
}

function allAccounts() {
  return [DEMO_ACCOUNT, ...readUsers()];
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setReady(true);
  }, []);

  const rememberEmail = useCallback(() => localStorage.getItem(REMEMBER_KEY) || "", []);

  const register = useCallback((profile) => {
    const email = profile.email.trim().toLowerCase();
    const users = readUsers();
    const taken = allAccounts().some((account) => account.email === email);
    if (taken) {
      return { ok: false, field: "email", message: "An account with this email already exists." };
    }

    const account = {
      id: crypto.randomUUID(),
      fullName: profile.fullName.trim(),
      username: email.split("@")[0],
      email,
      phone: profile.phone.trim(),
      password: profile.password,
      provider: "email",
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]));
    const session = toSession(account);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const signIn = useCallback(({ identifier, password, remember }) => {
    const key = identifier.trim().toLowerCase();
    const match = allAccounts().find((account) => {
      return (
        account.email === key ||
        account.username.toLowerCase() === key ||
        account.fullName.toLowerCase() === key
      );
    });

    if (!match) {
      return { ok: false, message: "No account found for that email or username." };
    }
    if (match.password !== password) {
      return { ok: false, message: "That password does not match our records." };
    }

    const session = toSession(match);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if (remember) localStorage.setItem(REMEMBER_KEY, match.email);
    else localStorage.removeItem(REMEMBER_KEY);
    setUser(session);
    return { ok: true };
  }, []);

  const signInSocial = useCallback((provider) => {
    const profiles = {
      google: {
        id: "social-google",
        fullName: "Maya Chen",
        username: "maya",
        email: "maya.chen@gmail.com",
        provider: "google",
      },
      apple: {
        id: "social-apple",
        fullName: "Jordan Blake",
        username: "jordan",
        email: "jordan.blake@icloud.com",
        provider: "apple",
      },
    };
    const session = profiles[provider];
    if (!session) return { ok: false, message: "That sign-in option is unavailable." };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, name: session.fullName };
  }, []);

  const requestReset = useCallback((email) => {
    const key = email.trim().toLowerCase();
    const match = allAccounts().find((account) => account.email === key);
    if (!match) {
      return { ok: false, message: "We could not find an account with that email." };
    }
    return { ok: true, email: match.email };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      rememberEmail,
      register,
      signIn,
      signInSocial,
      requestReset,
      signOut,
    }),
    [user, ready, rememberEmail, register, signIn, signInSocial, requestReset, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
