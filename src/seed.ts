import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Change username & password as you like
  const username = "admin";
  const password = "admin123";

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`User added: ${username} / ${password}`);
}

main()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
