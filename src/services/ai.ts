import * as tf from '@tensorflow/tfjs';
import { UserBehavior, Task, StudyRecommendation } from '../types';
import { db } from './db';
import { addDays, differenceInMinutes, parseISO } from 'date-fns';

export class AIService {
  private static instance: AIService;
  private model: tf.LayersModel | null = null;

  private constructor() {
    this.initModel();
  }

  static getInstance() {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private async initModel() {
    try {
      // Load or create the model
      this.model = await tf.loadLayersModel('indexeddb://taskhub-model');
    } catch {
      // Create new model if none exists
      this.model = this.createModel();
      await this.model.save('indexeddb://taskhub-model');
    }
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [10] // Features: time, day, task type, duration, etc.
    }));
    
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu'
    }));
    
    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));
    
    model.add(tf.layers.dense({
      units: 4, // Output: recommended study duration, breaks, etc.
      activation: 'sigmoid'
    }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    return model;
  }

  async analyzeBehavior(behavior: UserBehavior): Promise<StudyRecommendation> {
    const features = this.extractFeatures(behavior);
    
    const prediction = this.model!.predict(tf.tensor2d([features])) as tf.Tensor;
    const [studyDuration, breakInterval, focusScore, difficulty] = await prediction.data();

    return {
      recommendedDuration: Math.round(studyDuration * 60), // Convert to minutes
      breakInterval: Math.round(breakInterval * 15), // Break interval in minutes
      focusScore: focusScore,
      difficulty: difficulty,
      timestamp: new Date()
    };
  }

  private extractFeatures(behavior: UserBehavior): number[] {
    return [
      behavior.timeOfDay / 24, // Normalize time to 0-1
      behavior.dayOfWeek / 7,
      behavior.taskDuration / 180, // Normalize duration (assume max 3 hours)
      behavior.completionRate,
      behavior.breakFrequency / 60,
      behavior.focusScore,
      behavior.productivity,
      behavior.difficulty,
      behavior.interruptions / 10,
      behavior.energyLevel / 10
    ];
  }

  async updateModel(behaviors: UserBehavior[]) {
    if (!this.model || behaviors.length < 10) return;

    const features = behaviors.map(b => this.extractFeatures(b));
    const labels = behaviors.map(b => [
      b.taskDuration / 180,
      b.breakFrequency / 60,
      b.focusScore,
      b.difficulty
    ]);

    await this.model.fit(
      tf.tensor2d(features),
      tf.tensor2d(labels),
      {
        epochs: 10,
        batchSize: 32,
        shuffle: true
      }
    );

    await this.model.save('indexeddb://taskhub-model');
  }

  async generateStudyPlan(tasks: Task[]): Promise<Task[]> {
    const behaviors = await (await db).getAll('behaviors');
    const recommendation = await this.analyzeBehavior(behaviors[behaviors.length - 1]);
    
    return tasks.map(task => ({
      ...task,
      estimatedTime: Math.round(
        task.estimatedTime * (1 + (1 - recommendation.focusScore) * 0.2)
      ),
      recommendedMethod: this.getRecommendedMethod(task, recommendation)
    }));
  }

  private getRecommendedMethod(task: Task, recommendation: StudyRecommendation) {
    // Implementation for method recommendation based on task type and user behavior
    return task.type === 'exam' ? 'active' : 'pomodoro';
  }
}