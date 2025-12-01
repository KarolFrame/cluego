import { Router } from "express";
import { upload } from "../middleware/upload";
import cloudinary from "../services/cloudinary";
import { prisma } from "../prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req: AuthRequest, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const uploaded = await cloudinary.uploader.upload_stream(
        {
          folder: "cluego/avatars",
          resource_type: "image",
        },
        async (error, result) => {
          if (error || !result) {
            return res.status(500).json({ message: "Upload failed" });
          }
          const user = await prisma.user.update({
            where: { id: req.userId },
            data: { avatarUrl: result.secure_url },
          });

          return res.json({
            avatarUrl: user.avatarUrl,
          });
        }
      );

      uploaded.end(req.file.buffer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/update", authMiddleware, async (req: AuthRequest, res) => {
  const { name, bio, location } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name: name ?? undefined,
        bio: bio ?? undefined,
        location: location ?? undefined,
      },
    });

    return res.json({
      message: "Profile updated",
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        avatarUrl: updated.avatarUrl,
        bio: updated.bio,
        location: updated.location,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not update profile" });
  }
});
export default router;
