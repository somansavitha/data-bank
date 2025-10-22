"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
  console.log("🌱 Seeding domain details...");
  // Check if any customers exist first
  const customers = await prisma.customer.findMany();
  if (customers.length === 0) {
    console.log("⚠️ No customers found! Please seed customers first.");
    return;
  }
  const wipro = customers.find((c) => c.customerName === "Wipro Technologies");
  // Insert domain details
  await prisma.domainDetail.createMany({
    data: [
      {
        customerId: wipro?.id,
        domainName: "gulfelectro.net",
        websiteUrl: "www.gulfelectro.net",
        registrar: "GoDaddy",
        loginUrl: "https://account.godaddy.com/products?go_redirect=disabled",
        username: "591738763",
        password: "Login1@GE#968",
        pin: "1852",
        activationDate: new Date("2023-10-17"),
        expiryDate: new Date("2026-10-17"),
      },
      {
        customerId: wipro?.id,
        domainName: "bestoptionspc.com",
        websiteUrl: "www.bestoptionspc.com",
        registrar: "Namecheap",
        loginUrl: "https://ap.www.namecheap.com/",
        username: "bestadmin",
        password: "********",
        pin: "2953",
        activationDate: new Date("2024-02-12"),
        expiryDate: new Date("2026-02-12"),
      },
    ],
  });
  console.log("✅ Domain details seeded successfully!");
}
main()
  .catch((e) => {
    console.error("❌ Error seeding domain details:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
