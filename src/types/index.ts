export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskType = 'exam' | 'assignment' | 'project' | 'study';
export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading-writing';
export type StudyMethod = 'pomodoro' | 'spaced' | 'active' | 'mindmap' | 'flashcards';

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  cardColor: string;
  borderRadius: number;
  fontFamily: string;
}

export interface UserPreferences {
  id: string;
  language: string;
  learningStyle: LearningStyle;
  preferredMethods: StudyMethod[];
  dailyStudyHours: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  theme: Theme;
}

// Rest of the types remain the same...