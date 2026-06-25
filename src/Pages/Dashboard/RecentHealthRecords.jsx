import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecentHealthRecords() {

const [records, setRecords] = useState([]);

useEffect(() => {


axios
  .get("http://localhost:5000/dashboard/recent-health")
  .then((response) => {
    setRecords(response.data);
  })
  .catch((error) => {
    console.error(
      "Failed to load health records",
      error
    );
  });


}, []);

return (


<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

  <h2 className="text-xl font-bold mb-4">
    Recent Health Records
  </h2>

  {records.length === 0 ? (

    <p className="text-gray-500">
      No health records found.
    </p>

  ) : (

    <div className="space-y-4">

      {records.map((record) => (

        <div
          key={record.id}
          className="border-b border-gray-100 pb-3"
        >

          <div className="flex justify-between">

            <h3 className="font-semibold text-slate-800">
              {record.diagnosis || "General Checkup"}
            </h3>

            <span className="text-sm text-gray-500">
              {record.record_date}
            </span>

          </div>

          <p className="text-sm text-gray-600">
            Status: {record.health_status || "Unknown"}
          </p>

          <p className="text-sm text-gray-500">
            Vet: {record.veterinarian || "Not Specified"}
          </p>

        </div>

      ))}

    </div>

  )}

</div>


);

}
