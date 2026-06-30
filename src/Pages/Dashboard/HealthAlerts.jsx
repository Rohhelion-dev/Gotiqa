import React, { useEffect, useState } from 'react';
import api from "../../api/api";

api.post("/auth/login")

export default function HealthAlerts() {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/dashboard/health-alerts"
        );

        setAlerts(res.data);
      } catch (err) {
        console.error("Failed to load health alerts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 w-full">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Herd Health Alerts
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Showing only vaccinated animals
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-slate-500 text-sm">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No vaccinated animals to display.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="text-slate-400 text-sm border-b">
                <th className="pb-3">Animal</th>
                <th className="pb-3">Task</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((alert, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >

                  <td className="py-4 font-semibold text-slate-800">
                    {alert.animal}
                  </td>

                  <td className="py-4 text-slate-700">
                    {alert.task}
                  </td>

                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold border bg-green-100 text-green-700 border-green-200">
                      VACCINATED
                    </span>
                  </td>

                  <td className="py-4 text-slate-600">
                    {alert.date}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}