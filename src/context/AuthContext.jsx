import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);
const SESSION_KEY = "pastelcart_auth";
const USERS_KEY = "pastelcart_users";
const DEFAULT_USER = { name: "Demo User", email: "demo@pastelcart.com", phone: "9876543210", password: "demo123" };

function readUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(saved) && saved.length ? saved : [DEFAULT_USER];
  } catch {
    return [DEFAULT_USER];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      else localStorage.removeItem(SESSION_KEY);
    } catch (err) { console.error("Auth storage error:", err); }
  }, [user]);

  const login = useCallback(({ email, password }) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const account = readUsers().find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
        setLoading(false);
        if (!account) { reject(new Error("Incorrect email or password.")); return; }
        const safeUser = { name: account.name, email: account.email, phone: account.phone };
        setUser(safeUser);
        resolve(safeUser);
      }, 500);
    });
  }, []);

  const register = useCallback(({ name, email, phone, password }) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = readUsers();
        if (users.some((item) => item.email.toLowerCase() === email.trim().toLowerCase())) {
          setLoading(false);
          reject(new Error("An account with this email already exists."));
          return;
        }
        const newUser = { name: name.trim(), email: email.trim(), phone: phone.trim(), password };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
        setLoading(false);
        resolve(newUser);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export default AuthContext;
