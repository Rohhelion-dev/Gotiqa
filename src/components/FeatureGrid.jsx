import React from 'react';
import { InfoCard } from './Shared';

const features = [
  {
    icon: '\u{1F410}',
    title: 'Herd Management',
    description: 'Track structural metrics across individual goat metrics, weights, breeds, and chronological growth markers seamlessly.'
  },
  {
    icon: '\u{1FA7A}',
    title: 'Veterinary Logging',
    description: 'Maintain clinical record paths, medical treatment histories, vaccination completions, and immediate care schedules.'
  },
  {
    icon: '\u{1F324}\uFE0F',
    title: 'Atmospheric Tracking',
    description: 'Sync with direct field weather patterns, barometric pressure indexes, and humidity maps to protect your pasture operations.'
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-12 px-4">
      {features.map((feature, index) => (
        <InfoCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          titleClassName="text-xl font-bold text-slate-800 mb-3"
        >
          <p className="text-slate-600 leading-relaxed text-sm">
            {feature.description}
          </p>
        </InfoCard>
      ))}
    </div>
  );
}
