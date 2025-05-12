import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings, HOME_PAGE_OPTIONS } from '../types/settings';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  clearAppData: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'dark',
  language: 'en',
  favoriteGenres: [],
  contentFilter: false,
  autoPlayTrailers: true,
  dataSaverMode: false,
  highContrast: false,
  defaultHomePage: HOME_PAGE_OPTIONS[0].value,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const clearAppData = () => {
    localStorage.clear();
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, clearAppData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};