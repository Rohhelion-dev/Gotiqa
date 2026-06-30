import api from "../../api/api";
import React from 'react';

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Metrics Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#1e3f20] mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Real-time vitals of your smart ecological farm setup.</p>
      </div>

      {/* Grid Panels */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-600">
          <p className="text-sm font-semibold text-gray-500 uppercase">Total Herd</p>
          <p className="text-4xl font-bold text-slate-800 my-1">127</p>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12 this month</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-600">
          <p className="text-sm font-semibold text-gray-500 uppercase">Monthly Revenue</p>
          <p className="text-4xl font-bold text-slate-800 my-1">KSh 540,000</p>
          <p className="text-xs text-gray-400">From sales & milk production</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-600">
          <p className="text-sm font-semibold text-gray-500 uppercase">Vaccinated</p>
          <p className="text-4xl font-bold text-slate-800 my-1">98%</p>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">All animals healthy</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-600">
          <p className="text-sm font-semibold text-gray-500 uppercase">Farm Staff</p>
          <p className="text-4xl font-bold text-slate-800 my-1">4</p>
          <p className="text-xs text-gray-400">2 full-time workers</p>
        </div>
      </div>

      {/* Weather Interface */}
      <div className="bg-gradient-to-br from-[#2d6a4f] to-[#1e3f20] text-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold tracking-wide">Farm Weather & Conditions</h3>
            <p className="text-emerald-200 text-sm">Gotiqa Farm Area Operations</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors">
            🔄 Refresh Data
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-8 mb-6">
          <div className="text-center md:text-left">
            <span className="text-5xl font-extrabold tracking-tight">24°C</span>
            <p className="text-emerald-100 text-sm mt-1">⛅ Partly Cloudy</p>
          </div>
          <div className="h-12 w-[1px] bg-white/20 hidden md:block" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 text-sm flex-grow">
            <div><span className="opacity-75 block text-xs">Humidity</span><strong>65%</strong></div>
            <div><span className="opacity-75 block text-xs">Wind Speed</span><strong>12 km/h</strong></div>
            <div><span className="opacity-75 block text-xs">Barometric Pressure</span><strong>1013 mb</strong></div>
            <div><span className="opacity-75 block text-xs">UV Index</span><strong>5 (Moderate)</strong></div>
            <div><span className="opacity-75 block text-xs">Visibility</span><strong>10 km</strong></div>
            <div><span className="opacity-75 block text-xs">Dew Point</span><strong>16°C</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}