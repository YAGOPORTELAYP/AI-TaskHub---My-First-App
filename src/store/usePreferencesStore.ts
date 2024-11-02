import { create } from 'zustand';
import { UserPreferences, LearningStyle, StudyMethod, Theme } from '../types';
import { defaultThemes } from '../themes/defaultThemes';

interface PreferencesStore {
  preferences: UserPreferences | null;
  setPreferences: (preferences: UserPreferences) => void;
  updateTheme: (theme: Theme) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  preferences: null,
  language: navigator.language || 'pt-BR',
  setPreferences: (preferences) => set({ preferences }),
  setLanguage: (language) => set({ language }),
  updateTheme: (theme) => set((state) => ({
    preferences: state.preferences ? {
      ...state.preferences,
      theme
    } : null
  }))
}));