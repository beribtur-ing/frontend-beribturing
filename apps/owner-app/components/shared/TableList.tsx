'use client';

import React from 'react';

export interface ColumnConfig<T> {
  field?: keyof T;
  title?: string;
  className?: string;
  cell?: (item: T, index: number) => React.ReactNode;
}

interface TableListProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onRowClick?: (row: T) => void;
  onEdit?: (value: T) => void;
  onDelete?: (value: T) => void;
  pagination?: React.ReactElement;
  isLoading?: boolean;
}

export function TableList<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  onEdit,
  onDelete,
  pagination,
  isLoading = false,
}: TableListProps<T>) {
  return (
    <div className="relative overflow-x-auto border rounded-lg shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
          <tr>
            <th scope="col" className="px-4 py-3 w-[50px]">
              No.
            </th>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className={`px-4 py-3 ${col.className ?? ''}`}>
                {col.title}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th scope="col" className="px-4 py-3 w-[100px]">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(item)}
            >
              <td className="px-4 py-3">{index + 1}</td>

              {columns.map((col, idx) => (
                <td key={idx} className="px-4 py-3">
                  {col.cell ? col.cell(item, idx) : col.field ? String(item[col.field]) : ''}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {onEdit && (
                      <button
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                        onClick={() => onEdit(item)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                        onClick={() => onDelete(item)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && <div className="p-4">{pagination}</div>}
    </div>
  );
}
