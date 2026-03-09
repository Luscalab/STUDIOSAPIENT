
'use client';

import React from 'react';

/**
 * Template component that wraps every page to provide transition animations.
 * Unlike layout.tsx, template.tsx re-mounts on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter">
      {children}
    </div>
  );
}
