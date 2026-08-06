import React from 'react';

/**
 * Reusable PageContainer component.
 * Wraps all dashboard page content, ensuring consistent max-width and responsive padding.
 */
export default React.memo(function PageContainer({ children, className = '' }) {
  return (
    <main className={`flex-1 overflow-y-auto p-4 md:p-8 w-full ${className}`}>
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {children}
      </div>
    </main>
  );
});
