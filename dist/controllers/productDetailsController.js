"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductDetail = exports.updateProductDetail = exports.addProductDetail = exports.getAllProductDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ✅ Get all Product Details
const getAllProductDetails = async (req, res) => {
    try {
        const products = await prisma.productDetail.findMany({
            include: { customer: true },
            orderBy: { id: "desc" },
        });
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: "Error fetching product details", error });
    }
};
exports.getAllProductDetails = getAllProductDetails;
// ✅ Add Product Detail
const addProductDetail = async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await prisma.productDetail.create({ data });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error adding product detail:", error);
        res.status(500).json({ message: "Error adding product detail", error });
    }
};
exports.addProductDetail = addProductDetail;
// ✅ Update Product Detail
const updateProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedProduct = await prisma.productDetail.update({
            where: { id: Number(id) },
            data,
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product detail:", error);
        res.status(500).json({ message: "Error updating product detail", error });
    }
};
exports.updateProductDetail = updateProductDetail;
// ✅ Delete Product Detail
const deleteProductDetail = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error deleting product detail:", error);
        res.status(500).json({ message: "Error deleting product detail", error });
    }
};
exports.deleteProductDetail = deleteProductDetail;
