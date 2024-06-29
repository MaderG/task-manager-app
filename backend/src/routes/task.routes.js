import TaskController from "../controllers/task.controller.js";
import { privateRouter } from "./routes.js";

const taskController = new TaskController();

privateRouter.post("/api/tasks", (req, res) => taskController.create(req, res));

privateRouter.get("/api/tasks", (req, res) => taskController.index(req, res));

privateRouter.get('/api/tasks/history', (req, res) => taskController.history(req, res));

privateRouter.get("/api/tasks/:id", (req, res) =>
  taskController.show(req, res)
);

privateRouter.patch("/api/tasks/:id", (req, res) =>
  taskController.update(req, res)
);

privateRouter.delete("/api/tasks/:id", (req, res) =>
  taskController.delete(req, res)
);