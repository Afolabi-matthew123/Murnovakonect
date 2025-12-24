export const ROLE_NAVIGATION = {
  'super-admin': [
    { id: 'dashboard', label: 'Global Dashboard' },
    { id: 'schools', label: 'Schools' },
    { id: 'system-health', label: 'System Health' },
    { id: 'analytics', label: 'Analytics' }
  ],
  'school-admin': [
    { id: 'dashboard', label: 'School Dashboard' },
    { id: 'staff', label: 'Staff Management' },
    { id: 'finance', label: 'Finance' },
    { id: 'reports', label: 'Reports' }
  ],
  'staff': [
    { id: 'classes', label: 'My Classes' },
    { id: 'students', label: 'Students' },
    { id: 'grading', label: 'Grading' },
    { id: 'materials', label: 'Materials' }
  ],
  'parent': [
    { id: 'child', label: 'My Child' },
    { id: 'performance', label: 'Performance' },
    { id: 'payments', label: 'Payments' },
    { id: 'messages', label: 'Messages' }
  ],
  'student': [
    { id: 'learning', label: 'Learning' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'progress', label: 'Progress' },
    { id: 'help', label: 'Help' }
  ]
};
