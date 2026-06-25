import React from "react";

import StatsCards from "./StatsCards";
import RecentAnimals from "./RecentAnimals";
import RecentHealthRecords from "./RecentHealthRecords";
import RecentActivity from "./RecentActivity";

export default function DashboardHome() {

return (


<div className="space-y-8">

  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Gotiqa Farm Dashboard
    </h1>

    <p className="text-gray-500 mt-2">
      Real-time overview of farm operations.
    </p>
  </div>

  <StatsCards />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <RecentAnimals />

    <RecentHealthRecords />

  </div>

  <RecentActivity />

</div>


);

}
