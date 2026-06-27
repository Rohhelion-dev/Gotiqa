import React from "react";

const testimonials = [
  {
    name: "Local Livestock Buyer",
    role: "Nairobi",
    quote:
      "The goats were healthy, well-managed, and exactly as described. The transparency throughout the process was impressive.",
  },
  {
    name: "Agricultural Entrepreneur",
    role: "Kiambu County",
    quote:
      "Gotiqa's approach to combining technology with livestock farming shows great potential for the future of agriculture.",
  },
  {
    name: "Farm Visitor",
    role: "Nakuru",
    quote:
      "The level of organization and animal care at Gotiqa reflects professionalism and a genuine commitment to quality farming.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f8faf8] py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-[#40916c] font-semibold mb-3">
            Trust & Confidence
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Building Relationships That Last
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto">
            At Gotiqa SmartFarm, our commitment is simple:
            healthy livestock, transparency, and sustainable farming practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl text-[#40916c] mb-2">
                "
              </div>

              <div className="flex gap-1 text-yellow-500 mb-4 text-lg">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {item.quote}
              </p>

              <div className="border-t pt-4">
                <h3 className="font-bold text-slate-800">
                  {item.name}
                </h3>

                <p className="text-sm text-[#40916c]">
                  {item.role}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}