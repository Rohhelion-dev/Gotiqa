import React from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder = '',
  onChange,
  options,
  className = '',
  inputClassName = 'w-full p-2 border rounded mt-1',
}) {
  const commonProps = { name, required, onChange, placeholder, className: inputClassName };

  if (options) {
    return (
      <div className={className}>
        <label className="block text-sm font-medium">{label}</label>
        <select {...commonProps}>
          <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label className="block text-sm font-medium">{label}</label>
        <textarea {...commonProps} />
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium">{label}</label>
      <input type={type} {...commonProps} />
    </div>
  );
}
