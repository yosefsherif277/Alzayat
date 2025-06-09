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
  const { register, isRegistering, error } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    router.push(`/${lng}/login`);
  };

  return (
    <div className="mt-20 flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="card bg-base-100 shadow-xl w-full max-w-md text-center p-8">
        <h1 className="mb-6 text-primary text-2xl font-bold">{t.register}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-control mb-4 text-left">
            <label className="label" htmlFor="name">
              <span className="label-text text-primary">{t.name}</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              required
              className="input input-bordered w-full text-base"
            />
          </div>
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
            {isRegistering ? t.registering : t.register}
          </button>
        </form>
        <p className="mt-6 text-primary">
          {t.haveAccount}{" "}
          <Link href={`/${lng}/login`} className="text-secondary font-semibold no-underline hover:underline">
            {t.loginHere}
          </Link>
        </p>
      </div>
    </div>
  );
}
