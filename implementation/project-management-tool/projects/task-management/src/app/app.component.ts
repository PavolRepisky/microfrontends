import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Task } from './types/task.type';
import { TranslateModule } from '@ngx-translate/core';
import { KanbanComponent } from './components/kanban/kanban.component';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { TaskOffcanvasComponent } from './components/task-offcanvas/task-offcanvas.component';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { User } from './types/user.type';
import { NewTasksWidgetComponent } from './components/new-tasks-widget/new-tasks-widget.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'task-root',
  standalone: true,
  imports: [TranslateModule, KanbanComponent, NewTasksWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly userService = inject(UserService);
  private readonly modalService = inject(NgbModal);
  private readonly offcanvasService = inject(NgbOffcanvas);

  @Input() compact = true;

  tasks = signal<Task[]>([]);
  users = signal<User[]>([]);
  embedded = environment.embedded;

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

  openDeleteConfirmation(task: Task): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ConfirmationModalComponent,
      { centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.title = 'taskDeleteModal.title';
    modalRef.componentInstance.message = 'taskDeleteModal.message';
    modalRef.componentInstance.taskData = task;

    modalRef.closed.subscribe((result: boolean) => {
      if (result) this.deleteTask(task.id);
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
