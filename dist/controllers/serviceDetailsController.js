"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceDetail = exports.updateServiceDetail = exports.addServiceDetail = exports.getServiceDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ✅ Get all services
const getServiceDetails = async (req, res) => {
    try {
        const services = await prisma.serviceDetail.findMany({
            include: { customer: true },
            orderBy: { id: "desc" },
        });
        res.json(services);
    }
    catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Error fetching service details", error });
    }
};
exports.getServiceDetails = getServiceDetails;
// ✅ Add new service
const addServiceDetail = async (req, res) => {
    try {
        const { customerId, serviceType, invoiceNo, invoiceDate, warrantyDays, remarks, purchaseOrderNo, purchaseOrderDate, warrantyStartDate, warrantyEndDate, } = req.body;
        if (!customerId || !serviceType || !invoiceNo || !invoiceDate) {
            return res
                .status(400)
                .json({ message: "Customer, Service Type, Invoice No, and Date are required." });
        }
        const newService = await prisma.serviceDetail.create({
            data: {
                customerId: Number(customerId),
                serviceType,
                invoiceNo,
                invoiceDate: new Date(invoiceDate),
                warrantyDays: warrantyDays ? Number(warrantyDays) : null,
                remarks,
                purchaseOrderNo,
                purchaseOrderDate: purchaseOrderDate ? new Date(purchaseOrderDate) : null,
                warrantyStartDate: warrantyStartDate ? new Date(warrantyStartDate) : null,
                warrantyEndDate: warrantyEndDate ? new Date(warrantyEndDate) : null,
            },
        });
        res.status(201).json(newService);
    }
    catch (error) {
        console.error("Error adding service:", error);
        res.status(500).json({ message: "Error adding service detail", error });
    }
};
exports.addServiceDetail = addServiceDetail;
// ✅ Update service
const updateServiceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const existing = await prisma.serviceDetail.findUnique({ where: { id: Number(id) } });
        if (!existing)
            return res.status(404).json({ message: "Service not found" });
        const updated = await prisma.serviceDetail.update({
            where: { id: Number(id) },
            data,
        });
        res.json(updated);
    }
    catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Error updating service detail", error });
    }
};
exports.updateServiceDetail = updateServiceDetail;
// ✅ Delete service
const deleteServiceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.serviceDetail.findUnique({ where: { id: Number(id) } });
        if (!existing)
            return res.status(404).json({ message: "Service not found" });
        await prisma.serviceDetail.delete({ where: { id: Number(id) } });
        res.json({ message: "Service deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Error deleting service detail", error });
    }
};
exports.deleteServiceDetail = deleteServiceDetail;
