import React from 'react';

export function MicroAppShell({ children, meta }: any) {
  return (
    <div
      className='micro-app-shell'
      data-module-id={meta.id}
      data-ai={meta.aiCapable}
    >
      {children}
    </div>
  );
}
