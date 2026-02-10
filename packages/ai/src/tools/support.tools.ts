import { prisma } from "@repo/db";

export async function getConversationHistory(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}
