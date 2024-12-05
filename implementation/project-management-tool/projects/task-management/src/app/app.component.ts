import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'task-root',
  standalone: true,
  imports: [TranslateModule, KanbanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly modalService = inject(NgbModal);
  private readonly offcanvasService = inject(NgbOffcanvas);
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  tasks = signal<Task[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.taskService
      .all()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tasks) => {
          this.tasks.set(tasks);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading tasks:', error);
          this.error.set('Failed to load tasks. Please try again.');
        },
      });
  }

  openTaskOffcanvas(task?: Partial<Task>): void {
    const offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(
      TaskOffcanvasComponent,
      { position: 'end' }
    );

    if (task) {
      offcanvasRef.componentInstance.setTask(task);
    }

    offcanvasRef.closed.subscribe((formData?: Task) => {
      if (formData) {
        const offcanvasInstance = offcanvasRef.componentInstance;
        offcanvasInstance.setSubmitting(true);

        const request = formData.id
          ? this.taskService.update(formData)
          : this.taskService.create(formData);

        request
          .pipe(
            finalize(() => {
              offcanvasInstance.setSubmitting(false);
            })
          )
          .subscribe({
            next: () => {
              this.loadTasks();
              offcanvasRef.dismiss();
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error saving task:', error);

              if (!offcanvasRef.componentInstance) {
                this.openTaskOffcanvas(formData);
              }
              const errorMessage =
                error?.error?.message ||
                'Failed to save task. Please try again.';
              this.error.set(errorMessage);
            },
          });
      }
    });
  }

  openDeleteConfirmation(task: Task): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ConfirmationModalComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );

    modalRef.componentInstance.title = 'taskDeleteModal.title';
    modalRef.componentInstance.message = 'taskDeleteModal.message';
    modalRef.componentInstance.taskData = task;

    modalRef.closed.subscribe((result: boolean) => {
      if (result) {
        this.isLoading.set(true);
        this.error.set(null);
        this.deleteTask(task.id);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.taskService
      .delete(taskId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
        catchError((error: HttpErrorResponse) => {
          console.error('Error deleting task:', error);
          this.error.set('Failed to delete task. Please try again.');
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.loadTasks();
      });
  }
}
