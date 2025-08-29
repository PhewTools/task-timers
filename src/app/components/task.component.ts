import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
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
