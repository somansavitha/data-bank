"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
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
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
