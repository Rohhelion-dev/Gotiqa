import React from "react";
import { motion } from "framer-motion";

import FarmStats from "./FarmStats";
import FeatureGrid from "../../components/FeatureGrid";
import FarmGallery from "../../components/FarmGallery";
import FounderMessage from "../../components/FounderMessage";
import Testimonials from "../../components/Testimonials";

export default function Home({ setCurrentView }) {
  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">

      {/* Hero Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/branding/hero.jpg')",
  }}
/>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black/60" />

{/* Premium Glow */}
<div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >

          <p className="uppercase tracking-[0.38em] text-emerald-300 text-xs mb-6 opacity-90">
            Gotiqa SmartFarm Intelligence
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Smart Livestock
            <br />
            Powered by Intelligence
          </h1>

          <p className="text-slate-200/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Monitor livestock health, optimize feeding, and track farm performance in real time with intelligent analytics.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() => setCurrentView("products")}
              className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore System
            </button>

            <button
              onClick={() => setCurrentView("auth")}
              className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Admin Dashboard
            </button>

          </div>

        </motion.div>
      </section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-28"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything you need to run a smart farm
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            A unified system for livestock monitoring, health tracking, and operational intelligence.
          </p>
        </div>

        <FeatureGrid />
      </motion.section>

      {/* INSIGHTS */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-10">

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            AI Farm Insights (Preview)
          </h3>

          <p className="text-slate-600 mb-10">
            Automated analysis of livestock health, feeding patterns, and productivity trends.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200 hover:shadow-sm transition">
              <p className="text-sm text-slate-500">Health Score</p>
              <p className="text-2xl font-bold text-emerald-900">92%</p>
            </div>

            <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200 hover:shadow-sm transition">
              <p className="text-sm text-slate-500">Feed Efficiency</p>
              <p className="text-2xl font-bold text-emerald-900">Optimal</p>
            </div>

            <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200 hover:shadow-sm transition">
              <p className="text-sm text-slate-500">Growth Rate</p>
              <p className="text-2xl font-bold text-emerald-900">+18%</p>
            </div>

          </div>

        </div>
      </motion.section>

      {/* GALLERY */}
      <div className="py-10">
        <FarmGallery />
      </div>

      {/* FOUNDER */}
      <div className="py-10">
        <FounderMessage />
      </div>

      {/* TESTIMONIALS */}
      <div className="py-10">
        <Testimonials />
      </div>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-50 py-28"
      >
        <div className="max-w-6xl mx-auto px-6 text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Live Farm Performance
          </h2>
          <p className="text-slate-600 mt-4">
            Real-time insights from your livestock system.
          </p>
        </div>

        <FarmStats />
      </motion.section>

      {/* CTA */}
      <section className="relative py-28 bg-gradient-to-br from-emerald-950 to-slate-900 overflow-hidden">

        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to modernize your farm operations?
          </h2>

          <p className="text-slate-200 mb-10">
            Start using data-driven livestock intelligence today.
          </p>

          <button
            onClick={() => setCurrentView("contact")}
            className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </button>

        </div>
      </section>

    </div>
  );
}