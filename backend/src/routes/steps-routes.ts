import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createStep,
  updateStep,
  deleteStep,
  addStep,
} from "../controllers/steps-controller";

const router = Router();

router.post("/", authMiddleware, addStep);
router.put("/:id", authMiddleware, updateStep);
router.delete("/:id", authMiddleware, deleteStep);

export default router;
