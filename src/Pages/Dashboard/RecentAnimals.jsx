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
    console.error(
      "Failed to load animals",
      error
    );
  });


}, []);

return (


<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

  <h2 className="text-xl font-bold mb-4">
    Recent Animals
  </h2>

  {animals.length === 0 ? (

    <p className="text-gray-500">
      No animals found.
    </p>

  ) : (

    <div className="space-y-4">

      {animals.map((animal) => (

        <div
          key={animal.id}
          className="border-b border-gray-100 pb-3"
        >

          <div className="flex justify-between">

            <h3 className="font-semibold text-slate-800">
              {animal.tag_number}
            </h3>

            <span className="text-sm text-gray-500">
              {animal.gender}
            </span>

          </div>

          <p className="text-sm text-gray-600">
            {animal.name || "Unnamed Animal"}
          </p>

          <p className="text-sm text-gray-500">
            {animal.species} • {animal.breed}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Age: {animal.age || 0} months
          </p>

        </div>

      ))}

    </div>

  )}

</div>


);

}
