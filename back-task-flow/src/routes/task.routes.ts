import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateToken, taskController.getAllTasks);
router.get("/:id", authenticateToken, taskController.getTaskById);
router.post("/", authenticateToken, taskController.createTask);
router.put("/:id", authenticateToken, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

export default router;
