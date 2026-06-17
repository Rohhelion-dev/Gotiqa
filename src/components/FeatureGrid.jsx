import React from 'react';

const features = [
  {
    icon: '🐐',
    title: 'Herd Management',
    description: 'Track structural metrics across individual goat metrics, weights, breeds, and chronological growth markers seamlessly.'
  },
  {
    icon: '🩺',
    title: 'Veterinary Logging',
    description: 'Maintain clinical record paths, medical treatment histories, vaccination completions, and immediate care schedules.'
  },
  {
    icon: '🌤️',
    title: 'Atmospheric Tracking',
    description: 'Sync with direct field weather patterns, barometric pressure indexes, and humidity maps to protect your pasture operations.'
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-12 px-4">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}