import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      orders: {
        create: [
          {
            status: "shipped",
            trackingNumber: "TRACK-123",
          },
        ],
      },
      invoices: {
        create: [
          {
            amount: 250,
            status: "paid",
            refunds: {
              create: [
                { status: "processed" }
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("Seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
