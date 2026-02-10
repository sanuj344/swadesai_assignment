import { prisma } from "@repo/db";

export async function getUserInvoices(userId: string) {
  return prisma.invoice.findMany({
    where: { userId },
    include: { refunds: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getInvoiceById(invoiceId: string) {
  return prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { refunds: true },
  });
}
