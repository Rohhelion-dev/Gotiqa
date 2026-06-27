import React from "react";

export default function FounderMessage() {
return ( <section className="bg-white py-20">


  <div className="max-w-6xl mx-auto px-4">

    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Founder Image */}

      <div className="h-[420px] rounded-3xl bg-gray-300 flex items-center justify-center">

        <span className="text-gray-600 font-medium">
          Founder Photo
        </span>

        {/*
        Future image:

        public/images/branding/founder.jpg

        <img
          src="/images/branding/founder.jpg"
          alt="Founder"
          className="w-full h-full object-cover rounded-3xl"
        />
        */}
      </div>

      {/* Founder Message */}

      <div>

        <p className="uppercase tracking-widest text-[#40916c] font-semibold mb-3">
          Founder Message
        </p>

        <h2 className="text-4xl font-bold text-slate-800 mb-6">
          Building Agriculture For The Next Generation
        </h2>

        <p className="text-slate-600 leading-relaxed mb-5">
          Gotiqa started from a simple belief that farming should
          not be limited by location. Many people living in towns
          and cities still dream of owning livestock and being part
          of agriculture.
        </p>

        <p className="text-slate-600 leading-relaxed mb-5">
          Through technology, transparency, and professional farm
          management, we are creating a platform that connects
          people to livestock farming while ensuring high standards
          of animal welfare and productivity.
        </p>

        <p className="text-slate-600 leading-relaxed">
          Our goal is not only to raise quality goats, but also to
          build a trusted agricultural brand that empowers farmers,
          investors, and consumers alike.
        </p>

        <div className="mt-8">

          <h3 className="font-bold text-lg text-slate-800">
            Brian Kirorei
          </h3>

          <p className="text-[#40916c]">
            Founder, Gotiqa SmartFarm
          </p>

        </div>

      </div>

    </div>

  </div>

</section>


);
}
