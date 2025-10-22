"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding website details...");
    await prisma.websiteDetail.createMany({
        data: [
            {
                adminPanelUrl: "https://gulfelectro.net/admin",
                websiteLink: "https://www.gulfelectro.net",
                username: "admin",
                password: "Login1@GE#968",
                serverDetails: "GoDaddy Shared Hosting",
                serverUser: "rootuser1",
                serverPassword: "Server@123",
                customerId: 1,
            },
            {
                adminPanelUrl: "https://bestoptionspc.com/admin",
                websiteLink: "https://www.bestoptionspc.com",
                username: "superadmin",
                password: "Best@456",
                serverDetails: "AWS EC2 Instance",
                serverUser: "ubuntu",
                serverPassword: "EC2@789",
                customerId: 2,
            },
        ],
    });
    console.log("✅ Website details seeded!");
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
