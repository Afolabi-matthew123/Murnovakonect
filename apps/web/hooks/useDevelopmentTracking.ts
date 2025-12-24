export function useDevelopmentTracking() {
  return {
    trackPlaceholderVisit: (path: string, userId?: string) => {
      console.log('Tracking visit:', path, userId);
    }
  };
}
