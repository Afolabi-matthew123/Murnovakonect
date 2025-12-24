import { LivingShellController } from './LivingShellController';
import { useSessionLayout } from '@/hooks/useSessionLayout';

export function QuantumLayoutEngine({ children, userRole, context }: any) {
  const { persistLayout } = useSessionLayout(userRole);

  // Example persistence hook (can be expanded later)
  persistLayout({
    role: userRole,
    preferredZones: {},
    lastContext: context,
    navWeights: {},
    cognitiveBaseline: 'neutral'
  });

  return (
    <LivingShellController role={userRole}>
      {children}
    </LivingShellController>
  );
}
