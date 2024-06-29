import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { privateRouter, publicRouter } from "./routes/routes.js";
import './routes/user.routes.js';
import './routes/task.routes.js';

import fallbackMiddleware from "./middlewares/fallback.middleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(publicRouter);
app.use(privateRouter);
app.use(fallbackMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
