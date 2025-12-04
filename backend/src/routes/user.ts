import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
        location: true,
        experiences: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            isPublished: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

export default router;
