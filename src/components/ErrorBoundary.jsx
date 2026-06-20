import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-slate-600 mb-2 max-w-md">
            An unexpected error occurred. Please try again or contact support if the issue persists.
          </p>
          <p className="text-sm text-red-500 mb-6 font-mono max-w-lg break-words">
            {this.state.error?.message}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2 bg-[#1b4332] text-white rounded-lg font-bold hover:bg-[#153426] transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
