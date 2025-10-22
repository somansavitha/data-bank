import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// ✅ Get all emails with related customer
export const getEmailDetails = async (req: Request, res: Response) => {
  try {
    const emails = await prisma.emailDetail.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(emails);
  } catch (error) {
    console.error("Error fetching email details:", error);
    res.status(500).json({ message: "Error fetching email details", error });
  }
};

// ✅ Get email by ID
export const getEmailDetailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = await prisma.emailDetail.findUnique({
      where: { id: Number(id) },
      include: { customer: true },
    });

    if (!email) return res.status(404).json({ message: "Email not found" });

    res.json(email);
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({ message: "Error fetching email" });
  }
};

// ✅ Add new email
export const addEmailDetail = async (req: Request, res: Response) => {
  try {
    const { imap, loginId, serviceProvider, password, customerId } = req.body;

    if (!loginId || !serviceProvider)
      return res.status(400).json({ message: "Login ID and Service Provider are required" });

    const email = await prisma.emailDetail.create({
      data: { imap, loginId, serviceProvider, password, customerId: Number(customerId) || null },
    });

    res.status(201).json(email);
  } catch (error) {
    console.error("Error adding email:", error);
    res.status(500).json({ message: "Error adding email" });
  }
};

// ✅ Update email
export const updateEmailDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imap, loginId, serviceProvider, password, customerId } = req.body;

    const existing = await prisma.emailDetail.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Email not found" });

    const updated = await prisma.emailDetail.update({
      where: { id: Number(id) },
      data: { imap, loginId, serviceProvider, password, customerId: Number(customerId) || null },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ message: "Error updating email" });
  }
};

// ✅ Delete email
export const deleteEmailDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.emailDetail.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Email not found" });

    await prisma.emailDetail.delete({ where: { id: Number(id) } });
    res.json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ message: "Error deleting email" });
  }
};
