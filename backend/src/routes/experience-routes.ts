import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createExperience,
  getMyExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  publishExperience,
  getExperienceEditor,
} from "../controllers/experience-controller";

const router = Router();

router.post("/", authMiddleware, createExperience);
router.get("/", authMiddleware, getMyExperiences);
router.get("/:id", authMiddleware, getExperienceById);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);
router.patch("/:id/publish", authMiddleware, publishExperience);
router.get("/:id/editor", authMiddleware, getExperienceEditor);

export default router;
