export interface Task {
  id: number;
  title: string;
  status: string;
  assignees: number[];
  description?: string;
  priority?: string;
  tag?: string;
  dueDate?: string;
  createdAt: string;
}

export interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
}

export const tags = [
  { name: 'feature', color: 'primary' },
  { name: 'bug', color: 'danger' },
  { name: 'test', color: 'warning' },
  { name: 'research', color: 'secondary' },
  { name: 'enhancement', color: 'success' },
];

export const priorities = [
  { name: 'low', color: 'success' },
  { name: 'medium', color: 'warning' },
  { name: 'high', color: 'danger' },
];

export const statuses = [
  { name: 'backlog', color: 'secondary' },
  { name: 'inProgress', color: 'warning' },
  { name: 'toReview', color: 'primary' },
  { name: 'done', color: 'success' },
];
