import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-16 space-y-12 animate-fadeIn">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3f20]">Our Sustainable Vision</h2>
        <div className="w-16 h-1 bg-[#74c69d] mx-auto rounded-full" />
        <p className="text-gray-500 max-w-xl mx-auto text-sm">Building an environmentally adaptive agricultural model for modern smart farm operators.</p>
      </div>

      {/* Grid Content Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-3 shadow-xs">
          <h3 className="text-xl font-bold text-[#2d6a4f] flex items-center gap-2">
            <span>🌿</span> Ecological Stewardship
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            At GotiqaSmartFarm, we think goat husbandry should enrich the land, not deplete it. Our digital management platform helps minimize overgrazing cycles by providing accurate feeding reports and optimizing resources based on ambient local climates.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-3 shadow-xs">
          <h3 className="text-xl font-bold text-[#2d6a4f] flex items-center gap-2">
            <span>📊</span> The Tech-Agritech Intersection
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            By keeping accurate data files, updating livestock metrics, logging immediate medical care schedules, and managing transparent market prices, we create an accessible data grid for farming staff and retail buyers alike.
          </p>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="bg-gradient-to-br from-[#2d6a4f] to-[#1e3f20] text-white p-8 rounded-2xl text-center shadow-xs">
        <p className="text-lg font-medium max-w-2xl mx-auto italic opacity-95">
          "Our system gives smallholders and industrial ecological farms the real-time insights required to run optimized, high-yield operations while respecting natural resources."
        </p>
      </div>
    </div>
  );
}