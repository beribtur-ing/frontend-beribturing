import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  to?: LinkProps['to']; // only used if as="link"
  variant?: 'primary' | 'secondary' | 'danger';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  to,
  type = 'button',
  isLoading = false,
  disabled = false,
  children,
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const baseClass =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }[variant];

  const combinedClass = `${baseClass} ${variantClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled || isLoading} className={combinedClass} {...rest}>
      {isLoading && <CircularProgress size={16} color="inherit" />}
      {children}
    </button>
  );
};
