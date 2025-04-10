import { Router } from "express";
import * as membershipController from "../controllers/membership.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Rotas protegidas pelo middleware de autenticação
router.get("/", authenticateToken, membershipController.getAllMemberships);
router.get("/:id", authenticateToken, membershipController.getMembershipById);
router.post("/", authenticateToken, membershipController.createMembership);
router.put("/:id", authenticateToken, membershipController.updateMembership);
router.delete("/:id", authenticateToken, membershipController.deleteMembership);

export default router;
