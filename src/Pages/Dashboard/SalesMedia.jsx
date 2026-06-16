import React from 'react';

export default function SalesMedia() {
  const stock = [
    { product: 'Breeding Goats', qty: '5', price: 'KSh 22,000 - 29,000', status: 'Available' },
    { product: 'Goat Kids', qty: '12', price: 'KSh 11,000 - 17,000', status: 'Available' },
    { product: 'Goat Meat', qty: 'Bulk Orders', price: 'KSh 700/kg', status: 'Available' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sales Listings */}
      <div className="bg-white p-6 rounded-xl shadow-sm md:col-span-2">
        <h3 className="text-xl font-bold text-[#1e3f20] mb-2">💵 Live Sales & Marketplace</h3>
        <p className="text-gray-500 text-sm mb-4">Current farm inventory ready for dispatch.</p>
        
        <div className="space-y-4 mb-6">
          {stock.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-[#f4f7f5] rounded-xl border border-emerald-100">
              <div>
                <h4 className="font-bold text-slate-800">{item.product}</h4>
                <p className="text-xs text-emerald-700 font-medium">Stock/Volume: {item.qty}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-[#1e3f20] block">{item.price}</span>
                <span className="inline-block bg-emerald-200 text-emerald-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full bg-[#ca6702] hover:bg-[#b55d02] text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex justify-center items-center gap-2">
          📞 Request Commercial Quote
        </button>
      </div>

      {/* Social Media Content Hub */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#1e3f20] mb-1">📱 Media & Social</h3>
          <p className="text-sm text-gray-500">Public outreach marketing pipeline.</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-pink-100 text-center">
          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1">Official TikTok Handle</p>
          <a href="https://tiktok.com/@gotiqafarm" target="_blank" rel="noreferrer" className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 inline-block transition-transform">
            @gotiqafarm
          </a>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">🎬 Content Planning Queue</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-2xs border-l-2 border-[#2d6a4f]">🌿 Goat feeding schedule runtime</li>
            <li className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-2xs border-l-2 border-[#2d6a4f]">🐐 Kids open field play session</li>
            <li className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-2xs border-l-2 border-[#2d6a4f]">🏗️ Sustainable farm expansion updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}