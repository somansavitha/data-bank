"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding service details...");
    await prisma.serviceDetail.createMany({
        data: [
            {
                customerId: 1,
                serviceType: "Antivirus",
                invoiceNo: "INV-1001",
                invoiceDate: new Date("2024-03-15"),
                warrantyDays: 365,
                remarks: "Annual subscription",
                purchaseOrderNo: "PO-7890",
                purchaseOrderDate: new Date("2024-03-10"),
                warrantyStartDate: new Date("2024-03-15"),
                warrantyEndDate: new Date("2025-03-15"),
            },
            {
                customerId: 2,
                serviceType: "Mobile",
                invoiceNo: "INV-1002",
                invoiceDate: new Date("2024-05-22"),
                warrantyDays: 180,
                remarks: "Corporate phone setup",
                purchaseOrderNo: "PO-1022",
                purchaseOrderDate: new Date("2024-05-20"),
                warrantyStartDate: new Date("2024-05-22"),
                warrantyEndDate: new Date("2024-11-22"),
            },
        ],
    });
    console.log("✅ Services seeded successfully!");
}
main()
    .catch((err) => console.error("❌ Error seeding services:", err))
    .finally(async () => {
    await prisma.$disconnect();
});
