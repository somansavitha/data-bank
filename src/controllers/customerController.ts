import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: { id: string; email?: string };
}

export const addCustomer = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { customerName, address, phoneNo, contactPerson, contactNo, email } = req.body;

    if (!customerName || !address || !contactNo) return res.status(400).json({ message: "Customer name, address, and contact number are required." });
    const normalizedEmail = email && email.trim() !== "" ? email.trim() : null;
    if (normalizedEmail) {
      const existing = await prisma.customer.findUnique({
        where: { email: normalizedEmail },
      });
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    const newCustomer = await prisma.customer.create({
      data: {
        customerName,
        address,
        phoneNo: phoneNo || null,
        contactPerson: contactPerson || null,
        contactNo,
        email: normalizedEmail,
        userId: req.user?.id,
      },
    });

    res.json(newCustomer);
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ message: "Email must be unique" });
    }
    res.status(500).json({ message: "Error adding customer" });
  }
};

export const getCustomers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page, limit } = req.query;

    const where = { userId: req.user?.id };

    let customers;
    let total;
    let totalPages = 1;

    // ✅ If both page and limit are provided → apply pagination
    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      [customers, total] = await Promise.all([
        prisma.customer.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take,
        }),
        prisma.customer.count({ where }),
      ]);

      totalPages = Math.ceil(total / take);
    } else {
      // ✅ Otherwise → return all customers (no pagination)
      [customers, total] = await Promise.all([
        prisma.customer.findMany({
          where,
          orderBy: { createdAt: "desc" },
        }),
        prisma.customer.count({ where }),
      ]);
    }

    res.json({
      data: customers,
      total,
      page: page ? Number(page) : 1,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { customerName, address, phoneNo, contactPerson, contactNo, email } = req.body;

    const existing = await prisma.customer.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Customer not found" });
    if (customerName !== undefined && customerName.trim() === "") {
      return res.status(400).json({ message: "Customer name cannot be empty" });
    }

    if (address !== undefined && address.trim() === "") {
      return res.status(400).json({ message: "Address cannot be empty" });
    }

    if (contactNo !== undefined && contactNo.trim() === "") {
      return res.status(400).json({ message: "Contact number cannot be empty" });
    }
    const updated = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        ...(customerName && { customerName }),
        ...(address && { address }),
        ...(phoneNo && { phoneNo }),
        ...(contactPerson && { contactPerson }),
        ...(contactNo && { contactNo }),
        ...(email && { email }),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating customer" });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.customer.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Customer not found" });

    await prisma.customer.delete({ where: { id: Number(id) } });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};

export const getCustomerById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: {
        domainDetails: true,
        emailDetails: true,
        websiteDetails: true,
        serviceDetails: true,
        productDetails: {
          include: {
            productItems: true, 
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Error fetching customer details" });
  }
};

