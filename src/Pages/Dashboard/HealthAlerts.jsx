const alerts = [
  { animal: 'Goat #402', task: 'Vaccination', status: 'overdue', date: '2026-06-15' },
  { animal: 'Goat #115', task: 'Vet Checkup', status: 'due', date: '2026-06-20' },
  { animal: 'Goat #209', task: 'Nutrition Review', status: 'healthy', date: '2026-06-25' },
];

const statusStyles = {
  overdue: 'bg-red-100 text-red-700 border-red-200',
  due: 'bg-orange-100 text-orange-700 border-orange-200',
  healthy: 'bg-green-100 text-green-700 border-green-200',
};

const DEFAULT_STATUS_STYLE = 'bg-gray-100 text-gray-700 border-gray-200';

export default function HealthAlerts() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Herd Health Alerts</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm border-b">
              <th className="pb-4">Animal</th>
              <th className="pb-4">Task</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-4 font-semibold">{alert.animal}</td>
                <td className="py-4">{alert.task}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[alert.status] || DEFAULT_STATUS_STYLE}`}>
                    {alert.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-slate-600">{alert.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}