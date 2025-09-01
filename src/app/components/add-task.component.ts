import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskTitle: string = '';
  taskDescription: string = '';
  isCollapsed: boolean = true;

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
