'use client';

import { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingScreen from './LoadingScreen';

export default function Safe3DWrapper({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <LoadingScreen />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}