import { Task } from './task.type';

export type KanbanStatus = 'backlog' | 'inProgress' | 'toReview' | 'done';

export interface KanbanColumn {
  id: KanbanStatus;
  title: string;
  icon: string;
  color: string;
}

export interface DropEvent {
  task: Task;
  previousStatus: KanbanStatus;
  newStatus: KanbanStatus;
  newIndex: number;
}
