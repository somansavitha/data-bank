"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebsiteDetail = exports.updateWebsiteDetail = exports.addWebsiteDetail = exports.getWebsiteDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ✅ Get all website details
const getWebsiteDetails = async (req, res) => {
    try {
        const websites = await prisma.websiteDetail.findMany({
            include: {
                customer: {
                    select: { id: true, customerName: true },
                },
            },
        });
        res.json(websites);
    }
    catch (error) {
        console.error("Error fetching website details:", error);
        res.status(500).json({ message: "Error fetching website details", error });
    }
};
exports.getWebsiteDetails = getWebsiteDetails;
// ✅ Add new website detail
const addWebsiteDetail = async (req, res) => {
    try {
        const { adminPanelUrl, websiteLink, username, password, serverDetails, serverUser, serverPassword, customerId, } = req.body;
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
    }
    catch (error) {
        console.error("Error adding website detail:", error);
        res.status(500).json({ message: "Error adding website detail", error });
    }
};
exports.addWebsiteDetail = addWebsiteDetail;
// ✅ Update website detail
const updateWebsiteDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminPanelUrl, websiteLink, username, password, serverDetails, serverUser, serverPassword, customerId, } = req.body;
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
    }
    catch (error) {
        console.error("Error updating website detail:", error);
        res.status(500).json({ message: "Error updating website detail", error });
    }
};
exports.updateWebsiteDetail = updateWebsiteDetail;
// ✅ Delete website detail
const deleteWebsiteDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.websiteDetail.findUnique({
            where: { id: Number(id) },
        });
        if (!existing)
            return res.status(404).json({ message: "Website detail not found" });
        await prisma.websiteDetail.delete({ where: { id: Number(id) } });
        res.json({ message: "Website detail deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting website detail:", error);
        res.status(500).json({ message: "Error deleting website detail", error });
    }
};
exports.deleteWebsiteDetail = deleteWebsiteDetail;
