import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'intel-dark' | 'intel-light' | 'stealth' | 'high-contrast';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: readonly Theme[];
}

const STORAGE_KEY = 'portal-theme';
const DEFAULT_THEME: Theme = 'intel-dark';
const THEMES: readonly Theme[] = ['intel-dark', 'intel-light', 'stealth', 'high-contrast'] as const;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.includes(stored as Theme)) {
    return stored as Theme;
  }
  return DEFAULT_THEME;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
