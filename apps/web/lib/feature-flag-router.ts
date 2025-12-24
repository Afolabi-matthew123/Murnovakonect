export class FeatureFlagRouter {
  async check(path: string, user: any) {
    return {
      enabled: true,
      reason: 'Feature enabled'
    };
  }
}
