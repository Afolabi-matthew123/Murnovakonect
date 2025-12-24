import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children, schoolTheme }: any) {
  const [theme] = useState({
    primary: schoolTheme?.primary || '#1e1b4b',
    accent: schoolTheme?.accent || '#f59e0b',
    whiteLabel: schoolTheme?.whiteLabel || false
  });

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ backgroundColor: theme.primary }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
