"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginPage({ params: { lng } }) {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn, error } = useAuthStore(); // Added error here
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
    router.push(`/${lng}/`); // Added lng here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{t.login}</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            {t.login}
          </button>
        </form>
        <p className="register-link">
          {t.noAccount} <Link href={`/${lng}/register`}>{t.registerHere}</Link>
        </p>
      </div>
    </div>
  );
}
