import { MicroAppShell } from '@/components/zones/MicroAppShell';

export const ModuleMeta = {
  id: 'payment',
  permissions: ['staff', 'parent'],
  aiCapable: true,
};

export function PaymentModule() {
  return (
    <MicroAppShell meta={ModuleMeta}>
      <h2>Payments</h2>
    </MicroAppShell>
  );
}
