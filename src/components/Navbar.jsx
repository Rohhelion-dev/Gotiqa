import React from 'react';

export default function Navbar({ currentView, setCurrentView, dbSubView, setDbSubView }) {
  return (
    <header className="bg-white shadow-xs border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white font-black text-sm">G</div>
          <span className="text-xl font-black text-[#1e3f20] tracking-tight">GotiqaSmartFarm</span>
        </div>

        {/* Global Nav Mode Toggle */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <button onClick={() => setCurrentView('home')} className={`hover:text-[#2d6a4f] ${currentView === 'home' && 'text-[#2d6a4f]'}`}>Home</button>
          <button onClick={() => setCurrentView('about')} className={`hover:text-[#2d6a4f] ${currentView === 'about' && 'text-[#2d6a4f]'}`}>About</button>
          <button onClick={() => setCurrentView('products')} className={`hover:text-[#2d6a4f] ${currentView === 'products' && 'text-[#2d6a4f]'}`}>Products</button>
          
          <div className="w-[1px] h-4 bg-gray-200 mx-2" />

          {currentView === 'dashboard' ? (
            /* Mini Dashboard Navigation Routing */
            <div className="flex bg-[#f4f7f5] p-1 rounded-lg gap-1 border border-emerald-100 text-xs">
              <button onClick={() => setDbSubView('overview')} className={`px-3 py-1.5 rounded-md transition-all ${dbSubView === 'overview' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'text-gray-600'}`}>Overview</button>
              <button onClick={() => setDbSubView('herd')} className={`px-3 py-1.5 rounded-md transition-all ${dbSubView === 'herd' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'text-gray-600'}`}>Herd Records</button>
              <button onClick={() => setDbSubView('sales')} className={`px-3 py-1.5 rounded-md transition-all ${dbSubView === 'sales' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'text-gray-600'}`}>Market & Media</button>
              <button onClick={() => setCurrentView('home')} className="px-3 py-1.5 rounded-md text-rose-700 font-bold hover:bg-rose-50">Exit Portal</button>
            </div>
          ) : (
            <button onClick={() => setCurrentView('auth')} className="bg-[#2d6a4f] hover:bg-[#1e3f20] text-white px-4 py-2 rounded-lg text-xs tracking-wide transition-all shadow-xs">
              Secure Terminal Access
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}