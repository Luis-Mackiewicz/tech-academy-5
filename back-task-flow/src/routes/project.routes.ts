import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateToken, projectController.getAllProjects);
router.get("/:id", authenticateToken, projectController.getProjectById);
router.post("/", authenticateToken, projectController.createProject);
router.put("/:id", authenticateToken, projectController.updateProject);
router.delete("/:id", authenticateToken, projectController.deleteProject);

export default router;
