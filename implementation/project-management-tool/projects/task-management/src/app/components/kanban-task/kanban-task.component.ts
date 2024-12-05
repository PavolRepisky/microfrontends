import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../types/task.type';
import { TranslateModule } from '@ngx-translate/core';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-kanban-task',
  standalone: true,
  imports: [CommonModule, TranslateModule, CdkDrag, DragDropModule],
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
})
export class KanbanTaskComponent {
  @Input({ required: true }) task!: Task;

  @Output() onEdit = new EventEmitter<Task>();
  @Output() onView = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();

  get priorityColor(): string {
    const colors: Record<string, string> = {
      low: 'success',
      medium: 'warning',
      high: 'danger',
    };
    return this.task.priority ? colors[this.task.priority] : 'secondary';
  }

  get tagColor(): string {
    const colors: Record<string, string> = {
      feature: 'info',
      bug: 'danger',
      enhancement: 'success',
      research: 'secondary',
      test: 'warning',
    };
    return this.task.tag ? colors[this.task.tag] : 'secondary';
  }

  onDragStart(event: any) {
    const element = event.source.element.nativeElement;
    const rect = element.getBoundingClientRect();

    event.source._dragRef._pickupPositionInElement = {
      x: rect.width / 2,
      y: rect.height / 2,
    };
  }
}
