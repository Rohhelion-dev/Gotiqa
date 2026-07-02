import React from "react";

export default function FarmGallery() {
  const gallerySections = [
    {
      title: "Life at Gotiqa Farm",
      images: [
        {
          title: "Farm Entrance",
          image: `${import.meta.env.BASE_URL}images/gallery/farm-entrance.jpeg`,
          fit: "cover",
        },
        {
          title: "Healthy Goat Herd",
          image: `${import.meta.env.BASE_URL}images/gallery/goat-herd.jpeg`,
          fit: "cover",
        },
        {
          title: "Breeding Stock",
          image: `${import.meta.env.BASE_URL}images/gallery/breeding-stock.jpeg`,
          fit: "cover",
        },
        {
          title: "Feeding Program",
          image: `${import.meta.env.BASE_URL}images/gallery/feeding-area.jpeg`,
          fit: "cover",
        },
        {
          title: "Veterinary Care",
          image: `${import.meta.env.BASE_URL}images/gallery/vet-care.jpeg`,
          fit: "contain",
        },
        {
          title: "Gotiqa Team",
          image: `${import.meta.env.BASE_URL}images/gallery/farm-team.jpeg`,
          fit: "contain",
        },
      ],
    },

    {
      title: "Night Life at Gotiqa Farm",
      images: [
        {
          title: "Night Patrol",
          image: `${import.meta.env.BASE_URL}images/gallery/night1.jpeg`,
          fit: "cover",
        },
        {
          title: "Evening Feeding",
          image: `${import.meta.env.BASE_URL}images/gallery/night2.jpeg`,
          fit: "cover",
        },
        {
          title: "Secure Housing",
          image: `${import.meta.env.BASE_URL}images/gallery/night3.jpeg`,
          fit: "cover",
        },
      ],
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

      {gallerySections.map((section) => (
        <div key={section.title} className="mb-16">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">
            {section.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.images.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-3xl shadow-md bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full transition duration-700 group-hover:scale-105 ${
                      item.fit === "contain"
                        ? "object-contain"
                        : "object-cover"
                    }`}
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
        </div>
      ))}
    </section>
  );
}
