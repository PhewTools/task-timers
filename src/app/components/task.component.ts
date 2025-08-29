import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-card" [class.completed]="task.completed" [class.running]="task.isRunning">
      <div class="task-header">
        <div class="task-info">
          <h3 class="task-title" [class.completed-text]="task.completed">
            {{ task.title }}
          </h3>
          <p class="task-description" *ngIf="task.description">
            {{ task.description }}
          </p>
        </div>
        <div class="task-actions">
          <button 
            class="btn btn-primary" 
            (click)="toggleTimer()"
            [disabled]="task.completed"
          >
            {{ task.isRunning ? '⏸️ Stop' : '▶️ Start' }}
          </button>
          <button 
            class="btn btn-secondary" 
            (click)="toggleComplete()"
          >
            {{ task.completed ? '↩️ Undo' : '✅ Complete' }}
          </button>
          <button 
            class="btn btn-danger" 
            (click)="deleteTask()"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      <div class="task-timer">
        <div class="timer-display">
          <span class="timer-label">Total Time:</span>
          <span class="timer-value">{{ taskService.formatTime(task.totalTime) }}</span>
        </div>
        <div class="timer-status" *ngIf="task.isRunning">
          <span class="running-indicator">⏱️ Running...</span>
        </div>
      </div>
      
      <div class="task-meta">
        <small>Created: {{ task.createdAt | date:'short' }}</small>
      </div>
    </div>
  `,
  styles: [`
    .task-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .task-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .task-card.running {
      border-color: #4CAF50;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }

    .task-card.completed {
      opacity: 0.7;
      background-color: #f8f9fa;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .task-info {
      flex: 1;
    }

    .task-title {
      margin: 0 0 4px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }

    .task-title.completed-text {
      text-decoration: line-through;
      color: #666;
    }

    .task-description {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .task-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .task-timer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .timer-display {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .timer-label {
      font-weight: 500;
      color: #666;
    }

    .timer-value {
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      background-color: #f8f9fa;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .timer-status {
      display: flex;
      align-items: center;
    }

    .running-indicator {
      color: #4CAF50;
      font-weight: 500;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .task-meta {
      text-align: right;
    }

    .task-meta small {
      color: #999;
      font-size: 0.8rem;
    }

    @media (max-width: 600px) {
      .task-header {
        flex-direction: column;
        gap: 12px;
      }

      .task-actions {
        justify-content: flex-start;
      }

      .task-timer {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(public taskService: TaskService) {}

  toggleTimer(): void {
    if (this.task.isRunning) {
      this.taskService.stopTask(this.task.id);
    } else {
      this.taskService.startTask(this.task.id);
    }
  }

  toggleComplete(): void {
    this.taskService.toggleTaskComplete(this.task.id);
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id);
  }
}
