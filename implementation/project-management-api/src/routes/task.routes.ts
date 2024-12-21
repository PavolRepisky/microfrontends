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
  res.json(getAllTasks());
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

  const newTask = createTask({
    title,
    description,
    status,
    priority,
    tag,
    dueDate: dueDate,
    assignees: assignees || [],
  });

  res.status(201).json(newTask);
});

// PUT update task by ID
router.put("/:id", (req: Request, res: Response) => {
  const updatedTask = updateTask(Number(req.params.id), req.body);
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(updateTask);
});

// DELETE task by ID
router.delete("/:id", (req: Request, res: Response) => {
  const task = deleteTask(Number(req.params.id));
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

// GET task translations in given language
router.get("/translations/:lang", (req: Request, res: Response) => {
  const { lang } = req.params;

  if (!taskI18n.getLocales().includes(lang)) {
    res.status(404).json({ message: "Language is not supported" });
    return;
  }

  taskI18n.setLocale(lang);
  res.json(taskI18n.getCatalog(lang));
});

export default router;
