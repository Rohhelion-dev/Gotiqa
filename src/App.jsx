import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Website/Home';
import About from './pages/Website/About';
import Products from './pages/Website/Products';
import AuthContainer from './pages/Auth/AuthContainer';
import Overview from './pages/Dashboard/Overview';
import HerdRecords from './pages/Dashboard/HerdRecords';
import SalesMedia from './pages/Dashboard/SalesMedia';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // home, about, products, auth, dashboard
  const [dbSubView, setDbSubView] = useState('overview'); // overview, herd, sales

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-slate-800 flex flex-col font-sans">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        dbSubView={dbSubView}
        setDbSubView={setDbSubView}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'about' && <About />}
        {currentView === 'products' && <Products />}
        {currentView === 'auth' && <AuthContainer onSuccess={() => setCurrentView('dashboard')} />}
        
        {currentView === 'dashboard' && (
          <div>
            {dbSubView === 'overview' && <Overview />}
            {dbSubView === 'herd' && <HerdRecords />}
            {dbSubView === 'sales' && <SalesMedia />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}