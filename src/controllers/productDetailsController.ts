import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// ✅ Get all Product Details
export const getAllProductDetails = async (req: Request, res: Response) => {
  try {
    const products = await prisma.productDetail.findMany({
      include: { customer: true },
      orderBy: { id: "desc" },
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Error fetching product details", error });
  }
};

// ✅ Add Product Detail
export const addProductDetail = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newProduct = await prisma.productDetail.create({ data });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product detail:", error);
    res.status(500).json({ message: "Error adding product detail", error });
  }
};

// ✅ Update Product Detail
export const updateProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await prisma.productDetail.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product detail:", error);
    res.status(500).json({ message: "Error updating product detail", error });
  }
};

// ✅ Delete Product Detail
export const deleteProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.productDetail.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    await prisma.productDetail.delete({ where: { id: Number(id) } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product detail:", error);
    res.status(500).json({ message: "Error deleting product detail", error });
  }
};
