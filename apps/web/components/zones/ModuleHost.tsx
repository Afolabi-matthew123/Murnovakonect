import React from 'react';
import { MODULE_REGISTRY } from '@/config/module-registry';

export function ModuleHost({ role, zone }: { role: string; zone: string }) {
  const Module = MODULE_REGISTRY[role]?.[zone];

  if (!Module) return null;

  return (
    <div className='zone-module-host'>
      <Module />
    </div>
  );
}
