import React from 'react';
import { DataTable, StatusBadge, PageSection } from '../../components/Shared';

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

const herdColumns = [
  { key: 'id', header: 'Goat ID' },
  { key: 'age', header: 'Age' },
  { key: 'breed', header: 'Breed' },
  { key: 'weight', header: 'Weight' },
  { key: 'status', header: 'Status' },
];

const vetColumns = [
  { key: 'id', header: 'Goat ID' },
  { key: 'treatment', header: 'Vaccination / Care' },
  { key: 'date', header: 'Date Completed' },
  { key: 'notes', header: 'Clinical Notes' },
];

const renderHerdCell = (key, value) => {
  if (key === 'id') return <span className="font-mono font-bold text-emerald-800">{value}</span>;
  if (key === 'status') return <StatusBadge status={value} />;
  return value;
};

const renderVetCell = (key, value) => {
  if (key === 'id') return <span className="font-mono text-gray-600">{value}</span>;
  if (key === 'treatment') return <span className="font-medium">{value}</span>;
  if (key === 'date') return <span className="text-gray-500">{value}</span>;
  if (key === 'notes') {
    const isFollowUp = value.includes('Follow-up');
    return (
      <span className={`text-xs px-2 py-0.5 rounded ${isFollowUp ? 'bg-amber-100 text-amber-800' : 'text-gray-600'}`}>
        {value}
      </span>
    );
  }
  return value;
};

export default function HerdRecords() {
  return (
    <div className="space-y-8">
      <PageSection title="&#x1F410; Herd Directory" className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
        <DataTable columns={herdColumns} data={herdData} renderCell={renderHerdCell} />
      </PageSection>

      <PageSection title="&#x1FA7A; Veterinary History" className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
        <DataTable columns={vetColumns} data={vetRecords} renderCell={renderVetCell} />
      </PageSection>

      <PageSection title="&#x1F4C5; Farm Activity Log" className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-mono">{log.date}</span>
                <span className="font-semibold text-emerald-800 px-2 py-0.5 bg-emerald-50 rounded">{log.type}</span>
                <span className="text-gray-700">{log.details}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 sm:mt-0">Logged by: &#x1F9D1;&#x200D;&#x1F33E; {log.staff}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
