"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/useAuthStore";

export default function RegisterPage({ params: { lng } }) {
  const { t } = useTranslation("common");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isRegistering, error } = useAuthStore(); // Added error
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    router.push(`/${lng}/login`);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>{t.register}</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              required
            />
          </div>
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
          <button type="submit" className="btn-register">
            {isRegistering ? t.registering : t.register}
          </button>
        </form>
        <p className="login-link">
          {t.haveAccount} <Link href={`/${lng}/login`}>{t.loginHere}</Link>
        </p>
      </div>
    </div>
  );
}
