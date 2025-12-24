export interface AuthLayoutContext {
  userId: string;
  role: 'super-admin' | 'school-admin' | 'staff' | 'parent' | 'student';
  staffSubtype?: 'teaching' | 'administrative' | 'support' | 'head';
  schoolId?: string;
  authConfidence: number;
  deviceTrust: 'trusted' | 'unknown' | 'risky';
  preferredLandingZone?: 'primary' | 'left' | 'right';
}

let cachedContext: AuthLayoutContext | null = null;

export function setAuthLayoutContext(context: AuthLayoutContext) {
  cachedContext = context;
}

export function getAuthLayoutContext(): AuthLayoutContext | null {
  return cachedContext;
}
