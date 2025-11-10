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
    console.log("Fetched products:", products);
    const formatted = products.map((p) => ({
      ...p,
      sims: Array.isArray(p.sims) ? p.sims : [], // ✅ No parse, just ensure it's an array
    }));

    res.json(formatted);
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
    const toDate = (val: any) => {
      if (!val) return new Date(); // fallback if undefined
      const date = new Date(val);
      return isNaN(date.getTime()) ? new Date() : date;
    };
   
    const newProduct = await prisma.productDetail.create({
      data: {
         customerId: Number(mainData.customerId),
        productType: mainData.productType,
        invoiceNo: mainData.invoiceNo,
        invoiceDate: toDate(mainData.invoiceDate),
        sims:
          Array.isArray(mainData.sims) && mainData.sims.length > 0
            ? mainData.sims
            : [],
        remarks: mainData.remarks,
        purchaseOrderNo: mainData.purchaseOrderNo,
        purchaseOrderDate: toDate(mainData.purchaseOrderDate),
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
    const toDate = (val: any) => {
      if (!val) return null;
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    };

    // 1️⃣ Update the main Product Detail
    const updatedProduct = await prisma.productDetail.update({
      where: { id: Number(id) },
      data: {
        customerId: Number(mainData.customerId),
        productType: mainData.productType,
        invoiceNo: mainData.invoiceNo,
        invoiceDate: toDate(mainData.invoiceDate),
        sims:
          Array.isArray(mainData.sims) && mainData.sims.length > 0
            ? mainData.sims
            : [],
        //sims: mainData.sims ? JSON.stringify(mainData.sims) : undefined, // ✅ store multiple SIMs
        remarks: mainData.remarks,
        purchaseOrderNo: mainData.purchaseOrderNo,
        purchaseOrderDate: toDate(mainData.purchaseOrderDate),
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

    const formattedProduct = {
      ...finalProduct,
      sims: typeof finalProduct?.sims === "string"
      ? JSON.parse(finalProduct.sims)
      : Array.isArray(finalProduct?.sims)
      ? finalProduct.sims
      : [],
    };

    res.json(formattedProduct);
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
