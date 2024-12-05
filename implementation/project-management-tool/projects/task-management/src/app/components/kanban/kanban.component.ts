import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { Task } from '../../types/task.type';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { DropEvent, KanbanColumn, KanbanStatus } from '../../types/kanban.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'task-kanban',
  standalone: true,
  imports: [KanbanColumnComponent, DragDropModule, TranslateModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  @Input({ required: true }) set tasks(value: Task[]) {
    this.tasksSignal.set(value);
  }

  @Output() onCreate = new EventEmitter<Partial<Task>>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onView = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onStatusChange = new EventEmitter<DropEvent>();

  private readonly tasksSignal = signal<Task[]>([]);

  readonly columns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'task.status.backlog',
      icon: 'bi-collection-fill',
      color: 'secondary',
    },
    {
      id: 'inProgress',
      title: 'task.status.inProgress',
      icon: 'bi-hourglass-split',
      color: 'secondary',
    },
    {
      id: 'toReview',
      title: 'task.status.toReview',
      icon: 'bi-eye-fill',
      color: 'secondary',
    },
    {
      id: 'done',
      title: 'task.status.done',
      icon: 'bi-check-circle-fill',
      color: 'secondary',
    },
  ];

  readonly tasksByStatus = computed(() => {
    const grouped: Record<KanbanStatus, Task[]> = {
      backlog: [],
      inProgress: [],
      toReview: [],
      done: [],
    };

    for (const task of this.tasksSignal()) {
      if (task.status in grouped) {
        grouped[task.status as KanbanStatus].push(task);
      }
    }

    return grouped;
  });

  onDrop(event: CdkDragDrop<Task[]>) {
    const { container, previousContainer, currentIndex, previousIndex } = event;
    const newStatus = container.id as KanbanStatus;
    const previousStatus = previousContainer.id as KanbanStatus;

    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
      );

      const task = container.data[currentIndex];

      this.onStatusChange.emit({
        task,
        previousStatus,
        newStatus,
        newIndex: currentIndex,
      });
    }
  }

  getColumnTasks(status: KanbanStatus): Task[] {
    return this.tasksByStatus()[status];
  }
}
