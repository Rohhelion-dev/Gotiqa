import React from "react";

import StatsCards from "./StatsCards";
import RecentAnimals from "./RecentAnimals";
import RecentHealthRecords from "./RecentHealthRecords";
import RecentActivity from "./RecentActivity";

export default function DashboardHome({ user }) {
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 space-y-10">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b2a1f] p-8 shadow-lg">
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
            Gotiqa Farm Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-white font-medium drop-shadow">
            Real-time overview of farm operations.
          </p>

          <p className="mt-3 text-sm font-semibold text-emerald-50 drop-shadow">
            {isAdmin
              ? "Admin access: full management controls enabled."
              : "Farmer access: view-only dashboard."}
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