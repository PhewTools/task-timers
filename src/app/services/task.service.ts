import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  private timerInterval: any;

  constructor() {
    this.loadTasksFromStorage();
    this.startTimer();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(title: string, description?: string): void {
    const newTask: Task = {
      id: this.generateId(),
      title,
      description,
      isRunning: false,
      totalTime: 0,
      createdAt: new Date(),
      completed: false
    };

    const currentTasks = this.tasks.value;
    this.tasks.next([...currentTasks, newTask]);
    this.saveTasksToStorage();
  }

  startTask(taskId: string): void {
    const currentTasks = this.tasks.value;
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isRunning: true,
          startTime: new Date()
        };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
    this.saveTasksToStorage();
  }

  stopTask(taskId: string): void {
    const currentTasks = this.tasks.value;
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId && task.isRunning) {
        const endTime = new Date();
        const startTime = task.startTime || new Date();
        const elapsedSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        
        return {
          ...task,
          isRunning: false,
          totalTime: task.totalTime + elapsedSeconds,
          startTime: undefined
        };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
    this.saveTasksToStorage();
  }

  deleteTask(taskId: string): void {
    const currentTasks = this.tasks.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasks.next(updatedTasks);
    this.saveTasksToStorage();
  }

  toggleTaskComplete(taskId: string): void {
    const currentTasks = this.tasks.value;
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
    this.saveTasksToStorage();
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      const currentTasks = this.tasks.value;
      const updatedTasks = currentTasks.map(task => {
        if (task.isRunning && task.startTime) {
          const now = new Date();
          const elapsedSeconds = Math.floor((now.getTime() - task.startTime.getTime()) / 1000);
          return {
            ...task,
            totalTime: task.totalTime + elapsedSeconds,
            startTime: now
          };
        }
        return task;
      });
      this.tasks.next(updatedTasks);
    }, 1000);
  }

  private saveTasksToStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks.value));
  }

  private loadTasksFromStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      // Convert string dates back to Date objects
      const parsedTasks = tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        startTime: task.startTime ? new Date(task.startTime) : undefined
      }));
      this.tasks.next(parsedTasks);
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
