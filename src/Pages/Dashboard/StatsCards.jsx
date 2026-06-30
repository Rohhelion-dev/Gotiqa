import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function StatsCards() {

  const [stats, setStats] = useState({
    animals: 0,
    healthRecords: 0,
    breedingRecords: 0,
    feedingRecords: 0,
    productionRecords: 0,
    users: 0
  });

  useEffect(() => {

    axios
      .get("http://localhost:5000/dashboard/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Failed to load dashboard stats:", error);
      });

  }, []);

  const cards = [
    { title: "Animals", value: stats.animals },
    { title: "Health Records", value: stats.healthRecords },
    { title: "Breeding Records", value: stats.breedingRecords },
    { title: "Feeding Records", value: stats.feedingRecords },
    { title: "Production Records", value: stats.productionRecords },
    { title: "Users", value: stats.users }
  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >

          {/* subtle accent line */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-t-2xl opacity-70" />

          {/* TITLE */}
          <h3 className="text-slate-500 text-sm font-medium tracking-wide">
            {card.title}
          </h3>

          {/* VALUE */}
          <p className="text-3xl font-bold text-slate-900 mt-3 group-hover:text-emerald-900 transition">
            {card.value}
          </p>

          {/* subtle hint line */}
          <div className="mt-4 h-px bg-slate-100" />

          {/* footer micro label (pure UI enhancement, no logic change) */}
          <p className="text-xs text-slate-400 mt-3">
            Live system metric
          </p>

        </div>

      ))}

    </div>

  );
}