import React, { useEffect, useState } from "react";

const navItems = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "products", label: "Products" },
  { key: "contact", label: "Contact" },
];

export default function Navbar({ currentView, setCurrentView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavClick = (key) => {
    setCurrentView(key);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const base =
    "sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl border-b";

  return (
    <header
      className={`${base} ${
        scrolled
          ? "bg-white/80 border-slate-200 shadow-sm"
          : "bg-white/60 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src={`${import.meta.env.BASE_URL}images/branding/Logo.png`}
              alt="Gotiqa Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="leading-tight">
            <h1 className="font-semibold text-[15px] text-emerald-900">
              Gotiqa SmartFarm
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Smart Livestock Management
            </p>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ key, label }) => {
            const active = currentView === key;

            return (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-emerald-900"
                    : "text-slate-600 hover:text-emerald-800"
                }`}
              >
                {label}

                {/* Soft active indicator (premium style) */}
                <span
                  className={`absolute left-1/2 -bottom-2 h-[2px] w-5 -translate-x-1/2 rounded-full transition-all duration-300 ${
                    active ? "bg-emerald-900 opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* LOGIN CTA */}
          <button
            onClick={() => handleNavClick("auth")}
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition"
          >
            Login
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-slate-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 flex flex-col gap-2">
          {navItems.map(({ key, label }) => {
            const active = currentView === key;

            return (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}