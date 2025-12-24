type NavigationEvent = {
  route: string;
  timestamp: number;
};

type Prediction = {
  route: string;
  confidence: number;
};

class NavigationIntelligenceEngine {
  private history: NavigationEvent[] = [];

  record(route: string) {
    this.history.push({
      route,
      timestamp: Date.now()
    });

    if (this.history.length > 50) {
      this.history.shift();
    }
  }

  predictNext(): Prediction[] {
    const frequencyMap = new Map<string, number>();

    for (const event of this.history) {
      frequencyMap.set(
        event.route,
        (frequencyMap.get(event.route) || 0) + 1
      );
    }

    return Array.from(frequencyMap.entries())
      .map(([route, count]) => ({
        route,
        confidence: count / this.history.length
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  }
}

export const NavigationIntelligence = new NavigationIntelligenceEngine();
