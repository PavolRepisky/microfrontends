import express, { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../models/task.model";
import { createI18nInstance } from "../i18n";
import { getAllUsers, User } from "../models/user.model";

const router = express.Router();
const taskI18n = createI18nInstance("task");

const getAssignees = (taskAssigneeIds: number[], users: User[]) => {
  return users
    .filter((user) => taskAssigneeIds.includes(user.id))
    .map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
};

// GET all tasks
router.get("/", (req: Request, res: Response) => {
  const tasks = getAllTasks();
  const users = getAllUsers();

  const tasksWithAssignees = tasks.map((task) => ({
    ...task,
    assignees: getAssignees(task.assignees, users),
  }));

  res.json(tasksWithAssignees);
});

// GET task by ID
router.get("/:id", (req: Request, res: Response) => {
  const task = getTaskById(Number(req.params.id));

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  const users = getAllUsers();
  const assignees = getAssignees(task.assignees, users);

  res.json({ ...task, assignees });
});

// POST create new task
router.post("/", (req: Request, res: Response) => {
  const { title, description, status, priority, tag, dueDate, assignees } =
    req.body;

  const newTask = createTask({
    title,
    description,
    status,
    priority,
    tag,
    dueDate: dueDate,
    assignees: assignees || [],
  });

  const users = getAllUsers();
  const mappedAssignees = getAssignees(newTask.assignees, users);

  res.status(201).json({...newTask, assignees: mappedAssignees});
});

// PUT update task by ID
router.patch("/:id", (req: Request, res: Response) => {
  const updatedTask = updateTask(Number(req.params.id), req.body);
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  const users = getAllUsers();
  const assignees = getAssignees(updatedTask.assignees, users);

  res.json({...updatedTask, assignees});
});

// DELETE task by ID
router.delete("/:id", (req: Request, res: Response) => {
  const success = deleteTask(Number(req.params.id));
  if (!success) {
    res.status(404).json({ message: "Task not found" });
  }
  res.status(204).end();
});

// GET task translations in given language
router.get("/translations/:lang", (req: Request, res: Response) => {
  const { lang } = req.params;

  if (!taskI18n.getLocales().includes(lang)) {
    res.status(404).json({ message: "Language not supported" });
    return;
  }

  taskI18n.setLocale(lang);
  res.json(taskI18n.getCatalog(lang));
});

export default router;
