import { useMemo } from 'react';
import { Card, Text, Badge, Group, ActionIcon, Stack } from '@mantine/core';
import { IconTrash, IconCheck } from '@tabler/icons-react';
import { useTaskStore } from '../store/useTaskStore';

const priorityColors = {
  high: 'red',
  medium: 'yellow',
  low: 'green'
};

const typeLabels = {
  exam: 'Prova',
  assignment: 'Atividade',
  project: 'Projeto',
  study: 'Estudo'
};

export function TaskList() {
  const tasks = useTaskStore(state => state.tasks);
  const toggleTask = useTaskStore(state => state.toggleTask);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // Primeiro por prioridade
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      // Depois por data
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  }, [tasks]);

  return (
    <Stack spacing="md">
      {sortedTasks.map(task => (
        <Card key={task.id} shadow="sm" padding="lg" withBorder>
          <Group position="apart">
            <Text 
              weight={500} 
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </Text>
            <Group spacing="xs">
              <Badge color={priorityColors[task.priority]}>
                {task.priority.toUpperCase()}
              </Badge>
              <Badge variant="outline">
                {typeLabels[task.type]}
              </Badge>
              <ActionIcon onClick={() => toggleTask(task.id)} color="green">
                <IconCheck size={16} />
              </ActionIcon>
              <ActionIcon onClick={() => deleteTask(task.id)} color="red">
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
          
          <Text size="sm" color="dimmed" mt="md">
            {task.description}
          </Text>
          
          <Group position="apart" mt="md">
            <Text size="sm">
              Disciplina: {task.subject}
            </Text>
            <Text size="sm">
              Tempo estimado: {task.estimatedTime} min
            </Text>
          </Group>
          
          <Text size="sm" mt="sm">
            Entrega: {task.dueDate.toLocaleDateString()}
          </Text>
        </Card>
      ))}
    </Stack>
  );
}