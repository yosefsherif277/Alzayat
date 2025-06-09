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
  const { login, isLoggingIn, error } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
    router.push(`/${lng}/`);
  };

  return (
    <div className="mt-20 flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="card bg-base-100 shadow-xl w-full max-w-md text-center p-8">
        <h1 className="mb-6 text-primary text-2xl font-bold">{t.login}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4 text-left">
            <label className="label" htmlFor="email">
              <span className="label-text text-primary">{t.email}</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              required
              className="input input-bordered w-full text-base"
            />
          </div>
          <div className="form-control mb-4 text-left">
            <label className="label" htmlFor="password">
              <span className="label-text text-primary">{t.password}</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              required
              className="input input-bordered w-full text-base"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full h-12 text-base font-semibold mt-4">
            {t.login}
          </button>
        </form>
        <p className="mt-6 text-primary">
          {t.noAccount}{" "}
          <Link href={`/${lng}/register`} className="text-secondary font-semibold no-underline hover:underline">
            {t.registerHere}
          </Link>
        </p>
      </div>
    </div>
  );
}
