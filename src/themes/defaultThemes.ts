import { Theme } from '../types';

export const defaultThemes: Theme[] = [
  {
    id: 'modern-light',
    name: 'Moderno Claro',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    backgroundColor: '#F3F4F6',
    textColor: '#1F2937',
    accentColor: '#2563EB',
    cardColor: '#FFFFFF',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'modern-dark',
    name: 'Moderno Escuro',
    primaryColor: '#60A5FA',
    secondaryColor: '#3B82F6',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    accentColor: '#3B82F6',
    cardColor: '#374151',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'minimal-light',
    name: 'Minimalista Claro',
    primaryColor: '#000000',
    secondaryColor: '#404040',
    backgroundColor: '#FFFFFF',
    textColor: '#171717',
    accentColor: '#525252',
    cardColor: '#FAFAFA',
    borderRadius: 4,
    fontFamily: 'system-ui, sans-serif'
  },
  {
    id: 'minimal-dark',
    name: 'Minimalista Escuro',
    primaryColor: '#FFFFFF',
    secondaryColor: '#E5E5E5',
    backgroundColor: '#171717',
    textColor: '#FFFFFF',
    accentColor: '#A3A3A3',
    cardColor: '#262626',
    borderRadius: 4,
    fontFamily: 'system-ui, sans-serif'
  },
  {
    id: 'playful',
    name: 'Divertido',
    primaryColor: '#EC4899',
    secondaryColor: '#F472B6',
    backgroundColor: '#FFEDD5',
    textColor: '#831843',
    accentColor: '#DB2777',
    cardColor: '#FFF1F2',
    borderRadius: 16,
    fontFamily: 'Comic Sans MS, cursive'
  },
  {
    id: 'nature',
    name: 'Natureza',
    primaryColor: '#059669',
    secondaryColor: '#34D399',
    backgroundColor: '#ECFDF5',
    textColor: '#064E3B',
    accentColor: '#10B981',
    cardColor: '#F0FDF4',
    borderRadius: 12,
    fontFamily: 'Verdana, sans-serif'
  }
];