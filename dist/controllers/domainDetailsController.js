"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDomainDetail = exports.updateDomainDetail = exports.createDomainDetail = exports.getAllDomainDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ✅ Get all domain details
const getAllDomainDetails = async (req, res) => {
    try {
        const domains = await prisma.domainDetail.findMany({
            include: {
                customer: {
                    select: { customerName: true }, // ✅ only fetch name
                },
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(domains);
    }
    catch (error) {
        console.error("Error fetching domain details:", error);
        res.status(500).json({ message: "Error fetching domain details" });
    }
};
exports.getAllDomainDetails = getAllDomainDetails;
// ✅ Add a new domain detail
const createDomainDetail = async (req, res) => {
    try {
        const { customerId, domainName, websiteUrl, registrar, loginUrl, username, password, pin, activationDate, expiryDate, } = req.body;
        const newDomain = await prisma.domainDetail.create({
            data: {
                customerId,
                domainName,
                websiteUrl,
                registrar,
                loginUrl,
                username,
                password,
                pin,
                activationDate: activationDate ? new Date(activationDate) : undefined,
                expiryDate: expiryDate ? new Date(expiryDate) : undefined,
            },
        });
        res.status(201).json(newDomain);
    }
    catch (error) {
        console.error("Error creating domain detail:", error);
        res.status(500).json({ message: "Error creating domain detail" });
    }
};
exports.createDomainDetail = createDomainDetail;
// ✅ Update domain detail
const updateDomainDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const existing = await prisma.domainDetail.findUnique({
            where: { id: Number(id) },
        });
        if (!existing)
            return res.status(404).json({ message: "Domain detail not found" });
        const updated = await prisma.domainDetail.update({
            where: { id: Number(id) },
            data,
        });
        res.json(updated);
    }
    catch (error) {
        console.error("Error updating domain detail:", error);
        res.status(500).json({ message: "Error updating domain detail" });
    }
};
exports.updateDomainDetail = updateDomainDetail;
const deleteDomainDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.domainDetail.findUnique({ where: { id: Number(id) } });
        if (!existing)
            return res.status(404).json({ message: "Domain not found" });
        await prisma.domainDetail.delete({ where: { id: Number(id) } });
        res.json({ message: "Domain deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting domain" });
    }
};
exports.deleteDomainDetail = deleteDomainDetail;
