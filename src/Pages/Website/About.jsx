import React from "react";

export default function About() {
return ( <div className="bg-[#f4f7f5]">


  {/* HERO */}
  <section className="max-w-6xl mx-auto px-4 py-20 text-center">

    <p className="uppercase tracking-[0.3em] text-[#2d6a4f] font-semibold mb-4">
      About Gotiqa
    </p>

    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
      Building a Smarter Future for Livestock Farming
    </h1>

    <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
      Gotiqa was founded with a simple vision:
      to combine modern technology with responsible livestock farming
      in order to create healthier animals, more efficient operations,
      and sustainable agricultural growth.
    </p>

  </section>

  {/* STORY SECTION */}
  <section className="max-w-6xl mx-auto px-4 py-16">

    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="h-[400px] rounded-3xl bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 font-medium">
          Future Farm Image
        </span>
      </div>

      <div>

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Our Journey
        </h2>

        <p className="text-slate-600 leading-relaxed mb-5">
          What began as an idea to improve livestock management has grown
          into a platform dedicated to supporting modern farming practices.
          Gotiqa focuses on accurate record keeping, animal health,
          breeding management, feeding programs, and sustainable farm growth.
        </p>

        <p className="text-slate-600 leading-relaxed">
          We believe technology should help farmers make better decisions,
          improve productivity, and create long-term value without losing
          sight of animal welfare and environmental responsibility.
        </p>

      </div>

    </div>

  </section>

  {/* VALUES */}
  <section className="bg-white py-20">

    <div className="max-w-6xl mx-auto px-4">

      <div className="text-center mb-14">

        <h2 className="text-3xl font-bold text-slate-800">
          What Drives Us
        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-[#f8faf8] p-8 rounded-2xl">
          <div className="text-4xl mb-4">🐐</div>

          <h3 className="font-bold text-xl mb-3">
            Animal Welfare
          </h3>

          <p className="text-slate-600">
            Healthy animals are the foundation of every successful farm.
          </p>
        </div>

        <div className="bg-[#f8faf8] p-8 rounded-2xl">
          <div className="text-4xl mb-4">🌱</div>

          <h3 className="font-bold text-xl mb-3">
            Sustainability
          </h3>

          <p className="text-slate-600">
            Farming practices that support productivity while protecting future generations.
          </p>
        </div>

        <div className="bg-[#f8faf8] p-8 rounded-2xl">
          <div className="text-4xl mb-4">📈</div>

          <h3 className="font-bold text-xl mb-3">
            Innovation
          </h3>

          <p className="text-slate-600">
            Using technology to improve decision-making and farm performance.
          </p>
        </div>

      </div>

    </div>

  </section>

  {/* FOUNDER MESSAGE */}
  <section className="max-w-5xl mx-auto px-4 py-20">

    <div className="bg-[#1b4332] rounded-3xl p-10 text-white text-center">

      <h2 className="text-3xl font-bold mb-6">
        A Message From The Founder
      </h2>

      <p className="max-w-3xl mx-auto leading-relaxed text-gray-200">
        Gotiqa was created with the belief that modern farming can be both
        profitable and sustainable. Our mission is to help livestock
        farmers embrace better management practices while building stronger,
        healthier, and more productive farms.
      </p>

      <p className="mt-6 font-semibold">
        Brian, Founder of Gotiqa
      </p>

    </div>

  </section>

</div>


);
}
