import React from "react";
import { motion } from "framer-motion";

import FarmStats from "./FarmStats";
import FeatureGrid from "../../components/FeatureGrid";
import FarmGallery from "../../components/FarmGallery";
import FounderMessage from "../../components/FounderMessage";
import Testimonials from "../../components/Testimonials";

const heroImage = `${import.meta.env.BASE_URL}images/branding/hero.jpeg`;

export default function Home({ setCurrentView }) {
  return (
    <div className="overflow-x-hidden bg-[#f7faf5] text-slate-800">
      {/* HERO */}
      <section className="relative min-h-[84vh] mx-4 mt-4 flex items-center justify-center overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-emerald-950/80" />
        

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <p style={{ color: "#ffffff" }} className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
            Gotiqa SmartFarm Intelligence
          </p>

          <h1 style={{ color: "#ffffff" }} className="mb-6 text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.85)] md:text-6xl">
            Smart Livestock
            <br />
            Powered by Intelligence
          </h1>

          <p style={{ color: "#ffffff" }} className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] md:text-xl">
            Monitor herd health, feeding, breeding, and farm performance with
            practical tools built for modern livestock operations.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setCurrentView("products")}
              className="rounded-xl bg-white px-8 py-3 font-semibold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Explore System
            </button>

            <button
              type="button"
              onClick={() => setCurrentView("auth")}
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              Admin Dashboard
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7faf5] to-transparent" />
      </section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      >
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Farm Operations
          </p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Everything you need to run a smart farm
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            A unified system for livestock monitoring, health tracking, feeding
            records, and operational intelligence.
          </p>
        </div>

        <FeatureGrid />
      </motion.section>

      {/* INSIGHTS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl px-6 py-12 md:py-16"
      >
        <div className="rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-white via-emerald-50/60 to-amber-50/60 p-6 shadow-sm md:p-9">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Intelligence Preview
            </p>

            <h3 className="text-2xl font-bold text-white">
              AI Farm Insights
            </h3>

            <p className="mt-3 text-slate-600">
              Automated analysis of livestock health, feeding patterns, and
              productivity trends.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Health Score", "92%"],
              ["Feed Efficiency", "Optimal"],
              ["Growth Rate", "+18%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-emerald-900/10 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-emerald-900">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GALLERY */}
      <section className="py-8 md:py-12">
        <FarmGallery />
      </section>

      {/* FOUNDER */}
      <section className="py-8 md:py-12">
        <FounderMessage />
      </section>

      {/* TESTIMONIALS */}
      <section className="py-8 md:py-12">
        <Testimonials />
      </section>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="bg-gradient-to-b from-[#f7faf5] to-emerald-50/70 py-16 md:py-20"
      >
        <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Farm Performance
          </p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Live Farm Performance
          </h2>

          <p className="mt-4 text-slate-600">
            Real-time insights from your livestock system.
          </p>
        </div>

        <FarmStats />
      </motion.section>

      {/* CTA */}
      <section className="relative mx-4 my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-[#1b4332] to-[#3b2f25] py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,243,220,0.16),transparent_55%)]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
           <p style={{ color: "#ffffff" }} className="...">
  Gotiqa SmartFarm Intelligence
</p>

          <p style={{color:"white"}} className="mx-auto mb-8 max-w-2xl">
            Start using data-driven livestock intelligence to manage your herd
            with more confidence.
          </p>

          <button
            type="button"
            onClick={() => setCurrentView("contact")}
            className="rounded-xl bg-white px-8 py-3 font-semibold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}