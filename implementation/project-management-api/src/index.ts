import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import i18n from "./i18n";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(i18n.init);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
