import { PrismaClient } from "@prisma/client";

export async function seedEmail(prisma: PrismaClient) {
  console.log("🌱 Seeding email details...");

  await prisma.emailDetail.createMany({
    data: [
      {
        imap: "imap.secureserver.net",
        loginId: "591738763",
        serviceProvider: "GoDaddy",
        password: "test123",
        customerId: 1,
      },
      {
        imap: "imap.gmail.com",
        loginId: "bestuser@gmail.com",
        serviceProvider: "Google",
        password: "test456",
        customerId: 2,
      },
    ],
  });

  console.log("✅ Email details seeded!");
}
