import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Product Details...");

  const customers = await prisma.customer.findMany();
  if (!customers.length) {
    console.error("❌ No customers found. Please seed customers first.");
    return;
  }

  const customerId = customers[0].id;

  await prisma.productDetail.createMany({
    data: [
      {
        customerId,
        productType: "Mobile",
        invoiceNo: "MOB-001",
        invoiceDate: new Date("2024-05-10"),
        warrantyDays: 365,
        simNumber: "89014103211118510720",
        phoneNumber: "9876543210",
        remarks: "iPhone 14 Pro service",
        purchaseOrderNo: "PO-1001",
        purchaseOrderDate: new Date("2024-05-01"),
        warrantyStartDate: new Date("2024-05-10"),
        warrantyEndDate: new Date("2025-05-10"),
      },
      {
        customerId,
        productType: "Antivirus",
        invoiceNo: "AV-002",
        invoiceDate: new Date("2024-07-15"),
        warrantyDays: 730,
        remarks: "Kaspersky 2-year license",
        simNumber: "NA",
        phoneNumber: "NA",
        purchaseOrderNo: "PO-2002",
        purchaseOrderDate: new Date("2024-07-10"),
        warrantyStartDate: new Date("2024-07-15"),
        warrantyEndDate: new Date("2026-07-15"),
      },
    ],
  });

  console.log("✅ Product Details seeded successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Error seeding Product Details:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
