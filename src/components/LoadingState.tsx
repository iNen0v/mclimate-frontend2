import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Loading state component / Компонент за състояние на зареждане
export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[20px] font-normal text-[#75788B]">Loading buildings and devices...</p>
      </div>
    </div>
  );
};
