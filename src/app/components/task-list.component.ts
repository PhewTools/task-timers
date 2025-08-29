import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskComponent } from './task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: 'task-list.component.html',
  styleUrl: 'task-list.component.css'
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
