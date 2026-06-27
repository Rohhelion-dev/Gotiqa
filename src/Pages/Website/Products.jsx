import React from "react";

export default function Products() {
return ( <div className="bg-[#f4f7f5]">


  {/* HERO SECTION */}
  <section className="max-w-6xl mx-auto px-4 py-20">

    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div>

        <p className="uppercase tracking-[0.3em] text-[#2d6a4f] font-semibold mb-4">
          Our Products
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
          Premium Goat Meat & Healthy Livestock
        </h1>

        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          At Gotiqa Farm, we provide quality goat meat and carefully managed
          livestock raised through sustainable farming practices and modern
          farm management systems.
        </p>

        <div className="flex flex-wrap gap-4">

          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            🐐 Healthy Livestock
          </div>

          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            🩺 Veterinary Managed
          </div>

          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            🌱 Sustainable Farming
          </div>

        </div>

      </div>

      <div className="h-[350px] bg-gray-300 rounded-3xl flex items-center justify-center">
        <span className="text-gray-600 font-medium">
          Future Product Image
        </span>
      </div>

    </div>

  </section>

  {/* FEATURED PRODUCT */}

  <section className="max-w-6xl mx-auto px-4 py-12">

    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

      <div className="grid md:grid-cols-2">

        <div className="h-[350px] bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-medium">
            Premium Goat Meat Image
          </span>
        </div>

        <div className="p-10 flex flex-col justify-center">

          <span className="text-sm font-bold text-[#2d6a4f] uppercase tracking-wider">
            Featured Product
          </span>

          <h2 className="text-4xl font-extrabold mt-3 mb-4">
            🥩 Premium Goat Meat
          </h2>

          <p className="text-3xl font-black text-[#1b4332] mb-6">
            KSh 850 / kg
          </p>

          <ul className="space-y-3 text-slate-600">

            <li>✓ Fresh Supply</li>
            <li>✓ Hygienically Processed</li>
            <li>✓ Bulk Orders Available</li>
            <li>✓ Restaurant Supply</li>
            <li>✓ Consistent Quality</li>

          </ul>

        </div>

      </div>

    </div>

  </section>

  {/* LIVESTOCK SECTION */}

  <section className="max-w-6xl mx-auto px-4 py-20">

    <div className="text-center mb-12">

      <h2 className="text-3xl font-bold text-slate-800">
        Available Livestock
      </h2>

      <p className="text-slate-600 mt-3">
        Carefully raised and professionally managed livestock.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Breeding Goats */}

      <div className="bg-white rounded-3xl overflow-hidden shadow-md">

        <div className="h-[220px] bg-gray-300 flex items-center justify-center">
          Future Goat Image
        </div>

        <div className="p-6">

          <h3 className="text-2xl font-bold mb-2">
            🐐 Breeding Goats
          </h3>

          <p className="text-[#1b4332] text-xl font-bold mb-4">
            KSh 18,000 - 35,000
          </p>

          <p className="text-slate-600">
            Quality breeding stock selected for productivity,
            health, and strong genetics.
          </p>

        </div>

      </div>

      {/* Mature Goats */}

      <div className="bg-white rounded-3xl overflow-hidden shadow-md">

        <div className="h-[220px] bg-gray-300 flex items-center justify-center">
          Future Goat Image
        </div>

        <div className="p-6">

          <h3 className="text-2xl font-bold mb-2">
            🐐 Mature Goats
          </h3>

          <p className="text-[#1b4332] text-xl font-bold mb-4">
            KSh 12,000 - 18,000
          </p>

          <p className="text-slate-600">
            Healthy mature livestock suitable for farming,
            breeding, or meat production.
          </p>

        </div>

      </div>

      {/* Goat Kids */}

      <div className="bg-white rounded-3xl overflow-hidden shadow-md">

        <div className="h-[220px] bg-gray-300 flex items-center justify-center">
          Future Goat Image
        </div>

        <div className="p-6">

          <h3 className="text-2xl font-bold mb-2">
            🐐 Goat Kids
          </h3>

          <p className="text-[#1b4332] text-xl font-bold mb-4">
            KSh 8,000 - 12,000
          </p>

          <p className="text-slate-600">
            Young healthy stock raised under professional
            care and feeding programs.
          </p>

        </div>

      </div>

    </div>

  </section>

  {/* WHY CHOOSE US */}

  <section className="bg-white py-20">

    <div className="max-w-6xl mx-auto px-4">

      <h2 className="text-3xl font-bold text-center mb-12">
        Why Buy From Gotiqa?
      </h2>

      <div className="grid md:grid-cols-5 gap-6 text-center">

        <div>🐐<p className="mt-3 font-semibold">Healthy Stock</p></div>

        <div>🩺<p className="mt-3 font-semibold">Veterinary Managed</p></div>

        <div>🌱<p className="mt-3 font-semibold">Sustainable Farming</p></div>

        <div>📊<p className="mt-3 font-semibold">Transparent Records</p></div>

        <div>🚀<p className="mt-3 font-semibold">Smart Farm Technology</p></div>

      </div>

    </div>

  </section>

  {/* CTA */}

  <section className="max-w-5xl mx-auto px-4 py-20">

    <div className="bg-[#1b4332] rounded-3xl p-10 text-center text-white">

      <h2 className="text-4xl font-bold mb-6">
        Ready to Order?
      </h2>

      <p className="mb-8 text-gray-200">
        Contact us today for livestock purchases,
        meat orders, or partnership opportunities.
      </p>

      <div className="space-y-2">

        <p>📞 0111771886</p>

        <p>💬 WhatsApp: 0111771886</p>

        <p>📧 kirorei04@gmail.com</p>

      </div>

    </div>

  </section>

</div>


);
}
