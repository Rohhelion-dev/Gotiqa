import React from 'react';

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  className = '',
  titleClassName = 'text-3xl font-bold text-slate-800',
  subtitleClassName = 'text-sm text-gray-500',
}) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className={titleClassName}>{title}</h2>
      {subtitle && <p className={`${subtitleClassName} ${centered ? 'max-w-xl mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  );
}
