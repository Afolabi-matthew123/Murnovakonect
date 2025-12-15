/**
 * Shared auth-related domain types for FM-1.
 * These are intentionally minimal and decoupled from Prisma,
 * but aligned with the Prisma schema (User, Role, Permission, UserType).
 */

export type UserType =
  | 'SUPER_ADMIN'
  | 'SCHOOL_ADMIN'
  | 'TEACHER'
  | 'BURSAR'
  | 'PARENT'
  | 'STUDENT';

export interface Permission {
  id: string;
  name: string;
  description?: string | null;
}

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions: Permission[];
  schoolId?: string | null;
}

export interface User {
  id: string;
  email?: string | null;
  phone?: string | null;
  displayName?: string | null;
  userType: UserType;
  schoolId?: string | null;
  roles: Role[];
  isActive: boolean;
}

/**
 * JWT payload we sign from the backend.
 */
export interface JwtPayload {
  sub: string; // user id
  email?: string | null;
  phone?: string | null;
  studentId?: string | null;
  staffId?: string | null;
  userType: UserType;
  schoolId?: string | null;
  iat?: number;
  exp?: number;
}

/**
 * Convenience wrapper for auth responses.
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: User;
  tokens: AuthTokens;
}
