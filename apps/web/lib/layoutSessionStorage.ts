export type LayoutSessionSnapshot = {
  role: string;
  preferredZones: Record<string, string>;
  lastContext: string;
  navWeights: Record<string, number>;
  cognitiveBaseline: 'focused' | 'neutral' | 'overloaded';
};

const STORAGE_KEY = 'murnova.layout.session';

export function saveLayoutSession(snapshot: LayoutSessionSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {}
}

export function loadLayoutSession(): LayoutSessionSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLayoutSession() {
  localStorage.removeItem(STORAGE_KEY);
}
