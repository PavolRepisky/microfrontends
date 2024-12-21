import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../types/task.type';
import { KanbanColumn, KanbanStatus } from '../../types/kanban.type';
import { KanbanTaskComponent } from '../kanban-task/kanban-task.component';
import { User } from '../../types/user.type';

@Component({
  selector: 'task-kanban-column',
  standalone: true,
  imports: [CommonModule, TranslateModule, DragDropModule, KanbanTaskComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
})
export class KanbanColumnComponent {
  @Input({ required: true }) column!: KanbanColumn;
  @Input() tasks: Task[] = [];
  @Input() users: User[] = [];

  @Output() onCreate = new EventEmitter<Partial<Task>>();
  @Output() onView = new EventEmitter<Task>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onDrop = new EventEmitter<CdkDragDrop<Task[]>>();

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    this.onDrop.emit(event);
  }
}
