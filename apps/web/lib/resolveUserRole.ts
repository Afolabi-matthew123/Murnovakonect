export function resolveUserRole(user: any) {
  if (!user) return 'guest';
  return user.role || 'student';
}
