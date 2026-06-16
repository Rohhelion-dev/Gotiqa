import React from 'react';

export default function Products() {
  // Inventory items derived explicitly from Screenshot 2026-06-16 154539.png
  const catalog = [
    {
      id: 'prod-1',
      name: 'Breeding Goats',
      price: 'KSh 22,000 - 29,000',
      unit: 'per animal',
      badge: 'Premium Stock',
      status: 'Available',
      description: 'Healthy local and crossbred varieties chosen for climate flexibility and robust dairy/meat potential.',
      emoji: '🐐'
    },
    {
      id: 'prod-2',
      name: 'Goat Kids',
      price: 'KSh 11,000 - 17,000',
      unit: 'per animal',
      badge: 'Young Livestock',
      status: 'Available',
      description: 'Young goat kits under careful veterinary surveillance. Highly active, vaccinated, and feed-ready.',
      emoji: '🐑'
    },
    {
      id: 'prod-3',
      name: 'Goat Meat',
      price: 'KSh 700',
      unit: 'per kg (Bulk)',
      badge: 'Organic Wholesale',
      status: 'Available',
      description: 'Ethically handled premium organic meat supply matching strict safety and health compliance indices.',
      emoji: '🥩'
    }
  ];

  const handleQuoteRequest = (productName) => {
    alert(`Thank you for your interest in our ${productName}! A Gotiqa Farm sales coordinator will be contacted for custom regional logistics.`);
  };

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      {/* Header text */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-[#1e3f20]">Available Goats & Livestock</h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Direct purchase stock from Gotiqa Farm. All animals feature transparent electronic profiles.
        </p>
      </div>

      {/* Grid Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {catalog.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
            {/* Top decorative theme color bar */}
            <div className="h-2 bg-[#2d6a4f] w-full" />
            
            <div className="p-6 space-y-4 flex-grow">
              <div className="flex justify-between items-start">
                <span className="text-4xl">{item.emoji}</span>
                <span className="bg-[#d8f3dc] text-[#1e3f20] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#2d6a4f] transition-colors">{item.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-[#1e3f20]">{item.price}</span>
                  <span className="text-xs text-gray-400 font-medium">/ {item.unit}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>

            {/* Sticky Action Footer Card */}
            <div className="p-6 pt-0 bg-slate-50 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs font-semibold pb-3">
                <span className="text-gray-400">Market Status</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item.status}
                </span>
              </div>
              <button 
                onClick={() => handleQuoteRequest(item.name)}
                className="w-full bg-[#ca6702] hover:bg-[#b55d02] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                📞 Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}