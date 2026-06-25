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
import DashboardHome from './pages/Dashboard/DashboardHome';

import AnimalManagementForm from './pages/Dashboard/AnimalManagementForm';
import HealthRecordsForm from './pages/Dashboard/HealthRecordsForm';
import FeedingRecordsForm from './pages/Dashboard/FeedingRecordsForm';
import BreedingRecordsForm from './pages/Dashboard/BreedingRecordsForm';
import ProductionRecordsForm from './pages/Dashboard/ProductionRecordsForm';
import ActivityLogsForm from './pages/Dashboard/ActivityLogsForm';

export default function App() {

const [currentView, setCurrentView] = useState('home');
const [user, setUser] = useState(null);

const [dashboardTab, setDashboardTab] =
useState('overview');

return (


<div className="min-h-screen bg-[#f4f7f5] text-slate-800 flex flex-col font-sans">

  <Navbar
    currentView={currentView}
    setCurrentView={setCurrentView}
  />

  <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">

    {currentView === 'home' && (
      <Home setCurrentView={setCurrentView} />
    )}

    {currentView === 'about' && (
      <About />
    )}

    {currentView === 'products' && (
      <Products />
    )}

    {currentView === 'contact' && (
      <Contact />
    )}

    {currentView === 'auth' && (
      <AuthContainer
        setUser={setUser}
        onSuccess={() => setCurrentView('dashboard')}
      />
    )}

    {currentView === 'dashboard' && user ? (

      <div className="space-y-8">

        <Operations />

        <HealthAlerts />

        {user.role === 'admin' && (

          <>

            <div className="bg-white rounded-xl shadow-sm border p-4">

              <h2 className="text-2xl font-bold mb-4">
                Gotiqa Admin Control Center
              </h2>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => setDashboardTab('overview')}
                  className="px-4 py-2 rounded-lg bg-green-700 text-white"
                >
                  Overview
                </button>

                <button
                  onClick={() => setDashboardTab('animals')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Animals
                </button>

                <button
                  onClick={() => setDashboardTab('health')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Health
                </button>

                <button
                  onClick={() => setDashboardTab('feeding')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Feeding
                </button>

                <button
                  onClick={() => setDashboardTab('breeding')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Breeding
                </button>

                <button
                  onClick={() => setDashboardTab('production')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Production
                </button>

                <button
                  onClick={() => setDashboardTab('activity')}
                  className="px-4 py-2 rounded-lg bg-slate-200"
                >
                  Activity
                </button>

              </div>

            </div>

            {dashboardTab === 'overview' && (
              <DashboardHome />
            )}

            {dashboardTab === 'animals' && (
              <AnimalManagementForm />
            )}

            {dashboardTab === 'health' && (
              <HealthRecordsForm />
            )}

            {dashboardTab === 'feeding' && (
              <FeedingRecordsForm />
            )}

            {dashboardTab === 'breeding' && (
              <BreedingRecordsForm />
            )}

            {dashboardTab === 'production' && (
              <ProductionRecordsForm />
            )}

            {dashboardTab === 'activity' && (
              <ActivityLogsForm />
            )}

          </>

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
