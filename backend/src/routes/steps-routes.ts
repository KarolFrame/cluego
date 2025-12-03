import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createStep,
  updateStep,
  deleteStep,
} from "../controllers/steps-controller";

const router = Router();

router.post("/:id/steps", authMiddleware, createStep);
router.put("/steps/:id", authMiddleware, updateStep);
router.delete("/steps/:id", authMiddleware, deleteStep);

export default router;
