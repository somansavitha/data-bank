import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 👇 If you have an admin user, fetch its ID
  const admin = await prisma.user.findFirst({
    where: { username: "admin" },
  });

  if (!admin) {
    console.error("❌ No admin user found. Run the user seed script first.");
    return;
  }

  // 👇 Dummy customer data
  const customers = [
    {
      customerName: "Wipro Technologies",
      address: "Bangalore, India",
      phoneNo: "080-45678900",
      contactPerson: "Ravi Kumar",
      contactNo: "9876543210",
      email: "ravi.kumar@wipro.com",
      userId: admin.id,
    },
    {
      customerName: "Infosys Ltd",
      address: "Electronic City, Bangalore",
      phoneNo: "080-22334455",
      contactPerson: "Priya Menon",
      contactNo: "9811122233",
      email: "priya.menon@infosys.com",
      userId: admin.id,
    },
    {
      customerName: "Tata Consultancy Services",
      address: "Mumbai, India",
      phoneNo: "022-33445566",
      contactPerson: "Arun Nair",
      contactNo: "9888877777",
      email: "arun.nair@tcs.com",
      userId: admin.id,
    },
    {
      customerName: "Tech Mahindra",
      address: "Pune, India",
      phoneNo: "020-77889900",
      contactPerson: "Sneha Joshi",
      contactNo: "9999998888",
      email: "sneha.joshi@techmahindra.com",
      userId: admin.id,
    },
  ];

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: {},
      create: customer,
    });
  }

  console.log("✅ Dummy customer records added successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding customers:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
