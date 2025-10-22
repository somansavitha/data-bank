import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting all seeders...");

  // ✅ Step 1: Seed User (from TypeScript)
    const { seedCustomers } = await import("./seeders/seedCustomers.ts").catch(() => ({ seedCustomers: null }));
    if (seedCustomers) await seedCustomers(prisma);


  // ✅ Step 2: Seed other .js files (dynamic imports)
  const { seedDomain } = await import("./seeders/seedDomain.ts").catch(() => ({ seedDomain: null }));
if (seedDomain) await seedDomain(prisma);

  const { seedEmail } = await import("./seeders/seedEmail.ts").catch(() => ({ seedEmail: null }));
  if (seedEmail) await seedEmail(prisma);

  const { seedProduct } = await import("./seeders/seedProducts.ts").catch(() => ({ seedProduct: null }));
  if (seedProduct) await seedProduct(prisma);

  const { seedService } = await import("./seeders/seedServices.ts").catch(() => ({ seedService: null }));
  if (seedService) await seedService(prisma);

  const { seedWebsite } = await import("./seeders/seedWebsite.ts").catch(() => ({ seedWebsite: null }));
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
