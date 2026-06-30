import React, { useEffect, useState } from "react";
import api from "../../api/api";


export default function RecentHealthRecords() {

  const [records, setRecords] = useState([]);

  useEffect(() => {

    api
      .get("/dashboard/recent-health")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Failed to load health records", error);
      });

  }, []);

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Recent Health Records
        </h2>

        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          Clinical
        </span>

      </div>

      {/* EMPTY STATE */}
      {records.length === 0 ? (

        <div className="text-center py-10">
          <p className="text-slate-500 text-sm">
            No health records found.
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {records.map((record) => (

            <div
              key={record.id}
              className="group relative bg-slate-50/60 hover:bg-slate-50 border border-slate-100 hover:border-emerald-200 rounded-xl p-4 transition"
            >

              {/* TOP ROW */}
              <div className="flex justify-between items-start gap-4">

                <h3 className="font-semibold text-slate-800 group-hover:text-emerald-900 transition">
                  {record.diagnosis || "General Checkup"}
                </h3>

                <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                  {record.record_date}
                </span>

              </div>

              {/* STATUS */}
              <p className="text-sm text-slate-600 mt-2">
                Status:{" "}
                <span className="font-medium text-slate-800">
                  {record.health_status || "Unknown"}
                </span>
              </p>

              {/* VET */}
              <p className="text-sm text-slate-500 mt-1">
                Vet: {record.veterinarian || "Not Specified"}
              </p>

              {/* LEFT ACCENT BAR */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-emerald-500 rounded-l-xl opacity-60 group-hover:opacity-100 transition" />

            </div>

          ))}

        </div>

      )}

    </div>

  );

}