import { QuantumLayoutEngine } from '@/components/layout/QuantumLayoutEngine';
import { resolveUserRole } from '@/lib/resolveUserRole';
import { bootstrapContext } from '@/lib/bootstrapContext';

export default async function PortalLayout({ children }: any) {
  const user = null; // replace with auth later
  const role = resolveUserRole(user);
  const context = bootstrapContext();

  return (
    <QuantumLayoutEngine userRole={role} context={context}>
      {children}
    </QuantumLayoutEngine>
  );
}
