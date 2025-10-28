
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ExclamationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);


export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-lg animate-fade-in" role="alert">
        <ExclamationIcon />
        <div>
            <p className="font-bold">Error</p>
            <p>{message}</p>
        </div>
    </div>
  );
};
