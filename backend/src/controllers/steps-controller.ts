import { Request, Response } from "express";
import prisma from "prisma";

export const createStep = async (req: Request, res: Response) => {
  try {
    const experienceId = Number(req.params.id);
    const userId = req.user!.id;

    const exp = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!exp) return res.status(404).json({ message: "Experience not found" });
    if (exp.ownerId !== userId)
      return res.status(403).json({ message: "Not authorized" });

    const { title, clueText, type, answer, hint, timeLimit, order } = req.body;

    const step = await prisma.step.create({
      data: {
        title,
        clueText,
        type,
        answer,
        hint,
        timeLimit,
        order,
        experienceId,
      },
    });

    res.status(201).json({ step });
  } catch (error) {
    res.status(500).json({ message: "Error creating step" });
  }
};

export const updateStep = async (req: Request, res: Response) => {
  try {
    const stepId = Number(req.params.id);

    const step = await prisma.step.findUnique({
      where: { id: stepId },
      include: { experience: true },
    });

    if (!step) return res.status(404).json({ message: "Step not found" });

    if (step.experience.ownerId !== req.user!.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await prisma.step.update({
      where: { id: stepId },
      data: req.body,
    });

    res.json({ step: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating step" });
  }
};

export const deleteStep = async (req: Request, res: Response) => {
  try {
    const stepId = Number(req.params.id);

    const step = await prisma.step.findUnique({
      where: { id: stepId },
      include: { experience: true },
    });

    if (!step) return res.status(404).json({ message: "Step not found" });

    if (step.experience.ownerId !== req.user!.id)
      return res.status(403).json({ message: "Not authorized" });

    await prisma.step.delete({ where: { id: stepId } });

    res.json({ message: "Step deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting step" });
  }
};
