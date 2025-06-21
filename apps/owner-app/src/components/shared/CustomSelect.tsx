import React from 'react';

interface CustomSelectProps<T = any> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: T[];
  dataItemKey: keyof T;
  textField: keyof T;
  placeholder?: string;
}

export function CustomSelect<T>({
  label,
  name,
  value,
  onChange,
  options,
  dataItemKey,
  textField,
  required = false,
  placeholder,
  className = '',
  ...rest
}: CustomSelectProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((item) => (
          <option key={String(item[dataItemKey])} value={String(item[dataItemKey])}>
            {String(item[textField])}
          </option>
        ))}
      </select>
    </div>
  );
}
