'use client';

interface QuantumNavOrbProps {
  items: any[];
  onNavigate: (path: string) => void;
}

export default function QuantumNavOrb({ items, onNavigate }: QuantumNavOrbProps) {
  return (
    <div className='quantum-nav-orb'>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.path)}
          className='orb-item'
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
