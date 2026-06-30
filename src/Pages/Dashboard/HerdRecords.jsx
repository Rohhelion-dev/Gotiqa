import React from 'react';

export default function HerdRecords() {
  const herdData = [
    { id: 'G0001', age: '2 yrs', breed: 'Galla', weight: '45 kg', status: 'Healthy' },
    { id: 'G0002', age: '1 yr', breed: 'Local', weight: '30 kg', status: 'Vaccinated' },
    { id: 'G0003', age: '6 months', breed: 'Alpine', weight: '22 kg', status: 'Healthy' },
  ];

  const vetRecords = [
    { id: 'G0001', treatment: 'FMD Vaccine', date: 'May 2026', notes: 'Healthy' },
    { id: 'G0002', treatment: 'Deworming', date: 'April 2026', notes: 'Follow-up needed' },
  ];

  const logs = [
    { date: '25/05/2026', type: 'Feeding', staff: 'John', details: 'Normal routine' },
    { date: '25/05/2026', type: 'Visitor', staff: 'Roy', details: 'Attachment student' },
  ];

  return (
    <div className="space-y-8">
      {/* Herd Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-[#1e3f20] mb-4">🐐 Herd Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f7f5] text-sm font-semibold text-[#2d6a4f]">
                <th className="p-3 rounded-l-lg">Goat ID</th>
                <th className="p-3">Age</th>
                <th className="p-3">Breed</th>
                <th className="p-3">Weight</th>
                <th className="p-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {herdData.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">{g.id}</td>
                  <td className="p-3">{g.age}</td>
                  <td className="p-3">{g.breed}</td>
                  <td className="p-3">{g.weight}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      g.status === 'Healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vet Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-[#1e3f20] mb-4">🩺 Veterinary History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f7f5] text-sm font-semibold text-[#2d6a4f]">
                <th className="p-3 rounded-l-lg">Goat ID</th>
                <th className="p-3">Vaccination / Care</th>
                <th className="p-3">Date Completed</th>
                <th className="p-3 rounded-r-lg">Clinical Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {vetRecords.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-gray-600">{v.id}</td>
                  <td className="p-3 font-medium">{v.treatment}</td>
                  <td className="p-3 text-gray-500">{v.date}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${v.notes.includes('Follow-up') ? 'bg-amber-100 text-amber-800' : 'text-gray-600'}`}>{v.notes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Logs */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#1e3f20] mb-4">📅 Farm Activity Log</h3>
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-mono">{log.date}</span>
                <span className="font-semibold text-emerald-800 px-2 py-0.5 bg-emerald-50 rounded">{log.type}</span>
                <span className="text-gray-700">{log.details}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 sm:mt-0">Logged by: 🧑‍🌾 {log.staff}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}