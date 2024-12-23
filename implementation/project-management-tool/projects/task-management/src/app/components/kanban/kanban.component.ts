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
import { KanbanColumn, KanbanStatus } from '../../types/kanban.type';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../types/user.type';

@Component({
  selector: 'task-kanban',
  standalone: true,
  imports: [KanbanColumnComponent, DragDropModule, TranslateModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  private allTasks = signal<Task[]>([]);

  @Input({ required: true }) set tasks(value: Task[]) {
    this.allTasks.set(value);
  }
  @Input() users: User[] = [];

  @Output() onCreate = new EventEmitter<Partial<Task>>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onView = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onDrop = new EventEmitter<Task>();

  columns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'task.status.backlog',
      icon: 'bi-collection-fill',
    },
    {
      id: 'inProgress',
      title: 'task.status.inProgress',
      icon: 'bi-hourglass-split',
    },
    {
      id: 'toReview',
      title: 'task.status.toReview',
      icon: 'bi-eye-fill',
    },
    {
      id: 'done',
      title: 'task.status.done',
      icon: 'bi-check-circle-fill',
    },
  ];

  tasksByStatus = computed(() => {
    const grouped: Record<KanbanStatus, Task[]> = {
      backlog: [],
      inProgress: [],
      toReview: [],
      done: [],
    };

    for (const task of this.allTasks()) {
      if (task.status in grouped) {
        grouped[task.status as KanbanStatus].push(task);
      }
    }

    return grouped;
  });

  onTaskDrop(event: CdkDragDrop<Task[]>) {
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

      task.status = newStatus;

      this.onDrop.emit(task);

      // this.onStatusChange.emit({
      //   task,
      //   previousStatus,
      //   newStatus,
      //   newIndex: currentIndex,
      // });
    }
  }

  getColumnTasks(status: KanbanStatus): Task[] {
    return this.tasksByStatus()[status];
  }
}
