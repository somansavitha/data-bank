import { PrismaClient } from "@prisma/client";

export async function seedDomain(prisma: PrismaClient) {
  console.log("🌱 Seeding domain details...");

  const customers = await prisma.customer.findMany();
  if (customers.length === 0) {
    console.log("⚠️ No customers found! Please seed customers first.");
    return;
  }

  const wipro = customers.find((c) => c.customerName === "Wipro Technologies");

  await prisma.domainDetail.createMany({
    data: [
      {
        customerId: wipro?.id,
        domainName: "gulfelectro.net",
        registrar: "GoDaddy",
        activationDate: new Date("2023-10-17"),
        expiryDate: new Date("2026-10-17"),
      },
      {
        customerId: wipro?.id,
        domainName: "bestoptionspc.com",
        registrar: "Namecheap",
        activationDate: new Date("2024-02-12"),
        expiryDate: new Date("2026-02-12"),
      },
    ],
  });

  console.log("✅ Domain details seeded successfully!");
}
