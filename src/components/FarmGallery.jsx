import React from "react";

export default function FarmGallery() {
const galleryItems = [
{
title: "Farm Entrance",
image: "/images/gallery/farm-entrance.jpg",
},
{
title: "Healthy Goat Herd",
image: "/images/gallery/goat-herd.jpg",
},
{
title: "Breeding Stock",
image: "/images/gallery/breeding-stock.jpg",
},
{
title: "Feeding Program",
image: "/images/gallery/feeding-area.jpg",
},
{
title: "Veterinary Care",
image: "/images/gallery/vet-care.jpg",
},
{
title: "Gotiqa Team",
image: "/images/gallery/farm-team.jpg",
},
];

return ( <section className="max-w-7xl mx-auto px-4 py-20">


  <div className="text-center mb-12">

    <p className="uppercase tracking-widest text-[#40916c] font-semibold mb-3">
      Farm Gallery
    </p>

    <h2 className="text-4xl font-bold text-[#1b4332] mb-4">
      Life at Gotiqa Farm
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto">
      Take a glimpse into our daily operations, healthy livestock,
      sustainable practices, and the environment where quality begins.
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {galleryItems.map((item, index) => (

      <div
        key={index}
        className="group overflow-hidden rounded-3xl shadow-md bg-white"
      >

        <div className="h-72 bg-[#d8f3dc] flex items-center justify-center relative overflow-hidden">

          {/*
          Future image:

          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          */}

          <span className="font-semibold text-[#2d6a4f]">
            {item.title}
          </span>

        </div>

        <div className="p-4">

          <h3 className="font-bold text-slate-800">
            {item.title}
          </h3>

        </div>

      </div>

    ))}

  </div>

</section>


);
}
