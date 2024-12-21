export type KanbanStatus = 'backlog' | 'inProgress' | 'toReview' | 'done';

export interface KanbanColumn {
  id: KanbanStatus;
  title: string;
  icon: string;
  color: string;
}
