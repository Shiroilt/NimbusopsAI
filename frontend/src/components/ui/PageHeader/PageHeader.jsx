import React from 'react';

/**
 * Reusable PageHeader component.
 */
export default function PageHeader({ title, description, breadcrumbs, action, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 ${className}`}>
      <div>
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <a href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </a>
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {description && <p className="text-white/50 mt-1">{description}</p>}
      </div>
      
      {action && (
        <div className="shrink-0 mt-2 sm:mt-0">
          {action}
        </div>
      )}
    </div>
  );
}
