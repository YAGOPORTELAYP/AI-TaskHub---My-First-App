import { Card, Text, Progress, Stack, Group } from '@mantine/core';
import { useAIRecommendations } from '../hooks/useAIRecommendations';

export function AIRecommendations() {
  const recommendation = useAIRecommendations();

  if (!recommendation) return null;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Text size="lg" weight={500}>
          Recomendações de Estudo
        </Text>

        <Group position="apart">
          <Text size="sm">Duração Recomendada:</Text>
          <Text weight={500}>{recommendation.recommendedDuration} min</Text>
        </Group>

        <Group position="apart">
          <Text size="sm">Intervalo entre Pausas:</Text>
          <Text weight={500}>{recommendation.breakInterval} min</Text>
        </Group>

        <Stack spacing="xs">
          <Text size="sm">Nível de Foco:</Text>
          <Progress 
            value={recommendation.focusScore * 100} 
            color={recommendation.focusScore > 0.7 ? 'green' : 'yellow'}
          />
        </Stack>

        <Stack spacing="xs">
          <Text size="sm">Dificuldade Atual:</Text>
          <Progress 
            value={recommendation.difficulty * 100}
            color={recommendation.difficulty > 0.7 ? 'red' : 'blue'}
          />
        </Stack>
      </Stack>
    </Card>
  );
}