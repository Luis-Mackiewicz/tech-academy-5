import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import membershipRoutes from "./routes/membership.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/memberships", membershipRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

export default app;
