export interface Task {
  id: number;
  title: string;
  status: string;
  priority?: string;
  tag?: string;
  dueDate?: string;
  assignees: Assignee[];
}

interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
}
