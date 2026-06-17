import React from 'react';

const stats = [
  { label: 'Years of Experience', value: '4+' },
  { label: 'Healthy Herd', value: '50+' },
  { label: 'Vet Visits/Year', value: '12' },
  { label: 'Breeds Available', value: '5' },
];

export default function FarmStats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Our Farm at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-[var(--accent-primary)] mb-2">{stat.value}</p>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Additional Detail Section */}
        <div className="mt-12 bg-[#f4f7f5] p-8 rounded-2xl max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Sustainable Feed Management</h3>
          <p className="text-slate-700">
            We prioritize quality nutrition, ensuring our herd is supported by premium hay and 
            tailored dietary plans. Our commitment to excellence is reflected in our 
            transparent veterinary logging and continuous herd health monitoring.
          </p>
        </div>
      </div>
    </section>
  );
}