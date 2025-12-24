export const ROLE_LAYOUTS = {
  'super-admin': { rings: 3, panels: 4 },
  'staff': { rings: 2, panels: 3 },
  'parent': { rings: 1, panels: 2 },
  'student': { rings: 1, panels: 1 }
};

export function useRoleLayout(role: string) {
  return ROLE_LAYOUTS[role] || ROLE_LAYOUTS['student'];
}
