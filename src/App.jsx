import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Website/Home';
import About from './Pages/Website/About';
import Products from './Pages/Website/Products';
import Contact from './Pages/Website/Contact';
import AuthContainer from './Pages/Auth/AuthContainer';
import Operations from './Pages/Dashboard/Operations';
import AnimalManagementForm from './Pages/Dashboard/AnimalManagementForm';
import HealthAlerts from './Pages/Dashboard/HealthAlerts';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-slate-800 flex flex-col font-sans">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {/* Website Pages */}
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'about' && <About />}
        {currentView === 'products' && <Products />}
        {currentView === 'contact' && <Contact />}
        
        {/* Auth Page */}
        {currentView === 'auth' && (
          <AuthContainer setUser={setUser} onSuccess={() => setCurrentView('dashboard')} />
        )}
        
        {/* Dashboard Logic: Integrated Operations and Health Alerts */}
        {currentView === 'dashboard' && user ? (
          <div className="space-y-8">
            
            {/* 1. General User Dashboard (Operations View) */}
            <div className="space-y-8">
              <Operations />
              <HealthAlerts />
            </div>
            
            {/* 2. Admin Dashboard (Advanced View) */}
            {user.role === 'admin' && (
              <section className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6 text-slate-800">Admin Command Center</h3>
                <AnimalManagementForm />
              </section>
            )}
          </div>
        ) : (
          currentView === 'dashboard' && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
              <p className="text-slate-600 mb-6">Please log in to continue.</p>
              <button 
                onClick={() => setCurrentView('auth')}
                className="bg-[#1b4332] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#153426] transition"
              >
                Go to Login
              </button>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}