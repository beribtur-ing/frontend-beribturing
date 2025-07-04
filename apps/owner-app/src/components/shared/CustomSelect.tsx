import React, { SelectHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';
import { ProductCategoryRdo } from '@beribturing/api-stub';

interface CustomSelectProps<T = any> extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: T[];
  dataItemKey: keyof T;
  textField: keyof T;
  placeholder?: string;
  error?: FieldError;
}

export function CustomSelect<T>({
  label,
  name,
  value,
  onChange,
  options,
  dataItemKey,
  textField,
  placeholder,
  className = '',
  error,
  required,
  ...rest
}: CustomSelectProps<T>) {
  return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                {...rest}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={false}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${className}`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options?.map((item: T) => (
                    <option key={dataItemKey as string} value={dataItemKey as string}>
                        {item[textField as string]}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
  );
}
