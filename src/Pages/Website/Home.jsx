import React from 'react';
import FarmStats from './FarmStats';
import MarketTrends from '../../components/MarketTrends';
import FeatureGrid from '../../components/FeatureGrid';

export default function Home({ setCurrentView }) {
  return (
    <div className="bg-[#f4f7f5] min-h-screen">
      {/* Hero / Welcome Section */}
      <section className="text-center py-10 md:py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6">
          Welcome to Gotiqa SmartFarm
        </h1>
        <p className="text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Leading the way in data-driven livestock management and sustainable agricultural excellence.
        </p>
        
        {/* Handled by standard media queries */}
        <div className="hero-actions">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="hero-btn bg-[#1b4332] text-white hover:bg-[#153426] shadow-md"
          >
            Launch Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('products')}
            className="hero-btn bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 shadow-sm"
          >
            Browse Livestock
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <FeatureGrid />
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">Performance Metrics</h2>
        <FarmStats />
      </section>

      {/* Market Data Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">Operational Insights</h2>
        <MarketTrends />
      </section>
    </div>
  );
}