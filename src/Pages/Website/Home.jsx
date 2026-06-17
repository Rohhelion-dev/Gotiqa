import React from 'react';
import FarmStats from './FarmStats';
import MarketTrends from '../../components/MarketTrends';
import FeatureGrid from '../../components/FeatureGrid';

export default function Home({ setCurrentView }) {
  return (
    <div className="bg-[#f4f7f5] min-h-screen">
      {/* Hero / Welcome Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
          Welcome to Gotiqa SmartFarm
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Leading the way in data-driven livestock management and sustainable agricultural excellence.
        </p>
        
        {/* Navigation Buttons from Screenshot 2026-06-17 135905.png */}
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="px-8 py-3 bg-[#1b4332] text-white rounded-lg font-bold hover:bg-[#153426] transition shadow-md"
          >
            Launch Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('products')}
            className="px-8 py-3 bg-white border border-gray-200 text-slate-700 rounded-lg font-bold hover:bg-gray-50 transition shadow-sm"
          >
            Browse Livestock
          </button>
        </div>
      </section>

      {/* Feature Grid from Screenshot 2026-06-17 135905.png */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <FeatureGrid />
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Performance Metrics</h2>
        <FarmStats />
      </section>

      {/* Market Data Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Operational Insights</h2>
        <MarketTrends />
      </section>
    </div>
  );
}