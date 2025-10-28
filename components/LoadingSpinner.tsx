
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 animate-fade-in" aria-label="Loading content">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-linkedin-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">AI is crafting your post...</p>
    </div>
  );
};
