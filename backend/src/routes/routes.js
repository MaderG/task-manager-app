import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const publicRouter = Router();
const privateRouter = Router();

privateRouter.use(authMiddleware);

export { publicRouter, privateRouter };
