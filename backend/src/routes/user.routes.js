import UserController from "../controllers/user.controller.js";
import { privateRouter, publicRouter } from "./routes.js";

const userController = new UserController();

publicRouter.post("/api/register", (req, res) =>
  userController.create(req, res)
);

publicRouter.post("/api/auth", (req, res) => userController.auth(req, res));

publicRouter.post("/api/forgot-password", (req, res) =>
  userController.forgotPassword(req, res)
);

publicRouter.post("/api/reset-password", (req, res) =>
  userController.resetPassword(req, res)
);

privateRouter.get("/api/users", (req, res) => userController.index(req, res));

privateRouter.get("/api/users/:id", (req, res) =>
  userController.getOne(req, res)
);

privateRouter.patch("/api/users/:id", (req, res) =>
  userController.update(req, res)
);

privateRouter.delete("/api/users/:id", (req, res) =>
  userController.delete(req, res)
);

privateRouter.post('/api/profile/change-password', (req, res) => userController.changePassword(req, res))
