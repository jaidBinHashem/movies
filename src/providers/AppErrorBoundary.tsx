import React, { ReactNode, ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // logs here
    console.error('App Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Optional: Reset app
        console.log('Error boundary reset');
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
