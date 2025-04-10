import { Router } from "express";
import projectRoutes from "./project.routes";
import taskRoutes from "./task.routes";
import membershipRoutes from "./membership.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/memberships", membershipRoutes);
router.use("/auth", authRoutes);

export default router;
