import React from "react";

const features = [
  {
    icon: "🐐",
    title: "Healthy Livestock Management",
    description:
      "Every animal is monitored through structured records covering growth, nutrition, breeding, and overall herd wellbeing.",
  },
  {
    icon: "🩺",
    title: "Professional Animal Care",
    description:
      "Comprehensive health tracking, veterinary records, vaccination schedules, and treatment histories ensure optimal livestock health.",
  },
  {
    icon: "🌱",
    title: "Sustainable Farming Practices",
    description:
      "Combining modern farm management techniques with responsible animal husbandry to support long-term agricultural success.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-10">

      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >

          {/* ICON */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-6 group-hover:bg-emerald-100 transition">
            {feature.icon}
          </div>

          {/* TITLE */}
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            {feature.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-slate-600 leading-relaxed text-sm">
            {feature.description}
          </p>

          {/* subtle glow line */}
          <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-0 group-hover:opacity-100 transition" />

        </div>
      ))}

    </div>
  );
}