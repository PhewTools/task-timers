import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskComponent } from './task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  template: `
    <div class="task-list-container">
      <div class="task-list-header">
        <h2>Your Tasks</h2>
        <div class="task-stats">
          <span class="stat-item">
            <span class="stat-label">Total:</span>
            <span class="stat-value">{{ tasks.length }}</span>
          </span>
          <span class="stat-item">
            <span class="stat-label">Running:</span>
            <span class="stat-value running">{{ runningTasksCount }}</span>
          </span>
          <span class="stat-item">
            <span class="stat-label">Completed:</span>
            <span class="stat-value completed">{{ completedTasksCount }}</span>
          </span>
        </div>
      </div>

      <div class="task-filters">
        <button 
          class="filter-btn" 
          [class.active]="currentFilter === 'all'"
          (click)="setFilter('all')"
        >
          All Tasks
        </button>
        <button 
          class="filter-btn" 
          [class.active]="currentFilter === 'active'"
          (click)="setFilter('active')"
        >
          Active
        </button>
        <button 
          class="filter-btn" 
          [class.active]="currentFilter === 'completed'"
          (click)="setFilter('completed')"
        >
          Completed
        </button>
      </div>

      <div class="task-list" *ngIf="filteredTasks.length > 0; else emptyState">
        <app-task 
          *ngFor="let task of filteredTasks; trackBy: trackByTaskId"
          [task]="task"
        ></app-task>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No tasks yet</h3>
          <p *ngIf="currentFilter === 'all'">
            Start by adding your first task above!
          </p>
          <p *ngIf="currentFilter === 'active'">
            No active tasks. Add a new task to get started!
          </p>
          <p *ngIf="currentFilter === 'completed'">
            No completed tasks yet. Complete some tasks to see them here!
          </p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .task-list-container {
      margin-top: 20px;
    }

    .task-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #f0f0f0;
    }

    .task-list-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .task-stats {
      display: flex;
      gap: 16px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }

    .stat-value {
      font-weight: bold;
      color: #333;
      background-color: #f8f9fa;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.9rem;
    }

    .stat-value.running {
      background-color: #d4edda;
      color: #155724;
    }

    .stat-value.completed {
      background-color: #d1ecf1;
      color: #0c5460;
    }

    .task-filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background-color: white;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .filter-btn:hover {
      background-color: #f8f9fa;
      border-color: #007bff;
    }

    .filter-btn.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 2px dashed #dee2e6;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #666;
      font-size: 1.2rem;
    }

    .empty-state p {
      margin: 0;
      color: #999;
      font-size: 0.95rem;
    }

    @media (max-width: 600px) {
      .task-list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .task-stats {
        gap: 12px;
      }

      .task-filters {
        flex-wrap: wrap;
      }

      .filter-btn {
        flex: 1;
        min-width: 80px;
      }
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  get filteredTasks(): Task[] {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  get runningTasksCount(): number {
    return this.tasks.filter(task => task.isRunning).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.currentFilter = filter;
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
