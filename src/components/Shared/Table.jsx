import React from 'react';

export default function DataTable({
  columns,
  data,
  renderCell,
  headerClassName = 'bg-[#f4f7f5] text-sm font-semibold text-[#2d6a4f]',
  rowClassName = 'hover:bg-slate-50',
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={headerClassName}>
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={`p-3 ${i === 0 ? 'rounded-l-lg' : ''} ${i === columns.length - 1 ? 'rounded-r-lg' : ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className={rowClassName}>
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {renderCell ? renderCell(col.key, row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
