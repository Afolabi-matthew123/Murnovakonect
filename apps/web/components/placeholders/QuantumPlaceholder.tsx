'use client';
import { useEffect, useState } from 'react';
import { QuantumPlaceholderEngine, QuantumPlaceholder } from '@/lib/quantum-placeholders';

export function QuantumPlaceholder({ path }: { path: string }) {
  const [data, setData] = useState<QuantumPlaceholder | null>(null);

  useEffect(() => {
    const engine = new QuantumPlaceholderEngine();
    engine.generatePlaceholder(path).then(setData);
  }, [path]);

  if (!data) {
    return <div className='p-8'>Initializing quantum space…</div>;
  }

  return (
    <div className='p-10 rounded-xl border border-dashed border-gray-400'>
      <h1 className='text-2xl font-bold mb-2'>{data.title}</h1>
      <p className='text-gray-600 mb-4'>{data.description}</p>

      <div className='text-sm text-gray-500'>
        Confidence: {Math.round(data.confidence * 100)}%
      </div>

      <div className='mt-6 italic text-indigo-500'>
        🚧 Coming Soon — but already learning from you
      </div>
    </div>
  );
}
