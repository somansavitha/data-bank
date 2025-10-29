import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/**
 * ✅ Get all Product Details (with Customer & Product Items)
 */
export const getAllProductDetails = async (req: Request, res: Response) => {
  try {
    const products = await prisma.productDetail.findMany({
      include: {
        customer: true,
        productItems: true, // 👈 include related items
      },
      orderBy: { id: "desc" },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Error fetching product details", error });
  }
};

/**
 * ✅ Add Product Detail (with nested Product Items)
 */
export const addProductDetail = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { productDetails = [], ...mainData } = data;

    const newProduct = await prisma.productDetail.create({
      data: {
        ...mainData,
        productItems: {
          create: productDetails.map((item: any) => ({
            productName: item.productName,
            modelNo: item.modelNo,
            quantity_: Number(item.quantity_) || 1,
            serialNumbers: item.serialNumbers || [],
            warrantyDays: item.warrantyDays ? Number(item.warrantyDays) : null,
            warrantyStartDate: item.warrantyStartDate
              ? new Date(item.warrantyStartDate)
              : null,
            warrantyEndDate: item.warrantyEndDate
              ? new Date(item.warrantyEndDate)
              : null,
          })),
        },
      },
      include: {
        productItems: true,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product detail:", error);
    res.status(500).json({ message: "Error adding product detail", error });
  }
};

/**
 * ✅ Update Product Detail (with nested Product Items)
 */
export const updateProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const { productDetails = [], ...mainData } = data;

    // 1️⃣ Update the main Product Detail
    const updatedProduct = await prisma.productDetail.update({
      where: { id: Number(id) },
      data: {
        ...mainData,
      },
    });

    // 2️⃣ Delete existing Product Items
    await prisma.productItem.deleteMany({
      where: { productDetailId: Number(id) },
    });

    // 3️⃣ Recreate Product Items
    if (productDetails.length > 0) {
      await prisma.productItem.createMany({
        data: productDetails.map((item: any) => ({
          productDetailId: Number(id),
          productName: item.productName,
          modelNo: item.modelNo,
          quantity_: Number(item.quantity_) || 1,
          serialNumbers: item.serialNumbers || [],
          warrantyDays: item.warrantyDays ? Number(item.warrantyDays) : null,
          warrantyStartDate: item.warrantyStartDate
            ? new Date(item.warrantyStartDate)
            : null,
          warrantyEndDate: item.warrantyEndDate
            ? new Date(item.warrantyEndDate)
            : null,
        })),
      });
    }

    // 4️⃣ Fetch updated record with relations
    const finalProduct = await prisma.productDetail.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        productItems: true,
      },
    });

    res.json(finalProduct);
  } catch (error) {
    console.error("Error updating product detail:", error);
    res.status(500).json({ message: "Error updating product detail", error });
  }
};

/**
 * ✅ Delete Product Detail (and its Product Items)
 */
export const deleteProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.productDetail.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete related product items first (to satisfy FK constraint)
    await prisma.productItem.deleteMany({
      where: { productDetailId: Number(id) },
    });

    // Delete the product detail
    await prisma.productDetail.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product detail:", error);
    res.status(500).json({ message: "Error deleting product detail", error });
  }
};
