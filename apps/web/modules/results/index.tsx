import { MicroAppShell } from '@/components/zones/MicroAppShell';

export const ModuleMeta = {
  id: 'results',
  permissions: ['staff', 'parent', 'student'],
  aiCapable: true,
};

export function ResultsModule() {
  return (
    <MicroAppShell meta={ModuleMeta}>
      <h2>Results</h2>
    </MicroAppShell>
  );
}
