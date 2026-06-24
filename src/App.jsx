import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Website/Home';
import About from './pages/Website/About';
import Products from './pages/Website/Products';
import Contact from './pages/Website/Contact';

import AuthContainer from './pages/Auth/AuthContainer';

import Operations from './pages/Dashboard/Operations';
import HealthAlerts from './pages/Dashboard/HealthAlerts';

import AnimalManagementForm from './pages/Dashboard/AnimalManagementForm';
import HealthRecordsForm from './pages/Dashboard/HealthRecordsForm';
import ProductionRecordsForm from './pages/Dashboard/ProductionRecordsForm';
import BreedingRecordsForm from './pages/Dashboard/BreedingRecordsForm';
import FeedingRecordsForm from './pages/Dashboard/FeedingRecordsForm';
import ActivityLogsForm from './pages/Dashboard/ActivityLogsForm';

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
        {currentView === 'home' && (
          <Home setCurrentView={setCurrentView} />
        )}

        {currentView === 'about' && <About />}

        {currentView === 'products' && <Products />}

        {currentView === 'contact' && <Contact />}

        {/* Authentication */}
        {currentView === 'auth' && (
          <AuthContainer
            setUser={setUser}
            onSuccess={() => setCurrentView('dashboard')}
          />
        )}

        {/* Dashboard */}
        {currentView === 'dashboard' && user ? (
          <div className="space-y-8">

            {/* General Dashboard */}
            <Operations />

            <HealthAlerts />

            {/* Admin Dashboard */}
            {user.role === 'admin' && (
              <section className="mt-8 border-t border-gray-200 pt-8">

                <h3 className="text-2xl font-bold mb-6 text-slate-800">
                  Admin Command Center
                </h3>

                <div className="space-y-8">

                  <AnimalManagementForm />

                  <HealthRecordsForm />

                  <ProductionRecordsForm />

                  <BreedingRecordsForm />

                  <FeedingRecordsForm />

                  <ActivityLogsForm />

                </div>

              </section>
            )}

          </div>
        ) : (
          currentView === 'dashboard' && (
            <div className="text-center py-20">

              <h2 className="text-2xl font-bold mb-4">
                Access Restricted
              </h2>

              <p className="text-slate-600 mb-6">
                Please log in to continue.
              </p>

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