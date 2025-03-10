import express, { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  User,
} from "../models/user.model";
import { createI18nInstance } from "../i18n";
import { getAllTasks } from "../models/task.model";

const router = express.Router();
const userI18n = createI18nInstance("user");

// GET all users
router.get("/", (req: Request, res: Response) => {
  const users = getAllUsers().map((user) => enrichUserWithTasks(user));
  res.json(users);
});

// GET user by ID
router.get("/:id", (req: Request, res: Response) => {
  const user = getUserById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(enrichUserWithTasks(user));
});

// POST create new user
router.post("/", (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, role, status, bio } = req.body;

  const newUser = createUser({
    firstName,
    lastName,
    email,
    phone,
    role,
    status,
    bio,
    createdAt: new Date().toLocaleDateString(),
  });

  res.status(201).json(enrichUserWithTasks(newUser));
});

// PUT update user by ID
router.put("/:id", (req: Request, res: Response) => {
  const updatedUser = updateUser(Number(req.params.id), req.body);
  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(enrichUserWithTasks(updatedUser));
});

// DELETE user by ID
router.delete("/:id", (req: Request, res: Response) => {
  const user = deleteUser(Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(enrichUserWithTasks(user));
});

// GET user translations in given language
router.get("/translations/:lang", (req: Request, res: Response) => {
  const { lang } = req.params;

  if (!userI18n.getLocales().includes(lang)) {
    res.status(404).json({ message: "Language is not supported" });
    return;
  }

  userI18n.setLocale(lang);
  res.json(userI18n.getCatalog(lang));
});

function enrichUserWithTasks(user: User) {
  return {
    ...user,
    tasks: getAllTasks()
      .filter((t) => t.assignees.includes(user.id))
      .map((t) => t.id),
  };
}

export default router;
