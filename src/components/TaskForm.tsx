import { useState } from 'react';
import { TextInput, Select, Textarea, Button, NumberInput, DateInput } from '@mantine/core';
import { useTaskStore } from '../store/useTaskStore';
import { TaskType } from '../types';

export function TaskForm() {
  const addTask = useTaskStore(state => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [subject, setSubject] = useState('');
  const [type, setType] = useState<TaskType>('assignment');
  const [estimatedTime, setEstimatedTime] = useState<number | ''>(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return;

    addTask({
      title,
      description,
      dueDate,
      subject,
      type,
      completed: false,
      estimatedTime: typeof estimatedTime === 'number' ? estimatedTime : 60
    });

    setTitle('');
    setDescription('');
    setDueDate(null);
    setSubject('');
    setType('assignment');
    setEstimatedTime(60);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        required
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <Textarea
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <DateInput
        required
        label="Data de Entrega"
        value={dueDate}
        onChange={setDueDate}
      />
      
      <TextInput
        required
        label="Disciplina"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      
      <Select
        required
        label="Tipo"
        value={type}
        onChange={(value: TaskType) => setType(value)}
        data={[
          { value: 'exam', label: 'Prova' },
          { value: 'assignment', label: 'Atividade' },
          { value: 'project', label: 'Projeto' },
          { value: 'study', label: 'Estudo' }
        ]}
      />
      
      <NumberInput
        required
        label="Tempo Estimado (minutos)"
        value={estimatedTime}
        onChange={setEstimatedTime}
        min={1}
      />
      
      <Button type="submit" fullWidth>
        Adicionar Tarefa
      </Button>
    </form>
  );
}