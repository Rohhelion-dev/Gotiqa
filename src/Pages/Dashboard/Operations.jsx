import React from "react";

export default function Operations() {
  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Farm Operations Overview
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Personnel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">
              Personnel & Staff
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Managing 12 active farm employees and 2 veterinary consultants ensuring day-to-day productivity.
          </p>
        </div>

        {/* Investors */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">
              Investor Relations
            </h3>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Current portfolio performance tracking for 4 primary project investors with real-time financial reporting.
          </p>
        </div>

        {/* Assets */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">
              Goat Assets
            </h3>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Monitoring 350+ heads of stock across dairy and meat production lines with integrated growth tracking.
          </p>
        </div>

      </div>
    </div>
  );
}