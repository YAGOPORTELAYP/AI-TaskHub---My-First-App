import { Select, ColorInput, NumberInput, TextInput, Stack, Button } from '@mantine/core';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { defaultThemes } from '../themes/defaultThemes';
import { Theme } from '../types';
import { useState } from 'react';

export function ThemeSelector() {
  const { preferences, updateTheme } = usePreferencesStore();
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleThemeChange = (themeId: string) => {
    if (themeId === 'custom') {
      setIsCustomizing(true);
      setCustomTheme({
        id: 'custom',
        name: 'Personalizado',
        ...defaultThemes[0]
      });
    } else {
      setIsCustomizing(false);
      const selectedTheme = defaultThemes.find(theme => theme.id === themeId);
      if (selectedTheme) {
        updateTheme(selectedTheme);
      }
    }
  };

  const handleCustomThemeChange = (field: keyof Theme, value: string | number) => {
    if (customTheme) {
      setCustomTheme({
        ...customTheme,
        [field]: value
      });
    }
  };

  const saveCustomTheme = () => {
    if (customTheme) {
      updateTheme(customTheme);
      setIsCustomizing(false);
    }
  };

  const themeOptions = [
    ...defaultThemes.map(theme => ({
      value: theme.id,
      label: theme.name
    })),
    { value: 'custom', label: 'Personalizar Tema' }
  ];

  return (
    <Stack spacing="md">
      <Select
        label="Tema"
        value={isCustomizing ? 'custom' : preferences?.theme?.id}
        onChange={handleThemeChange}
        data={themeOptions}
      />

      {isCustomizing && customTheme && (
        <Stack spacing="sm">
          <TextInput
            label="Nome do Tema"
            value={customTheme.name}
            onChange={(e) => handleCustomThemeChange('name', e.target.value)}
          />
          <ColorInput
            label="Cor Primária"
            value={customTheme.primaryColor}
            onChange={(value) => handleCustomThemeChange('primaryColor', value)}
          />
          <ColorInput
            label="Cor Secundária"
            value={customTheme.secondaryColor}
            onChange={(value) => handleCustomThemeChange('secondaryColor', value)}
          />
          <ColorInput
            label="Cor de Fundo"
            value={customTheme.backgroundColor}
            onChange={(value) => handleCustomThemeChange('backgroundColor', value)}
          />
          <ColorInput
            label="Cor do Texto"
            value={customTheme.textColor}
            onChange={(value) => handleCustomThemeChange('textColor', value)}
          />
          <ColorInput
            label="Cor de Destaque"
            value={customTheme.accentColor}
            onChange={(value) => handleCustomThemeChange('accentColor', value)}
          />
          <ColorInput
            label="Cor dos Cartões"
            value={customTheme.cardColor}
            onChange={(value) => handleCustomThemeChange('cardColor', value)}
          />
          <NumberInput
            label="Raio da Borda"
            value={customTheme.borderRadius}
            onChange={(value) => handleCustomThemeChange('borderRadius', Number(value))}
            min={0}
            max={24}
          />
          <Select
            label="Fonte"
            value={customTheme.fontFamily}
            onChange={(value) => handleCustomThemeChange('fontFamily', value || 'system-ui')}
            data={[
              { value: 'system-ui, sans-serif', label: 'Sistema' },
              { value: 'Inter, sans-serif', label: 'Inter' },
              { value: 'Roboto, sans-serif', label: 'Roboto' },
              { value: 'Comic Sans MS, cursive', label: 'Comic Sans' },
              { value: 'Verdana, sans-serif', label: 'Verdana' }
            ]}
          />
          <Button onClick={saveCustomTheme}>Salvar Tema</Button>
        </Stack>
      )}
    </Stack>
  );
}