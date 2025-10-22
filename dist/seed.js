"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    // Change username & password as you like
    const username = "admin";
    const password = "admin123";
    // Hash password before saving
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
