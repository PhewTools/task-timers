export interface Task {
  id: string;
  title: string;
  description?: string;
  isRunning: boolean;
  totalTime: number; // in seconds
  startTime?: Date;
  createdAt: Date;
  completed: boolean;
}
