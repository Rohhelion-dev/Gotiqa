import React from "react";

import StatsCards from "./StatsCards";
import RecentAnimals from "./RecentAnimals";
import RecentHealthRecords from "./RecentHealthRecords";
import RecentActivity from "./RecentActivity";

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 space-y-10">

      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b2a1f] via-[#1b4332] to-[#0f3a2a] p-8 shadow-lg">

        {/* soft glow */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)]" />

        <div className="relative z-10">

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Gotiqa Farm Dashboard
          </h1>

          <p className="text-gray-200 mt-2 max-w-2xl">
            Real-time overview of farm operations.
          </p>

        </div>
      </div>

      {/* STATS */}
      <section className="transition-all">
        <StatsCards />
      </section>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition">
          <RecentAnimals />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition">
          <RecentHealthRecords />
        </div>

      </div>

      {/* ACTIVITY */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition">
        <RecentActivity />
      </div>

    </div>
  );
}