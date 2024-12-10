export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  assignees: number[];
  priority?: string;
  tag?: string;
  dueDate?: string;
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
    dueDate: "20-10-2024",
    assignees: [1, 2, 3],
  },
  {
    id: 2,
    title: "Autocompletion Bug Fix",
    description: "Fix the autocompletion in the admin page",
    status: "backlog",
    priority: "high",
    tag: "bug",
    assignees: [1],
  },
  {
    id: 3,
    title: "Landing Page Redesign",
    description: "Redesign the landing page to improve user experience.",
    status: "inProgress",
    priority: "low",
    tag: "enhancement",
    dueDate: "01-12-2024",
    assignees: [1, 2],
  },
  {
    id: 4,
    title: "A/B Testing Setup",
    description:
      "Set up A/B tests to measure the effectiveness of two different landing pages.",
    status: "inProgress",
    priority: "medium",
    tag: "feature",
    dueDate: "05-11-2024",
    assignees: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 5,
    title: "Cross-Browser UI Testing",
    description:
      "Test the app across different browsers and versions to ensure consistent behavior.",
    status: "toReview",
    priority: "high",
    tag: "test",
    dueDate: "15-10-2024",
    assignees: [7, 8],
  },
  {
    id: 6,
    title: "Event Logging",
    description: "Add detailed logging for key events to make debugging easier",
    status: "toReview",
    priority: "medium",
    tag: "feature",
    dueDate: "02-11-2024",
    assignees: [3, 7, 8, 9, 10],
  },
  {
    id: 7,
    title: "Competitor Analysis",
    description:
      "Research competitor features and summarize the findings for the team.",
    status: "done",
    priority: "high",
    tag: "research",
    dueDate: "04-09-2024",
    assignees: [4],
  },
  {
    id: 8,
    title: "Internationalization",
    description: "Enable language localization support for multiple regions",
    status: "done",
    priority: "high",
    tag: "feature",
    dueDate: "17-08-2024",
    assignees: [2, 7],
  },
  {
    id: 9,
    title: "OAuth Integration",
    description: "Add OAuth support for login via Google, Facebook, or GitHub.",
    status: "done",
    priority: "high",
    tag: "feature",
    dueDate: "22-07-2024",
    assignees: [1, 2, 10, 8],
  },
];

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

export const createTask = (task: Omit<Task, "id">): Task => {
  const newTask = { id: tasks.length + 1, ...task };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  updatedData: Partial<Task>
): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return null;
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
  return tasks[taskIndex];
};

export const deleteTask = (id: number): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < initialLength;
};
