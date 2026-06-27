import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecentAnimals() {

  const [animals, setAnimals] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/dashboard/recent-animals")
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error("Failed to load animals", error);
      });

  }, []);

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-semibold text-slate-900">
          Recent Animals
        </h2>

        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          Herd
        </span>

      </div>

      {/* EMPTY STATE */}
      {animals.length === 0 ? (

        <div className="text-center py-10">
          <p className="text-slate-500 text-sm">
            No animals found.
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {animals.map((animal) => (

            <div
              key={animal.id}
              className="group relative bg-slate-50/60 hover:bg-slate-50 border border-slate-100 hover:border-emerald-200 rounded-xl p-4 transition"
            >

              {/* TOP ROW */}
              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold text-slate-800 group-hover:text-emerald-900 transition">
                    {animal.tag_number}
                  </h3>

                  <p className="text-sm text-slate-600 mt-1">
                    {animal.name || "Unnamed Animal"}
                  </p>

                </div>

                <span className="text-xs text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                  {animal.gender}
                </span>

              </div>

              {/* DETAILS */}
              <p className="text-sm text-slate-500 mt-2">
                {animal.species} • {animal.breed}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Age: {animal.age || 0} months
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