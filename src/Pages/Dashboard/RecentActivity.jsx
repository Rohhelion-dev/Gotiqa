import React, { useEffect, useState } from "react";
import api from "../../api/api";

api.post("/auth/login")

export default function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/dashboard/recent-activity")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Failed to load activity feed", error);
      });

  }, []);

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity Feed
        </h2>

        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          Live
        </span>

      </div>

      {/* EMPTY STATE */}
      {activities.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-slate-500 text-sm">
            No activities found.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {activities.map((activity) => (

            <div
              key={activity.id}
              className="group relative pl-5 py-3 border-l-2 border-emerald-200 hover:border-emerald-500 transition"
            >

              {/* subtle glow dot */}
              <div className="absolute -left-[6px] top-5 w-3 h-3 rounded-full bg-emerald-500 shadow-sm group-hover:scale-110 transition" />

              {/* TITLE */}
              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-900 transition">
                {activity.activity_type}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {activity.description}
              </p>

              {/* DATE */}
              <p className="text-xs text-slate-400 mt-2">
                {activity.activity_date}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}