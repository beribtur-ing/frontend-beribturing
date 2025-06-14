import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, InputHTMLAttributes } from 'react';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch?: (value: string) => void;
}

export const SearchBar = ({ onSearch, className, ...inputProps }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
  };

  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onSearch) onSearch(value);
    }
    // Call original onKeyDown if provided
    if (inputProps.onKeyDown) {
      inputProps.onKeyDown(e);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative border border-gray-300 rounded-md overflow-hidden">
        <input
          {...inputProps}
          type="text"
          className={`
            w-48 h-10 px-3 pr-8 
            text-sm placeholder-gray-500
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
            ${className || ''}
          `}
          onChange={handleChange}
          value={value}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button
            type="button"
            className="absolute top-0 right-0 h-full px-2 flex items-center justify-center hover:bg-gray-100 rounded-r-md"
            onClick={handleClear}
          >
            <ClearIcon className="w-1 h-1 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <button
        type="button"
        className="w-10 h-10 flex bg-white items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={handleSearch}
      >
        <SearchIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
