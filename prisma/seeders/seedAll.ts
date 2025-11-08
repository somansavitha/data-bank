import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.log("🚫 Skipping seeding in production environment.");
    return;
  }
  console.log("🌱 Starting all seeders...");

  // ✅ Step 1: Seed User (from TypeScript)
    const { seedCustomers } = await import("./seedCustomers.ts").catch(() => ({ seedCustomers: null }));
    if (seedCustomers) await seedCustomers(prisma);


  // ✅ Step 2: Seed other .js files (dynamic imports)
  const { seedDomain } = await import("./seedDomain.ts").catch(() => ({ seedDomain: null }));
if (seedDomain) await seedDomain(prisma);

  const { seedEmail } = await import("./seedEmail.ts").catch(() => ({ seedEmail: null }));
  if (seedEmail) await seedEmail(prisma);

  const { seedProduct } = await import("./seedProducts.ts").catch(() => ({ seedProduct: null }));
  if (seedProduct) await seedProduct(prisma);

  const { seedService } = await import("./seedServices.ts").catch(() => ({ seedService: null }));
  if (seedService) await seedService(prisma);

  const { seedWebsite } = await import("./seedWebsite.ts").catch(() => ({ seedWebsite: null }));
if (seedWebsite) await seedWebsite(prisma);

  console.log("✅ All seeders completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
