import { create } from 'zustand';
import { Task, TaskPriority } from '../types';
import { db } from '../services/db';
import { AIService } from '../services/ai';
import { SyncService } from '../services/sync';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'priority'>) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loadTasks: () => Promise<void>;
}

const calculatePriority = (task: Omit<Task, 'id' | 'priority'>): TaskPriority => {
  const now = new Date();
  const daysUntilDue = Math.ceil((task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (task.type === 'exam') {
    return daysUntilDue <= 7 ? 'high' : daysUntilDue <= 14 ? 'medium' : 'low';
  }
  
  return daysUntilDue <= 3 ? 'high' : daysUntilDue <= 7 ? 'medium' : 'low';
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  
  loadTasks: async () => {
    const tasks = await (await db).getAll('tasks');
    const aiService = AIService.getInstance();
    const optimizedTasks = await aiService.generateStudyPlan(tasks);
    set({ tasks: optimizedTasks });
  },

  addTask: async (task) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      priority: calculatePriority(task)
    };

    await (await db).add('tasks', newTask);
    const tasks = await (await db).getAll('tasks');
    
    const aiService = AIService.getInstance();
    const optimizedTasks = await aiService.generateStudyPlan(tasks);
    
    set({ tasks: optimizedTasks });
    
    // Trigger sync if online
    if (navigator.onLine) {
      SyncService.getInstance().sync();
    }
  },

  toggleTask: async (id) => {
    const db_instance = await db;
    const task = await db_instance.get('tasks', id);
    if (task) {
      task.completed = !task.completed;
      await db_instance.put('tasks', task);
      const tasks = await db_instance.getAll('tasks');
      set({ tasks });
      
      if (navigator.onLine) {
        SyncService.getInstance().sync();
      }
    }
  },

  deleteTask: async (id) => {
    await (await db).delete('tasks', id);
    const tasks = await (await db).getAll('tasks');
    set({ tasks });
    
    if (navigator.onLine) {
      SyncService.getInstance().sync();
    }
  }
}));