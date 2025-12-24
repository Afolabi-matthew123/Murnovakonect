export class RoleIntelligence {
  async check(path: string, role: string, context?: any) {
    return {
      allowed: true,
      confidence: 0.9,
      reason: 'Role permitted'
    };
  }

  async findIntelligentAlternatives(path: string) {
    return [];
  }
}
