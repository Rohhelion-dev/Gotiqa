export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center">
      {/* Brand */}
      <div className="font-bold text-xl text-[#1b4332]">GotiqaSmartFarm</div>
      
      {/* Navigation Links */}
      <div className="flex gap-8 text-sm font-medium">
        {['home', 'about', 'products', 'contact'].map((view) => (
          <button 
            key={view}
            onClick={() => setCurrentView(view)} 
            className={`capitalize transition ${currentView === view ? 'text-[#1b4332] font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Action Button */}
      <button 
        onClick={() => setCurrentView('auth')}
        className="bg-[#1b4332] text-white px-5 py-2 rounded font-semibold text-sm hover:bg-[#153426] transition shadow-md"
      >
        Secure Terminal Access
      </button>
    </nav>
  );
}