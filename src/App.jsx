import React, { useState, useEffect } from "react";
import api from "../api/api";

api.post("/auth/login")

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Website/Home";
import About from "./pages/Website/About";
import Products from "./pages/Website/Products";
import Contact from "./pages/Website/Contact";
import AuthContainer from "./pages/Auth/AuthContainer";
import SignUpForm from "./pages/Auth/SignUpForm";

import Operations from "./pages/Dashboard/Operations";
import HealthAlerts from "./pages/Dashboard/HealthAlerts";
import DashboardHome from "./pages/Dashboard/DashboardHome";

import AnimalManagementForm from "./pages/Dashboard/AnimalManagementForm";
import HealthRecordsForm from "./pages/Dashboard/HealthRecordsForm";
import FeedingRecordsForm from "./pages/Dashboard/FeedingRecordsForm";
import BreedingRecordsForm from "./pages/Dashboard/BreedingRecordsForm";
import ProductionRecordsForm from "./pages/Dashboard/ProductionRecordsForm";
import ActivityLogsForm from "./pages/Dashboard/ActivityLogsForm";
import AnimalsView from "./pages/Dashboard/AnimalsView";

import WhatsAppButton from "./components/WhatsAppButton";

const API_URL = import.meta.env.VITE_API_URL ;

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [dashboardTab, setDashboardTab] = useState("overview");
  const [refreshAlerts] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);

  const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const card =
    "bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (!savedUser || !savedToken) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthChecked(true);
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      axios.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return;
    }

    delete axios.defaults.headers.common.Authorization;
  }, [token]);

  const goToAuth = (mode = "login") => {
    setAuthMode(mode);
    setCurrentView("auth");
  };

  const goToDashboard = () => {
    setCurrentView("dashboard");
    setDashboardTab("overview");
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch {
      // Logout should still clear local state even if the server is unavailable.
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;

    setUser(null);
    setToken(null);
    setDashboardTab("overview");
    setCurrentView("home");
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading Gotiqa...
      </div>
    );
  }

return (
  <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 font-sans text-slate-800">
    <Navbar currentView={currentView} setCurrentView={setCurrentView} />

    <main className="flex-grow">
      {currentView !== "dashboard" && (
        <div className={`${container} space-y-10 py-10`}>
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

          {currentView === "auth" && authMode === "login" && (
            <AuthContainer
              setUser={setUser}
              setToken={setToken}
              onSuccess={goToDashboard}
              onShowSignUp={() => setAuthMode("signup")}
            />
          )}

          {currentView === "auth" && authMode === "signup" && (
            <SignUpForm
              setUser={setUser}
              setToken={setToken}
              onSuccess={goToDashboard}
              onShowLogin={() => setAuthMode("login")}
            />
          )}
        </div>
      )}

      {currentView === "dashboard" && user && (
        <div className="flex min-h-screen bg-slate-50">
          <aside className="hidden w-64 flex-col border-r bg-white/90 backdrop-blur md:flex">
            <div className="border-b p-6">
              <h1 className="text-xl font-bold text-emerald-900">
                Gotiqa Admin
              </h1>

              <p className="mt-1 text-xs text-slate-500">
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
                  type="button"
                  onClick={() => setDashboardTab(tab)}
                  className={`rounded-xl px-3 py-2 text-left capitalize transition ${
                    dashboardTab === tab
                      ? "bg-emerald-900 text-white"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}

              <button
                type="button"
                onClick={logout}
                className="mt-6 rounded-xl px-3 py-2 text-left text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </nav>
          </aside>

          <div className="flex-1 p-6 space-y-6">
            {dashboardTab !== "animals" && (
              <div className={`${card} p-8`}>
                <h2 className="text-3xl font-bold text-slate-900">
                  Farm Control Center
                </h2>

                <p className="mt-1 text-slate-500">
                  Manage livestock operations in real time
                </p>
              </div>
            )}

            {dashboardTab !== "animals" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className={`${card} p-6`}>
                  <Operations />
                </div>

                <div className={`${card} p-6`}>
                  <HealthAlerts refresh={refreshAlerts} />
                </div>
              </div>
            )}

            <div className={`${card} p-6`}>
              <h3 className="text-lg font-semibold capitalize">
                {dashboardTab}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Logged in as: {user.role}
              </p>
            </div>

            {dashboardTab === "overview" && (
              <DashboardHome user={user} />
            )}

            {dashboardTab === "animals" && (
              <div className="space-y-6">
                <AnimalsView />

                {user.role === "admin" && (
                  <AnimalManagementForm user={user} />
                )}
              </div>
            )}

            {user.role === "admin" && (
              <>
                {dashboardTab === "health" && (
                  <HealthRecordsForm user={user} />
                )}

                {dashboardTab === "feeding" && (
                  <FeedingRecordsForm user={user} />
                )}

                {dashboardTab === "breeding" && (
                  <BreedingRecordsForm user={user} />
                )}

                {dashboardTab === "production" && (
                  <ProductionRecordsForm user={user} />
                )}

                {dashboardTab === "activity" && (
                  <ActivityLogsForm user={user} />
                )}
              </>
            )}

            {user.role === "farmer" && (
              <div className={`${card} p-8`}>
                <h2 className="mb-3 text-2xl font-bold text-emerald-900">
                  Welcome Farmer
                </h2>

                <p className="mb-6 text-slate-600">
                  Your account is active. You can now access your livestock
                  records and farm updates.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                    <h3 className="font-semibold text-emerald-900">
                      Herd Records
                    </h3>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                    <h3 className="font-semibold text-blue-900">
                      Health Reports
                    </h3>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
                    <h3 className="font-semibold text-amber-900">
                      Production Records
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentView === "dashboard" && !user && (
        <div
          className={`${card} mx-auto mt-16 max-w-xl p-8 py-16 text-center`}
        >
          <h2 className="mb-4 text-2xl font-bold">
            Access Restricted
          </h2>

          <p className="mb-6 text-slate-600">
            Please log in to continue to the farm dashboard.
          </p>

          <button
            type="button"
            onClick={() => goToAuth("login")}
            className="rounded-xl bg-emerald-900 px-6 py-2 text-white"
          >
            Go to Login
          </button>
        </div>
      )}
    </main>

    {currentView !== "dashboard" && <WhatsAppButton />}
    {currentView !== "dashboard" && <Footer />}
  </div>
);
}