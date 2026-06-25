import React, { useEffect, useState } from "react";
import axios from "axios";

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
    console.error(
      "Failed to load dashboard stats:",
      error
    );
  });


}, []);

const cards = [
{
title: "Animals",
value: stats.animals
},
{
title: "Health Records",
value: stats.healthRecords
},
{
title: "Breeding Records",
value: stats.breedingRecords
},
{
title: "Feeding Records",
value: stats.feedingRecords
},
{
title: "Production Records",
value: stats.productionRecords
},
{
title: "Users",
value: stats.users
}
];

return ( <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">


  {cards.map((card, index) => (

    <div
      key={index}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >

      <h3 className="text-gray-500 text-sm font-medium">
        {card.title}
      </h3>

      <p className="text-3xl font-bold text-slate-800 mt-2">
        {card.value}
      </p>

    </div>

  ))}

</div>


);
}
