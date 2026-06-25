import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecentActivity() {

const [activities, setActivities] = useState([]);

useEffect(() => {


axios
  .get("http://localhost:5000/dashboard/recent-activity")
  .then((response) => {
    setActivities(response.data);
  })
  .catch((error) => {
    console.error(
      "Failed to load activity feed",
      error
    );
  });


}, []);

return (


<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

  <h2 className="text-xl font-bold mb-4">
    Recent Activity Feed
  </h2>

  {activities.length === 0 ? (

    <p className="text-gray-500">
      No activities found.
    </p>

  ) : (

    <div className="space-y-4">

      {activities.map((activity) => (

        <div
          key={activity.id}
          className="border-l-4 border-green-600 pl-4 py-2"
        >

          <h3 className="font-semibold text-slate-800">
            {activity.activity_type}
          </h3>

          <p className="text-sm text-gray-600">
            {activity.description}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {activity.activity_date}
          </p>

        </div>

      ))}

    </div>

  )}

</div>


);

}
