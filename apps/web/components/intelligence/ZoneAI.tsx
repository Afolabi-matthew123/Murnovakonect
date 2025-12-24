import React from 'react';

export function ZoneAI({ role, zone }: { role: string; zone: string }) {
  const aiProfile = ${role}:;

  return (
    <div className='zone-ai-copilot'>
      <span>AI Copilot ({aiProfile})</span>
    </div>
  );
}
