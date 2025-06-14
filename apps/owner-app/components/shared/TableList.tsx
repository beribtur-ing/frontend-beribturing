'use client';

import React from 'react';
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';

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
  isLoading?: boolean;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
}

export function TableList<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  onEdit,
  onDelete,
  isLoading = false,
  emptyText = 'No data available',
  emptyIcon,
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

        <tbody className="bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1 + (onEdit || onDelete ? 1 : 0)} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  {emptyIcon && <div className="mb-3">{emptyIcon}</div>}
                  <span className="text-sm">{emptyText}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
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
                          className="p-1.5 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors"
                          onClick={() => onEdit(item)}
                          title="Edit"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="p-1.5 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200 transition-colors"
                          onClick={() => onDelete(item)}
                          title="Delete"
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
