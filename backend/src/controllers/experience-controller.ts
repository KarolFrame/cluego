import { Request, Response } from "express";
import prisma from "../prisma";

export const createExperience = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const { title, description, difficulty, mode, imageUrl } = req.body;

    if (!title || !mode) {
      return res.status(400).json({ message: "Title and mode are required." });
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        difficulty,
        mode,
        imageUrl,
        ownerId: userId,
      },
    });

    res.status(201).json({ experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating experience" });
  }
};

export const getMyExperiences = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const experiences = await prisma.experience.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ experiences });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching experiences" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      include: { steps: true },
    });

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.ownerId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ experience });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching experience" });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);
    const userId = req.user!.id;

    const existing = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (existing.ownerId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await prisma.experience.update({
      where: { id: experienceId },
      data: req.body,
    });

    res.json({ experience: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error updating experience" });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);

    const existing = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (existing.ownerId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.experience.delete({
      where: { id: experienceId },
    });

    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting experience" });
  }
};

export const publishExperience = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);
    const userId = req.user!.id;

    const exp = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!exp) return res.status(404).json({ message: "Experience not found" });

    if (exp.ownerId !== userId)
      return res.status(403).json({ message: "Not authorized" });
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const published = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        isPublished: true,
        accessCode: code,
      },
    });

    res.json({ experience: published });
  } catch (error) {
    res.status(500).json({ message: "Server error publishing experience" });
  }
};

export const getExperienceEditor = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      include: { steps: true },
    });

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.ownerId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ experience });
  } catch (error) {
    res.status(500).json({ message: "Server error loading editor data" });
  }
};
