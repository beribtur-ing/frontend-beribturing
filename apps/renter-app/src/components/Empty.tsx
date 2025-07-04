import React from 'react';

interface EmptyProps {
  message?: string;
  children?: React.ReactNode;
}

export function Empty({ message = 'No data found.', children }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {children}
      <p className="text-gray-500 dark:text-gray-400 text-base">{message}</p>
    </div>
  );
}
