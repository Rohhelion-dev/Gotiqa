import React from 'react';

const defaultVariants = {
  overdue: 'bg-red-100 text-red-700 border-red-200',
  due: 'bg-orange-100 text-orange-700 border-orange-200',
  healthy: 'bg-green-100 text-green-700 border-green-200',
  Healthy: 'bg-emerald-100 text-emerald-800',
  Vaccinated: 'bg-blue-100 text-blue-800',
  Available: 'bg-emerald-200 text-emerald-900',
};

export default function StatusBadge({
  status,
  variants = defaultVariants,
  uppercase = false,
  className = '',
}) {
  const style = variants[status] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style} ${className}`}>
      {uppercase ? status.toUpperCase() : status}
    </span>
  );
}
