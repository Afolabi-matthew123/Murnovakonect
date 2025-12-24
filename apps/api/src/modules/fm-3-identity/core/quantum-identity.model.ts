/**
 * QUANTUM IDENTITY THEORY:
 * Each user exists in multiple states simultaneously until observed.
 * When a user acts, their identity "collapses" to the appropriate role state.
 */

export interface QuantumIdentity {
  userId: string;
  quantumId: string;

  potentialStates: QuantumState[];
  collapsedState: CollapsedIdentity;

  entangledWith: EntanglementLink[];
  stateProbabilities: Map<string, number>;

  coherence: number;
  lastObserver: ObserverContext;
}

export interface QuantumState {
  id: string;
  role: UserRole;
  schoolId: string | null;
  permissions: PermissionMatrix;
  context: StateContext;
  amplitude: number;
  phase: number;
}

export interface CollapsedIdentity {
  stateId: string;
  role: UserRole;
  schoolId: string;
  effectivePermissions: PermissionMatrix;
  validUntil: Date;
  collapseReason: string;
}

export interface EntanglementLink {
  targetUserId: string;
  relationship: QuantumRelationship;
  strength: number;
  createdAt: Date;
}

export enum QuantumRelationship {
  PARENT_CHILD = 'parent_child',
  TEACHER_STUDENT = 'teacher_student',
  STAFF_SCHOOL = 'staff_school',
  HYBRID_IDENTITY = 'hybrid_identity',
  MULTI_TENANT = 'multi_tenant'
}
