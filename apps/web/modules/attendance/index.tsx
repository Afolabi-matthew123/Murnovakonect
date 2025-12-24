import { MicroAppShell } from '@/components/zones/MicroAppShell';

export const ModuleMeta = {
  id: 'attendance',
  permissions: ['staff'],
  aiCapable: true,
};

export function AttendanceModule() {
  return (
    <MicroAppShell meta={ModuleMeta}>
      <h2>Attendance</h2>
    </MicroAppShell>
  );
}
