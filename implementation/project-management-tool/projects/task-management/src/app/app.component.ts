import { Component, Input, OnInit, signal } from '@angular/core';
import { Task } from './types/task.type';
import { TranslateModule } from '@ngx-translate/core';
import { KanbanComponent } from './components/kanban/kanban.component';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskOffcanvasComponent } from './components/task-offcanvas/task-offcanvas.component';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { User } from './types/user.type';
import { TaskWidgetComponent } from './components/task-widget/task-widget.component';
import { environment } from '../environments/environment';
import { TaskChartComponent } from './components/task-chart/task-chart.component';

@Component({
  selector: 'task-root',
  standalone: true,
  imports: [
    TranslateModule,
    KanbanComponent,
    TaskWidgetComponent,
    TaskChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @Input() compact: boolean = false;

  tasks = signal<Task[]>([]);
  users = signal<User[]>([]);
  embedded = environment.embedded;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }

  openTaskOffcanvas(task?: Partial<Task>): void {
    const offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(
      TaskOffcanvasComponent,
      { position: 'end' }
    );

    offcanvasRef.componentInstance.setUsers(this.users());
    if (task) offcanvasRef.componentInstance.setTask(task);

    offcanvasRef.closed.subscribe((formData?: Task) => {
      if (!formData) return;

      formData.id ? this.updateTask(formData) : this.createTask(formData);

      offcanvasRef.dismiss();
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks.set(tasks);
    });
  }

  createTask(task: Omit<Task, 'id'>): void {
    this.taskService.createTask(task).subscribe(() => this.getTasks());
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(() => this.getTasks());
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => this.getTasks());
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .subscribe((users: User[]) => this.users.set(users));
  }
}
