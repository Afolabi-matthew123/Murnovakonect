import type { NeuralNavConfig } from './neural-types';

export const QUANTUM_NAV_CONFIG: NeuralNavConfig = {
  version: 'quantum-v1',

  items: {
    'classroom': {
      id: 'classroom',
      label: 'Classroom Portal',
      icon: ClassroomIcon,
      path: '/staff/classroom',
      roles: ['staff'],
      contexts: ['teaching', 'creative'],
      cognitiveThreshold: 'high',
      frequencyScore: 0.9,
      timePatterns: { morning: 0.9, afternoon: 0.6, evening: 0.1 },
      relatedItems: ['attendance', 'lesson-plan'],
      priority: 95,
      complexity: 4,
      learningStage: 'basic',
      holographicEffect: {
        intensity: 0.7,
        color: '#4F46E5',
        animation: 'pulse'
      }
    },

    'children-overview': {
      id: 'children-overview',
      label: 'My Children',
      icon: FamilyIcon,
      path: '/parent/children',
      roles: ['parent'],
      contexts: ['parenting'],
      cognitiveThreshold: 'low',
      frequencyScore: 0.9,
      timePatterns: { evening: 0.9, weekend: 0.8 },
      relatedItems: ['grades', 'messages'],
      priority: 100,
      complexity: 2,
      learningStage: 'basic'
    }
  },

  roleContexts: {
    'staff': ['teaching', 'grading', 'creative'],
    'parent': ['parenting'],
    'student': ['learning']
  }
};
