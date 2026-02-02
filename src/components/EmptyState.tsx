import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

// Empty state component / Компонент за празно състояние
export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-[20px] font-medium text-[#4A5057] mb-2">{title}</h3>
        <p className="text-[20px] font-normal text-[#75788B]">{message}</p>
      </div>
    </div>
  );
};
