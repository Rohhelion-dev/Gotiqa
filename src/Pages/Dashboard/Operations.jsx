import React from 'react';

export default function Operations() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Farm Operations Overview</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Employees Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 text-slate-700">Personnel & Staff</h3>
          <p className="text-sm text-slate-600">
            Managing 12 active farm employees and 2 veterinary consultants ensuring day-to-day productivity.
          </p>
        </div>

        {/* Investors Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 text-slate-700">Investor Relations</h3>
          <p className="text-sm text-slate-600">
            Current portfolio performance tracking for 4 primary project investors with real-time financial reporting.
          </p>
        </div>

        {/* Assets Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4 text-slate-700">Goat Assets</h3>
          <p className="text-sm text-slate-600">
            Monitoring 350+ heads of stock across dairy and meat production lines with integrated growth tracking.
          </p>
        </div>
      </div>
    </div>
  );
}