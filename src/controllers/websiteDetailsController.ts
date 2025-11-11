import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// ✅ Get all website details
export const getWebsiteDetails = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;

    let websites;
    let total;
    let totalPages = 1;

    // ✅ If both page and limit are provided → apply pagination
    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      [websites, total] = await Promise.all([
        prisma.websiteDetail.findMany({
          include: {
            customer: {
              select: { id: true, customerName: true }, // ✅ fetch only relevant customer info
            },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take,
        }),
        prisma.websiteDetail.count(),
      ]);

      totalPages = Math.ceil(total / take);
    } else {
      // ✅ Otherwise → return all website details (no pagination)
      [websites, total] = await Promise.all([
        prisma.websiteDetail.findMany({
          include: {
            customer: {
              select: { id: true, customerName: true },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.websiteDetail.count(),
      ]);
    }

    // ✅ Unified response structure
    res.json({
      data: websites,
      total,
      page: page ? Number(page) : 1,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching website details:", error);
    res.status(500).json({ message: "Error fetching website details", error });
  }
};

// ✅ Add new website detail
export const addWebsiteDetail = async (req: Request, res: Response) => {
  try {
    const {
      adminPanelUrl,
      websiteLink,
      username,
      password,
      serverDetails,
      serverUser,
      serverPassword,
      customerId,
    } = req.body;

    const newWebsite = await prisma.websiteDetail.create({
      data: {
        adminPanelUrl,
        websiteLink,
        username,
        password,
        serverDetails,
        serverUser,
        serverPassword,
        customerId: customerId ? Number(customerId) : null,
      },
    });

    res.json(newWebsite);
  } catch (error) {
    console.error("Error adding website detail:", error);
    res.status(500).json({ message: "Error adding website detail", error });
  }
};

// ✅ Update website detail
export const updateWebsiteDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      adminPanelUrl,
      websiteLink,
      username,
      password,
      serverDetails,
      serverUser,
      serverPassword,
      customerId,
    } = req.body;

    const updated = await prisma.websiteDetail.update({
      where: { id: Number(id) },
      data: {
        adminPanelUrl,
        websiteLink,
        username,
        password,
        serverDetails,
        serverUser,
        serverPassword,
        customerId: customerId ? Number(customerId) : null,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating website detail:", error);
    res.status(500).json({ message: "Error updating website detail", error });
  }
};

// ✅ Delete website detail
export const deleteWebsiteDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.websiteDetail.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return res.status(404).json({ message: "Website detail not found" });

    await prisma.websiteDetail.delete({ where: { id: Number(id) } });
    res.json({ message: "Website detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting website detail:", error);
    res.status(500).json({ message: "Error deleting website detail", error });
  }
};
