import { openDB, DBSchema } from 'idb';
import { Task, UserPreferences, UserBehavior } from '../types';

interface TaskHubDB extends DBSchema {
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-date': Date };
  };
  preferences: {
    key: string;
    value: UserPreferences;
  };
  behaviors: {
    key: string;
    value: UserBehavior;
  };
}

const DB_NAME = 'taskhub-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB<TaskHubDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
      taskStore.createIndex('by-date', 'dueDate');
      
      db.createObjectStore('preferences', { keyPath: 'id' });
      db.createObjectStore('behaviors', { keyPath: 'timestamp' });
    },
  });
};

export const db = initDB();