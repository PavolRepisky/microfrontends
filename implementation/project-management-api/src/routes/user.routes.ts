import express, { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/user.model";
import { createI18nInstance } from "../i18n";

const router = express.Router();
const userI18n = createI18nInstance("user");

// GET all users
router.get("/", (req: Request, res: Response) => {
  const users = getAllUsers();
  res.json(users);
});

// GET user by ID
router.get("/:id", (req: Request, res: Response) => {
  const user = getUserById(Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
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
  });
  res.status(201).json(newUser);
});

// PUT update user by ID
router.patch("/:id", (req: Request, res: Response) => {
  const updatedUser = updateUser(Number(req.params.id), req.body);
  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(updatedUser);
});

// DELETE user by ID
router.delete("/:id", (req: Request, res: Response) => {
  const success = deleteUser(Number(req.params.id));
  if (!success) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(204).end();
});

// GET user translations in given language
router.get("/translations/:lang", (req: Request, res: Response) => {
  const { lang } = req.params;

  console.log(userI18n.getLocales());
  if (!userI18n.getLocales().includes(lang)) {
    res.status(404).json({ message: "Language not supported" });
    return;
  }

  userI18n.setLocale(lang);
  res.json(userI18n.getCatalog(lang));
});

export default router;
