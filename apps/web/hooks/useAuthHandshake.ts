import { setAuthLayoutContext } from '@/lib/authLayoutHandshake';

export function useAuthHandshake() {
  function emitHandshake(authResult: any) {
    setAuthLayoutContext({
      userId: authResult.user.id,
      role: authResult.user.role,
      staffSubtype: authResult.user.staffSubtype,
      schoolId: authResult.user.schoolId,
      authConfidence: authResult.confidence ?? 0.8,
      deviceTrust: authResult.deviceTrust ?? 'unknown',
      preferredLandingZone: 'primary'
    });
  }

  return { emitHandshake };
}
