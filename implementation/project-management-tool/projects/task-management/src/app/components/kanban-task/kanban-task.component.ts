import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { priorities, tags, Task } from '../../types/task.type';
import { User } from '../../types/user.type';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'task-kanban-task',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CdkDrag,
    DragDropModule,
    NgbDropdownModule,
  ],
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
})
export class KanbanTaskComponent {
  @Input({ required: true }) task!: Task;
  @Input() users: User[] = [];

  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onViewTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {}

  get priorityColor(): string {
    return (
      priorities.find((p) => p.name == this.task.priority)?.color || 'secondary'
    );
  }

  get tagColor(): string {
    return tags.find((tag) => tag.name == this.task.tag)?.color || 'secondary';
  }

  get assignedUsers(): User[] {
    const assignees: User[] = [];
    for (let assigneeId of this.task.assignees) {
      const assignee = this.users.find((u) => u.id === assigneeId);
      if (assignee) assignees.push(assignee);
    }
    return assignees;
  }

  onDragStart(event: any) {
    const element = event.source.element.nativeElement;
    const rect = element.getBoundingClientRect();

    event.source._dragRef._pickupPositionInElement = {
      x: rect.width / 2,
      y: rect.height / 2,
    };
  }

  openDeleteConfirmation(taskId: number): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ConfirmationModalComponent,
      { centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.title = 'delete.title';
    modalRef.componentInstance.message = 'delete.message';

    modalRef.closed.subscribe((result: boolean) => {
      if (result) this.onDeleteTask.emit(taskId);
    });
  }
}
