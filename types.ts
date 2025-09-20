
export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export enum GameStatus {
  Idle = 'IDLE',
  Fetching = 'FETCHING',
  Active = 'ACTIVE',
  Finished = 'FINISHED',
}

export const QuestionCategories = {
  GENERAL: 'منوعات',
  HISTORY_GEO: 'تاريخ وجغرافيا',
  CULTURE_ART: 'ثقافة وفنون',
} as const;

export type QuestionCategory = typeof QuestionCategories[keyof typeof QuestionCategories];
