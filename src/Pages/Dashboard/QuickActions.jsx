import api from "../../api/api";
import React from "react";

export default function QuickActions() {
return ( <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">


  <h2 className="text-xl font-semibold text-slate-800 mb-4">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition">
      + Add Animal
    </button>

    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition">
      + Health Record
    </button>

    <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-medium transition">
      + Feeding Record
    </button>

    <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition">
      + Breeding Record
    </button>

    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition">
      + Production Record
    </button>

    <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition">
      View Reports
    </button>

  </div>

</div>


);
}
