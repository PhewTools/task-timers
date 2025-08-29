import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="add-task-container">
      <div class="add-task-header" (click)="toggleCollapse()">
        <h2>Add New Task</h2>
        <button class="collapse-btn" [class.collapsed]="isCollapsed">
          {{ isCollapsed ? '➕' : '➖' }}
        </button>
      </div>
      
      <div class="add-task-content" [class.collapsed]="isCollapsed">
        <form (ngSubmit)="addTask()" #taskForm="ngForm">
          <div class="form-group">
            <label for="taskTitle">Task Title *</label>
            <input 
              type="text" 
              id="taskTitle"
              name="taskTitle"
              [(ngModel)]="taskTitle"
              required
              placeholder="Enter task title..."
              class="form-control"
            >
          </div>
          
          <div class="form-group">
            <label for="taskDescription">Description (optional)</label>
            <textarea 
              id="taskDescription"
              name="taskDescription"
              [(ngModel)]="taskDescription"
              placeholder="Enter task description..."
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="!taskTitle.trim()"
            >
              ➕ Add Task
            </button>
            <button 
              type="button" 
              class="btn btn-secondary"
              (click)="clearForm()"
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .add-task-container {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .add-task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .add-task-header:hover {
      background-color: #e9ecef;
    }

    .add-task-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .collapse-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease;
      color: #666;
    }

    .collapse-btn:hover {
      background-color: #dee2e6;
      color: #333;
    }

    .collapse-btn.collapsed {
      transform: rotate(0deg);
    }

    .add-task-content {
      padding: 20px;
      transition: all 0.3s ease;
      max-height: 500px;
      opacity: 1;
      overflow: hidden;
    }

    .add-task-content.collapsed {
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
      opacity: 0;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .form-control::placeholder {
      color: #999;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 80px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
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

    @media (max-width: 600px) {
      .form-actions {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }

      .add-task-header {
        padding: 12px 16px;
      }

      .add-task-content {
        padding: 16px;
      }
    }
  `]
})
export class AddTaskComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  isCollapsed: boolean = false;

  constructor(private taskService: TaskService) {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  addTask(): void {
    if (this.taskTitle.trim()) {
      this.taskService.addTask(this.taskTitle.trim(), this.taskDescription.trim());
      this.clearForm();
    }
  }

  clearForm(): void {
    this.taskTitle = '';
    this.taskDescription = '';
  }
}
