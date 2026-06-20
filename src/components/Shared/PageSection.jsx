import React from 'react';

export default function PageSection({
  children,
  title,
  className = 'bg-white rounded-xl p-6 shadow-sm',
  titleClassName = 'text-xl font-bold text-[#1e3f20] mb-4',
}) {
  return (
    <div className={className}>
      {title && <h3 className={titleClassName}>{title}</h3>}
      {children}
    </div>
  );
}
