import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task.component';
import { TaskListComponent } from './components/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskListComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">⏱️ Task Timers</h1>
          <p class="app-subtitle">Track your time, boost your productivity</p>
        </div>
      </header>

      <main class="app-main">
        <div class="container">
          <app-add-task></app-add-task>
          <app-task-list></app-task-list>
        </div>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Task Timers. Built with Angular 19.</p>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    .header-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .app-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .app-subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .app-main {
      flex: 1;
      padding: 2rem 0;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .app-footer {
      background-color: #343a40;
      color: white;
      text-align: center;
      padding: 1rem 0;
      margin-top: auto;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .app-title {
        font-size: 2rem;
      }

      .app-subtitle {
        font-size: 1rem;
      }

      .app-main {
        padding: 1rem 0;
      }

      .container {
        padding: 0 15px;
      }
    }

    @media (max-width: 480px) {
      .app-title {
        font-size: 1.75rem;
      }

      .app-header {
        padding: 1.5rem 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'Task Timers';
}
