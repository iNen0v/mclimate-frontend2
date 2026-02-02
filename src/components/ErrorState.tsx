import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

// Error state component / Компонент за състояние на грешка
export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-[20px] font-medium text-[#4A5057] mb-2">Error loading data</h3>
        <p className="text-[20px] font-normal text-[#75788B] mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-[#4AADEA] via-[#4AACEA] to-[#2871E9] text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};
