import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export function useHoloTheme() {
  return useContext(ThemeContext);
}
