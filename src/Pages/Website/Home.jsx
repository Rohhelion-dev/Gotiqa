import React from 'react';

export default function Home({ setCurrentView }) {
  return (
    <div className="space-y-16 py-8 md:py-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#d8f3dc] text-[#1e3f20] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#2d6a4f] animate-ping" />
          Eco-Agritech Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-[#1e3f20] tracking-tight leading-tight">
          Smart Goat Farming Integrated with Ecosystem Values.
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
          Gotiqa combines precise agricultural logging and data metrics with structural sustainability to ensure transparent, productive, and ecological animal husbandry.
        </p>
        
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setCurrentView('auth')}
            className="bg-[#2d6a4f] hover:bg-[#1e3f20] text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Launch Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('products')}
            className="bg-white border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xs"
          >
            Browse Livestock
          </button>
        </div>
      </section>

      {/* Feature Badges Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div className="w-12 h-12 bg-[#d8f3dc] text-[#2d6a4f] rounded-xl flex items-center justify-center text-xl font-bold mb-4">🐐</div>
          <h3 className="text-lg font-bold text-[#1e3f20] mb-2">Herd Management</h3>
          <p className="text-sm text-gray-600">Track structural metrics across individual goat metrics, weights, breeds, and chronological growth markers seamlessly.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div className="w-12 h-12 bg-[#d8f3dc] text-[#2d6a4f] rounded-xl flex items-center justify-center text-xl font-bold mb-4">🩺</div>
          <h3 className="text-lg font-bold text-[#1e3f20] mb-2">Veterinary Logging</h3>
          <p className="text-sm text-gray-600">Maintain clinical record paths, medical treatment histories, vaccination completions, and immediate care schedules.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div className="w-12 h-12 bg-[#d8f3dc] text-[#2d6a4f] rounded-xl flex items-center justify-center text-xl font-bold mb-4">⛅</div>
          <h3 className="text-lg font-bold text-[#1e3f20] mb-2">Atmospheric Tracking</h3>
          <p className="text-sm text-gray-600">Sync with direct field weather patterns, barometric pressure indexes, and humidity maps to protect your pasture operations.</p>
        </div>
      </section>
    </div>
  );
}