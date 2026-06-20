import React from 'react';

export function InfoCard({
  title,
  children,
  icon,
  className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100',
  titleClassName = 'font-bold mb-4 text-slate-700',
}) {
  return (
    <div className={className}>
      {icon && (
        <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl">
          {icon}
        </div>
      )}
      {title && <h3 className={titleClassName}>{title}</h3>}
      {children}
    </div>
  );
}

export function StatCard({ label, value, subtitle, borderColor = 'border-emerald-600' }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColor}`}>
      <p className="text-sm font-semibold text-gray-500 uppercase">{label}</p>
      <p className="text-4xl font-bold text-slate-800 my-1">{value}</p>
      {subtitle && (
        typeof subtitle === 'string'
          ? <p className="text-xs text-gray-400">{subtitle}</p>
          : subtitle
      )}
    </div>
  );
}
