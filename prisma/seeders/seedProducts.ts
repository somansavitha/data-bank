import { PrismaClient } from "@prisma/client";

export async function seedProduct(prisma: PrismaClient) {
  console.log("🌱 Seeding Product Details...");

  const customers = await prisma.customer.findMany();
  if (!customers.length) {
    console.error("❌ No customers found. Please seed customers first.");
    return;
  }

  const customerId = customers[0].id;

  await prisma.productDetail.create({
    data: {
      customerId,
      productType: "Mobile",
      invoiceNo: "MOB-001",
      invoiceDate: new Date("2024-05-10"),
      simNumber: "89014103211118510720",
      phoneNumber: "9876543210",
      remarks: "iPhone 14 Pro service",
      purchaseOrderNo: "PO-1001",
      purchaseOrderDate: new Date("2024-05-01"),
      productItems: {
        create: [
          {
            productName: "iPhone 14 Pro",
            modelNo: "A2890",
            quantity_: 2,
            serialNumbers: ["SN12345", "SN67890"],
            warrantyDays: 365,
            warrantyStartDate: new Date("2024-05-10"),
            warrantyEndDate: new Date("2025-05-10"),
          },
          {
            productName: "iPhone Charger",
            modelNo: "C100",
            quantity_: 1,
            serialNumbers: ["CHARGER001"],
            warrantyDays: 180,
            warrantyStartDate: new Date("2024-05-10"),
            warrantyEndDate: new Date("2024-11-06"),
          },
        ],
      },
    },
  });

  await prisma.productDetail.create({
    data: {
      customerId,
      productType: "Antivirus",
      invoiceNo: "AV-002",
      invoiceDate: new Date("2024-07-15"),
      remarks: "Kaspersky 2-year license",
      simNumber: "NA",
      phoneNumber: "NA",
      purchaseOrderNo: "PO-2002",
      purchaseOrderDate: new Date("2024-07-10"),
      productItems: {
        create: [
          {
            productName: "Kaspersky Internet Security",
            modelNo: "KIS-2024",
            quantity_: 1,
            serialNumbers: ["KEY-98765"],
            warrantyDays: 730,
            warrantyStartDate: new Date("2024-07-15"),
            warrantyEndDate: new Date("2026-07-15"),
          },
        ],
      },
    },
  });

  console.log("✅ Product Details seeded successfully!");
}

