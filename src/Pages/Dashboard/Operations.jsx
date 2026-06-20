import React from 'react';
import { InfoCard } from '../../components/Shared';

const sections = [
  {
    title: 'Personnel & Staff',
    text: 'Managing 12 active farm employees and 2 veterinary consultants ensuring day-to-day productivity.',
  },
  {
    title: 'Investor Relations',
    text: 'Current portfolio performance tracking for 4 primary project investors with real-time financial reporting.',
  },
  {
    title: 'Goat Assets',
    text: 'Monitoring 350+ heads of stock across dairy and meat production lines with integrated growth tracking.',
  },
];

export default function Operations() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Farm Operations Overview</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <InfoCard key={section.title} title={section.title}>
            <p className="text-sm text-slate-600">{section.text}</p>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}
