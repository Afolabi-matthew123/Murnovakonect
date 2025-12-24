export function bootstrapContext() {
  const hour = new Date().getHours();
  if (hour < 8) return 'early-morning';
  if (hour > 18) return 'evening';
  return 'daytime';
}
