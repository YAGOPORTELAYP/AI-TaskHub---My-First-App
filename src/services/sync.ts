import { db } from './db';
import { Task, UserBehavior } from '../types';

const API_URL = 'https://api.taskhub.ai'; // Example API endpoint

export class SyncService {
  private static instance: SyncService;
  private syncInProgress = false;

  private constructor() {
    this.setupAutoSync();
  }

  static getInstance() {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  private setupAutoSync() {
    window.addEventListener('online', () => this.sync());
    setInterval(() => {
      if (navigator.onLine) this.sync();
    }, 300000); // Sync every 5 minutes when online
  }

  async sync() {
    if (this.syncInProgress || !navigator.onLine) return;
    
    try {
      this.syncInProgress = true;
      
      const tasksDB = await (await db).getAll('tasks');
      const behaviorsDB = await (await db).getAll('behaviors');
      
      // Send local data to server
      const response = await fetch(`${API_URL}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: tasksDB, behaviors: behaviorsDB })
      });
      
      if (!response.ok) throw new Error('Sync failed');
      
      // Get optimized data back from AI
      const { tasks, recommendations } = await response.json();
      
      // Update local storage with optimized data
      const db_instance = await db;
      await Promise.all([
        ...tasks.map((task: Task) => 
          db_instance.put('tasks', task)
        ),
        db_instance.clear('behaviors') // Clear old behavior data
      ]);
      
      // Store new AI recommendations
      await this.storeRecommendations(recommendations);
      
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async storeRecommendations(recommendations: any) {
    // Implementation for storing AI recommendations
  }
}