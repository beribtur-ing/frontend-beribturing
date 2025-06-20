import { ReactNode } from 'react';

const Title = ({ title = '', icon }: { title: string; icon?: ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
      {icon && icon}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

export { Title };
