import React from "react";

export default function FarmGallery() {
  const galleryItems = [
    {
      title: "Farm Entrance",
      image: `${import.meta.env.BASE_URL}images/gallery/farm-entrance.jpeg`,
    },
    {
      title: "Healthy Goat Herd",
      image: `${import.meta.env.BASE_URL}images/gallery/goat-herd.jpeg`,
    },
    {
      title: "Breeding Stock",
      image: `${import.meta.env.BASE_URL}images/gallery/breeding-stock.jpeg`,
    },
    {
      title: "Feeding Program",
      image: `${import.meta.env.BASE_URL}images/gallery/feeding-area.jpeg`,
    },
    {
      title: "Veterinary Care",
      image: `${import.meta.env.BASE_URL}images/gallery/vet-care.jpeg`,
    },
    {
      title: "Gotiqa Team",
      image: `${import.meta.env.BASE_URL}images/gallery/farm-team.jpeg`,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
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
            <div className="h-72 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                loading="lazy"
              />
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