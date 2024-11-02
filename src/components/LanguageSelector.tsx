import { Select } from '@mantine/core';
import { usePreferencesStore } from '../store/usePreferencesStore';

export function LanguageSelector() {
  const { language, setLanguage } = usePreferencesStore();

  return (
    <Select
      value={language}
      onChange={(value) => setLanguage(value || 'pt-BR')}
      data={[
        { value: 'pt-BR', label: 'Português' },
        { value: 'en-US', label: 'English' },
        { value: 'es-ES', label: 'Español' }
      ]}
      style={{ width: 200 }}
    />
  );
}