export type Task = {
  id: number;
  title: string;
  status: string;
  assignees: number[];
  description?: string;
  priority?: string;
  tag?: string;
  dueDate?: string;
  createdAt: string;
};

let tasks: Task[] = [
  {
    id: 1,
    title: "Darkmode Theme",
    description:
      "Develop a dark mode theme for our application to improve user experience in low-light environments. This includes selecting a dark color palette, ensuring high contrast for readability, designing user-friendly icons, and implementing a toggle feature for easy switching between light and dark modes.",
    status: "backlog",
    priority: "medium",
    tag: "feature",
    dueDate: getDaysAgoDate(-5),
    assignees: [1, 2, 3],
    createdAt: getDaysAgoDate(0),
  },
  {
    id: 2,
    title: "Autocompletion Bug Fix",
    description: "Fix the autocompletion in the admin page",
    status: "backlog",
    priority: "high",
    tag: "bug",
    assignees: [1],
    createdAt: getDaysAgoDate(20),
  },
  {
    id: 3,
    title: "Landing Page Redesign",
    description: "Redesign the landing page to improve user experience.",
    status: "inProgress",
    priority: "low",
    tag: "enhancement",
    dueDate: getDaysAgoDate(-20),
    assignees: [1, 2],
    createdAt: getDaysAgoDate(10),
  },
  {
    id: 4,
    title: "A/B Testing Setup",
    description:
      "Set up A/B tests to measure the effectiveness of two different landing pages.",
    status: "inProgress",
    priority: "medium",
    tag: "feature",
    dueDate: getDaysAgoDate(-5),
    assignees: [1, 2, 3, 4, 5, 6],
    createdAt: getDaysAgoDate(2),
  },
  {
    id: 5,
    title: "Cross-Browser UI Testing",
    description:
      "Test the app across different browsers and versions to ensure consistent behavior.",
    status: "toReview",
    priority: "high",
    tag: "test",
    dueDate: getDaysAgoDate(-5),
    assignees: [7, 8],
    createdAt: getDaysAgoDate(4),
  },
  {
    id: 6,
    title: "Event Logging",
    description: "Add detailed logging for key events to make debugging easier",
    status: "toReview",
    priority: "medium",
    tag: "feature",
    dueDate: getDaysAgoDate(0),
    assignees: [3, 7, 8, 9, 10],
    createdAt: getDaysAgoDate(14),
  },
  {
    id: 7,
    title: "Competitor Analysis",
    description:
      "Research competitor features and summarize the findings for the team.",
    status: "done",
    priority: "high",
    tag: "research",
    dueDate: getDaysAgoDate(2),
    assignees: [4],
    createdAt: getDaysAgoDate(64),
  },
  {
    id: 8,
    title: "Internationalization",
    description: "Enable language localization support for multiple regions",
    status: "done",
    priority: "high",
    tag: "feature",
    dueDate: getDaysAgoDate(-31),
    assignees: [2, 7],
    createdAt: getDaysAgoDate(5),
  },
  {
    id: 9,
    title: "OAuth Integration",
    description: "Add OAuth support for login via Google, Facebook, or GitHub.",
    status: "done",
    priority: "high",
    tag: "feature",
    dueDate: getDaysAgoDate(-10),
    assignees: [1, 2, 10, 8],
    createdAt: getDaysAgoDate(23),
  },
];

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | null =>
  tasks.find((task) => task.id === id) || null;

export const createTask = (task: Omit<Task, "id">): Task => {
  const newTask = { ...task, id: tasks.length + 1 };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  updatedData: Partial<Task>
): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
  return tasks[taskIndex];
};

export const deleteTask = (id: number): Task | null => {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    tasks = tasks.filter((task) => task.id !== id);
    return task;
  }
  return null;
};

function getDaysAgoDate(daysAgo: number): string {
  const now = new Date();
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString();
}
