import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../types/task.type';
import { KanbanColumn } from '../../types/kanban.type';
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

  @Output() onCreateTask = new EventEmitter<Partial<Task>>();
  @Output() onViewTask = new EventEmitter<Task>();
  @Output() onEditTask = new EventEmitter<Task>();
  @Output() onDeleteTask = new EventEmitter<number>();
  @Output() onDropTask = new EventEmitter<CdkDragDrop<Task[]>>();

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    this.onDropTask.emit(event);
  }
}
