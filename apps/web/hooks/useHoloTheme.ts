export interface SchoolTheme {
  primaryColor: string;
  accentColor?: string;
  whiteLabel?: boolean;
}

export function useHoloTheme(theme?: SchoolTheme) {
  const defaultTheme = {
    primaryColor: '#4f46e5', // Indigo
    accentColor: '#f59e0b',  // Amber
    whiteLabel: false,
  };

  const activeTheme = { ...defaultTheme, ...theme };

  return {
    theme: activeTheme,
    cssVariables: {
      '--holo-primary': activeTheme.primaryColor,
      '--holo-accent': activeTheme.accentColor,
    },
    showPoweredBy: !activeTheme.whiteLabel,
  };
}
