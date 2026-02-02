import React from 'react';

// Loading spinner component / Компонент за зареждащ спинер
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-[#EBF5FF] border-t-[#6BADDC] rounded-full animate-spin`}
      />
    </div>
  );
};
