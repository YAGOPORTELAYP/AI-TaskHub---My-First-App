import { useState } from 'react';
import { 
  Card, 
  Title, 
  Radio, 
  MultiSelect, 
  NumberInput, 
  Select, 
  Button, 
  Stack,
  Divider
} from '@mantine/core';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { translations } from '../i18n/translations';
import { LearningStyle, StudyMethod, UserPreferences } from '../types';
import { ThemeSelector } from './ThemeSelector';
import { defaultThemes } from '../themes/defaultThemes';

export function LearningStyleForm() {
  const { language, setPreferences } = usePreferencesStore();
  const t = translations[language as keyof typeof translations];

  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');
  const [preferredMethods, setPreferredMethods] = useState<StudyMethod[]>([]);
  const [dailyStudyHours, setDailyStudyHours] = useState(4);
  const [preferredStudyTime, setPreferredStudyTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preferences: UserPreferences = {
      id: crypto.randomUUID(),
      language,
      learningStyle,
      preferredMethods,
      dailyStudyHours,
      preferredStudyTime,
      theme: defaultThemes[0] // Default theme
    };
    setPreferences(preferences);
  };

  return (
    <Card shadow="sm" p="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Title order={3}>{t.learningStyle.title}</Title>
          
          <Radio.Group
            value={learningStyle}
            onChange={(value) => setLearningStyle(value as LearningStyle)}
            name="learningStyle"
            required
          >
            <Stack>
              {Object.entries(t.learningStyle).map(([key, label]) => {
                if (key === 'title') return null;
                return (
                  <Radio key={key} value={key} label={label} />
                );
              })}
            </Stack>
          </Radio.Group>

          <MultiSelect
            label="Métodos de Estudo Preferidos"
            data={Object.entries(t.studyMethods).map(([key, label]) => ({
              value: key,
              label: label as string
            }))}
            value={preferredMethods}
            onChange={(values) => setPreferredMethods(values as StudyMethod[])}
            required
          />

          <NumberInput
            label="Horas de Estudo por Dia"
            value={dailyStudyHours}
            onChange={(value) => setDailyStudyHours(Number(value))}
            min={1}
            max={24}
            required
          />

          <Select
            label="Horário Preferido para Estudos"
            value={preferredStudyTime}
            onChange={(value) => setPreferredStudyTime(value as typeof preferredStudyTime)}
            data={[
              { value: 'morning', label: 'Manhã' },
              { value: 'afternoon', label: 'Tarde' },
              { value: 'evening', label: 'Noite' },
              { value: 'night', label: 'Madrugada' }
            ]}
            required
          />

          <Divider my="md" />
          
          <Title order={3}>Personalização</Title>
          <ThemeSelector />

          <Button type="submit" fullWidth>
            Salvar Preferências
          </Button>
        </Stack>
      </form>
    </Card>
  );
}