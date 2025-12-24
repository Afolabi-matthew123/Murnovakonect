export function resolveNavigationWeight({
  roleWeight,
  userWeight
}: {
  roleWeight: number;
  userWeight: number;
}) {
  return roleWeight * 0.7 + userWeight * 0.3;
}
