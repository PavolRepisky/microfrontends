import express, { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../models/task.model";
import { createI18nInstance } from "../i18n";

const router = express.Router();
const taskI18n = createI18nInstance("task");

// GET all tasks
router.get("/", (req: Request, res: Response) => {
  const tasks = getAllTasks();
  res.json(tasks);
});

// GET task by ID
router.get("/:id", (req: Request, res: Response) => {
  const task = getTaskById(Number(req.params.id));
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(task);
});

// POST create new task
router.post("/", (req: Request, res: Response) => {
  const { title, description, status, priority, tag, dueDate, assignees } =
    req.body;

  const newUser = createTask({
    title,
    description,
    status,
    priority,
    tag,
    dueDate,
    assignees,
  });
  res.status(201).json(newUser);
});

// PUT update task by ID
router.patch("/:id", (req: Request, res: Response) => {
  const updatedTask = updateTask(Number(req.params.id), req.body);
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(updatedTask);
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
