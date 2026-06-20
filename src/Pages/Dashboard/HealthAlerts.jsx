import React from 'react';
import { DataTable, StatusBadge, PageSection } from '../../components/Shared';

const alerts = [
  { animal: 'Goat #402', task: 'Vaccination', status: 'overdue', date: '2026-06-15' },
  { animal: 'Goat #115', task: 'Vet Checkup', status: 'due', date: '2026-06-20' },
  { animal: 'Goat #209', task: 'Nutrition Review', status: 'healthy', date: '2026-06-25' },
];

const columns = [
  { key: 'animal', header: 'Animal' },
  { key: 'task', header: 'Task' },
  { key: 'status', header: 'Status' },
  { key: 'date', header: 'Date' },
];

const renderCell = (key, value) => {
  if (key === 'animal') return <span className="font-semibold">{value}</span>;
  if (key === 'status') return <StatusBadge status={value} uppercase className="border" />;
  if (key === 'date') return <span className="text-slate-600">{value}</span>;
  return value;
};

export default function HealthAlerts() {
  return (
    <PageSection
      title="Herd Health Alerts"
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      titleClassName="text-2xl font-bold mb-6 text-slate-800"
    >
      <DataTable
        columns={columns}
        data={alerts}
        renderCell={renderCell}
        headerClassName="text-slate-400 text-sm border-b"
      />
    </PageSection>
  );
}
