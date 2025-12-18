import React, { createContext, ReactNode } from 'react';
import { useHoloTheme, SchoolTheme } from '../hooks/useHoloTheme';

export const ThemeContext = createContext<SchoolTheme | undefined>(undefined);

interface ThemeProviderProps {
  theme?: SchoolTheme;
  children: ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const { cssVariables } = useHoloTheme(theme);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={cssVariables as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
