import { UISignal } from '../types/SignalTypes';

export interface ResolutionResult {
  winningSignal: UISignal | null;
  rankedSignals: UISignal[];
}

export class MultiSignalResolver {
  resolve(signals: UISignal[]): ResolutionResult {
    // 1. Remove disallowed signals
    const allowedSignals = signals.filter(s => s.allowed);

    if (allowedSignals.length === 0) {
      return { winningSignal: null, rankedSignals: [] };
    }

    // 2. Score each signal
    const scored = allowedSignals.map(signal => {
      const score =
        signal.confidence * 0.4 +
        signal.urgency * 0.4 +
        signal.weight * 0.2;

      return { signal, score };
    });

    // 3. Sort descending
    scored.sort((a, b) => b.score - a.score);

    return {
      winningSignal: scored[0].signal,
      rankedSignals: scored.map(s => s.signal)
    };
  }
}
