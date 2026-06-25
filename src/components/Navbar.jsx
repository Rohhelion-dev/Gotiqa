import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="nav-container max-w-6xl mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2 cursor-pointer text-xl font-bold text-[#1b4332]"
        >
          <span className="bg-[#1b4332] text-white p-1.5 rounded-lg text-sm">G</span>
          GotiqaSmartFarm
        </div>

        {/* Links Area */}
        <div className="nav-links">
          <span 
            onClick={() => setCurrentView('home')} 
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
          >
            Home
          </span>
          <span 
            onClick={() => setCurrentView('about')} 
            className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
          >
            About
          </span>
          <span 
            onClick={() => setCurrentView('products')} 
            className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
          >
            Products
          </span>
          <span 
            onClick={() => setCurrentView('contact')} 
            className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
          >
            Contact
          </span>
        </div>

        {/* Action Button */}
        <div className="nav-action-btn">
          <button 
            onClick={() => setCurrentView('auth')}
            className="w-full md:w-auto px-5 py-2.5 bg-[#1b4332] text-white rounded-lg font-semibold text-sm hover:bg-[#153426] transition shadow-sm"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}