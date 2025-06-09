"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuthStore } from "./store/useAuthStore";

export default function HomePage() {
  const { t } = useTranslation("common");
  const { authUser, checkAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Slider logic
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    checkAuth(); // Check authentication status on mount
  }, [checkAuth]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      const response = await axios.post("/api/send-email", {
        ...formData,
        userId: authUser?.id, // Include user ID if logged in
      });

      if (response.status === 200) {
        setFormSuccess(t("messageSentSuccess"));
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setFormError(error.response?.data?.message || t("messageSentError"));
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const moveRight = () => {
    const nextIndex = (currentIndex + 1) % slidesRef.current.length;
    setCurrentIndex(nextIndex);
  };

  const moveLeft = () => {
    const prevIndex =
      (currentIndex - 1 + slidesRef.current.length) % slidesRef.current.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        moveRight();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showArrow && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-primary text-primary-content w-12 h-12 p-3 rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-primary-focus transition-colors"
        >
          {/* Using a simple text arrow for now, ideally replace with an SVG icon */}
          <span className="text-xl font-bold">↑</span>
        </button>
      )}

      <section id="home" className="relative h-screen">
        <div className="absolute inset-0 bg-black/50"></div>
        <img
          src="/imgs/homeimg.jpg"
          alt={t("welcome")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            {t("welcome")}
          </h1>
          {authUser && (
            <div className="absolute top-4 right-4 bg-base-100 p-2 rounded-lg">
              Welcome, {authUser.name}
            </div>
          )}
          <Link href="#about" className="btn btn-primary text-lg">
            {t("aboutUs")}
          </Link>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section id="about" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            {t("aboutUs")}
          </h2>
          <div className="divider"></div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-2xl text-primary mb-4">{t("schoolName")}</h3>
              <p className="text-lg">{t("schoolDescription")}</p>
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <span className="font-bold">{t("socialMedia")}</span>
                <a href="https://facebook.com" target="_blank">
                  <img
                    src="/icons/facebook-brands.svg"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">{t("place")}</span>
                <a href="https://maps.app.goo.gl" target="_blank">
                  <img
                    src="/icons/location-dot-solid.svg"
                    alt="Location"
                    className="w-6 h-6"
                  />
                </a>
                <span>{t("location")}</span>
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            {t("skillsTitle.n1")}{" "}
            <span className="text-primary">{t("skillsTitle.n2")}</span>
          </h2>
          <div className="divider"></div>
          <div className="relative overflow-hidden h-64 my-8">
            <div
              ref={sliderRef}
              className="flex absolute transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <img
                    src={`/imgs/skills/${i + 1}.jpg`}
                    alt={`Skill ${i + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={moveLeft} className="btn btn-circle">
              ←
            </button>
            <button onClick={togglePause} className="btn btn-circle">
              {isPaused ? "▶" : "⏸"}
            </button>
            <button onClick={moveRight} className="btn btn-circle">
              →
            </button>
          </div>
        </section>

        <section id="contactus" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            {t("contactTitle")}
          </h2>
          <div className="divider"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="/imgs/contact_us.png"
                alt="Contact us"
                className="w-full rounded-lg"
              />
            </div>
            <form onSubmit={handleSubmit} className="card bg-base-200 p-6">
              <h3 className="text-xl mb-4">{t("contactTitle")}</h3>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">{t("name")}</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">{t("email")}</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">{t("message")}</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-24"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {t("sendMessage")}
              </button>
              {formError && (
                <div className="alert alert-error mt-4">{formError}</div>
              )}
              {formSuccess && (
                <div className="alert alert-success mt-4">{formSuccess}</div>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
