"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = exports.addCustomer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addCustomer = async (req, res) => {
    try {
        const { customerName, address, phoneNo, contactPerson, contactNo, email } = req.body;
        if (!customerName)
            return res.status(400).json({ message: "Customer name is required" });
        const newCustomer = await prisma.customer.create({
            data: {
                customerName,
                address,
                phoneNo,
                contactPerson,
                contactNo,
                email,
                userId: req.user?.id,
            },
        });
        res.json(newCustomer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding customer" });
    }
};
exports.addCustomer = addCustomer;
const getCustomers = async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            where: { userId: req.user?.id },
            orderBy: { createdAt: "desc" },
        });
        res.json(customers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching customers" });
    }
};
exports.getCustomers = getCustomers;
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerName, address, phoneNo, contactPerson, contactNo, email } = req.body;
        const existing = await prisma.customer.findUnique({ where: { id: Number(id) } });
        if (!existing)
            return res.status(404).json({ message: "Customer not found" });
        const updated = await prisma.customer.update({
            where: { id: Number(id) },
            data: { customerName, address, phoneNo, contactPerson, contactNo, email },
        });
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating customer" });
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.customer.findUnique({ where: { id: Number(id) } });
        if (!existing)
            return res.status(404).json({ message: "Customer not found" });
        await prisma.customer.delete({ where: { id: Number(id) } });
        res.json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting customer" });
    }
};
exports.deleteCustomer = deleteCustomer;
