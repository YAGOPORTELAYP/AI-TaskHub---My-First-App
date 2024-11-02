import { MantineProvider, Title, Container, Box, Group, Grid } from '@mantine/core';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { LearningStyleForm } from './components/LearningStyleForm';
import { LanguageSelector } from './components/LanguageSelector';
import { AIRecommendations } from './components/AIRecommendations';
import { SettingsModal } from './components/SettingsModal';
import { usePreferencesStore } from './store/usePreferencesStore';
import { translations } from './i18n/translations';
import { useEffect } from 'react';
import { useTaskStore } from './store/useTaskStore';

function App() {
  const { preferences, language } = usePreferencesStore();
  const loadTasks = useTaskStore(state => state.loadTasks);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const theme = preferences?.theme;

  return (
    <MantineProvider
      theme={{
        colors: {
          primary: [theme?.primaryColor || '#3B82F6'],
          secondary: [theme?.secondaryColor || '#60A5FA']
        },
        primaryColor: 'primary',
        primaryShade: 0,
        fontFamily: theme?.fontFamily || 'Inter, sans-serif',
        components: {
          Card: {
            defaultProps: {
              style: {
                backgroundColor: theme?.cardColor,
                borderRadius: theme?.borderRadius
              }
            }
          }
        }
      }}
    >
      <Box 
        style={{ 
          backgroundColor: theme?.backgroundColor || '#F3F4F6',
          color: theme?.textColor || '#1F2937',
          minHeight: '100vh'
        }}
      >
        <Container size="md" py="xl">
          <Group position="right" mb="md" spacing="md">
            <LanguageSelector />
            {preferences && <SettingsModal />}
          </Group>
          
          <Box mb="xl" ta="center">
            <Title 
              order={1} 
              size="h1" 
              fw={900} 
              c={theme?.primaryColor || 'blue'}
            >
              {t.title}
            </Title>
            <Title 
              order={2} 
              size="h4" 
              c={theme?.secondaryColor || 'dimmed'} 
              fw={500} 
              mt="xs"
            >
              {t.subtitle}
            </Title>
          </Box>

          {!preferences ? (
            <LearningStyleForm />
          ) : (
            <Grid>
              <Grid.Col span={8}>
                <Box mb="xl">
                  <TaskForm />
                </Box>
                <TaskList />
              </Grid.Col>
              <Grid.Col span={4}>
                <AIRecommendations />
              </Grid.Col>
            </Grid>
          )}
        </Container>
      </Box>
    </MantineProvider>
  );
}

export default App;