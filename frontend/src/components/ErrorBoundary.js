'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🕉️</div>
            <h2 className="text-2xl font-bold mb-2">3D Scene Loading...</h2>
            <p className="text-white/70">Initializing spiritual experience</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;