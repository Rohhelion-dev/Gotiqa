import React, { useState, useEffect } from 'react';
import axios from "axios";

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

import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [refreshAlerts] = useState(0);

  const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const card = "bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 flex flex-col font-sans">

      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-grow">

        {currentView !== "dashboard" && (
          <div className={`${container} py-10 space-y-10`}>

            {currentView === "home" && (
              <Home setCurrentView={setCurrentView} />
            )}

            {currentView === "about" && (
              <div className={`${card} p-8`}>
                <About />
              </div>
            )}

            {currentView === "products" && (
              <div className={`${card} p-8`}>
                <Products />
              </div>
            )}

            {currentView === "contact" && (
              <div className={`${card} p-8`}>
                <Contact />
              </div>
            )}

            {currentView === "auth" && (
              <div className={`${card} p-8 max-w-2xl mx-auto`}>
                <AuthContainer
                  setUser={setUser}
                  setToken={setToken}
                  onSuccess={() => setCurrentView("dashboard")}
                />
              </div>
            )}

          </div>
        )}

        {currentView === "dashboard" && user && (

          <div className="min-h-screen flex bg-slate-50">

            <aside className="w-64 bg-white/90 backdrop-blur border-r hidden md:flex flex-col">

              <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-emerald-900">
                  Gotiqa Admin
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                  Smart Farm System
                </p>
              </div>

              <nav className="flex flex-col gap-1 p-4 text-sm">

                {[
                  "overview",
                  "animals",
                  "health",
                  "feeding",
                  "breeding",
                  "production",
                  "activity",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDashboardTab(tab)}
                    className={`text-left px-3 py-2 rounded-xl transition capitalize ${
                      dashboardTab === tab
                        ? "bg-emerald-900 text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}

                <button
                  onClick={logout}
                  className="mt-6 text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>

              </nav>

            </aside>

            <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">

              <div className={`${card} p-8`}>
                <h2 className="text-3xl font-bold text-slate-900">
                  Farm Control Center
                </h2>

                <p className="text-slate-500 mt-1">
                  Manage livestock operations in real time
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className={`${card} p-6`}>
                  <Operations />
                </div>

                <div className={`${card} p-6`}>
                  <HealthAlerts refresh={refreshAlerts} />
                </div>

              </div>

              <div className={`${card} p-6`}>
                <h3 className="text-lg font-semibold capitalize">
                  {dashboardTab}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Logged in as: {user.role}
                </p>
              </div>

              {dashboardTab === "overview" && <DashboardHome />}

              {user.role === "admin" && (
                <>
                  {dashboardTab === "animals" && <AnimalManagementForm />}
                  {dashboardTab === "health" && <HealthRecordsForm />}
                  {dashboardTab === "feeding" && <FeedingRecordsForm />}
                  {dashboardTab === "breeding" && <BreedingRecordsForm />}
                  {dashboardTab === "production" && <ProductionRecordsForm />}
                  {dashboardTab === "activity" && <ActivityLogsForm />}
                </>
              )}

              {user.role === "farmer" && (
                <div className={`${card} p-8`}>
                  <h2 className="text-2xl font-bold text-emerald-900 mb-3">
                    Welcome Farmer 👨‍🌾
                  </h2>

                  <p className="text-slate-600 mb-6">
                    Your account has been successfully created and you are now logged in.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">

                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                      <h3 className="font-semibold text-emerald-900">
                        Herd Records
                      </h3>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                      <h3 className="font-semibold text-blue-900">
                        Health Reports
                      </h3>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl">
                      <h3 className="font-semibold text-amber-900">
                        Production Records
                      </h3>
                    </div>

                  </div>
                </div>
              )}

            </main>

          </div>
        )}

        {currentView === "dashboard" && !user && (
          <div className={`${card} text-center py-16 max-w-xl mx-auto mt-16 p-8`}>
            <h2 className="text-2xl font-bold mb-4">
              Access Restricted
            </h2>

            <p className="text-slate-600 mb-6">
              Please log in to continue.
            </p>

            <button
              onClick={() => setCurrentView("auth")}
              className="bg-emerald-900 text-white px-6 py-2 rounded-xl"
            >
              Go to Login
            </button>
          </div>
        )}

      </main>

      <WhatsAppButton />
      <Footer />

    </div>
  );
}
