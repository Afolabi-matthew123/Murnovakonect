export interface PredictedContent {
  type: string;
  title: string;
  description: string;
  confidence: number; // 0–1
  priority: number; // 1–10
  estimatedComplexity: 'low' | 'medium' | 'high';
  mockData: any[];
}

export interface SimulatedInteraction {
  id: string;
  type: 'search' | 'filter' | 'action' | 'navigation' | 'custom';
  label: string;
  description: string;
  steps: {
    action: string;
    value: string;
    feedback: string;
  }[];
  learningValue?: string;
}

export interface IntentQuestion {
  id: string;
  question: string;
  type: 'open-ended' | 'multiple-choice' | 'priority-list' | 'slider';
  priority: number;
  options?: string[];
}

export interface FeatureSuggestion {
  id: string;
  path: string;
  userId: string;
  userRole: string;
  title: string;
  description: string;
  priority: number;
  timestamp: number;
  upvotes: number;
  status: 'pending' | 'approved' | 'rejected' | 'in-development';
}
