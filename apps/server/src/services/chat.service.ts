import { prisma } from "@repo/db";

interface SendMessageInput {
  conversationId?: string;
  userId: string;
  message: string;
}

export async function sendMessage(input: SendMessageInput) {
  let conversationId = input.conversationId;

  if (!conversationId) {
    const conversation = await prisma.conversation.create({
      data: {
        userId: input.userId,
      },
    });
    conversationId = conversation.id;
  }

  await prisma.message.create({
    data: {
      conversationId,
      role: "user",
      content: input.message,
    },
  });

  // Dummy assistant response (AI comes later)
  const assistantMessage = await prisma.message.create({
    data: {
      conversationId,
      role: "assistant",
      content: "Thanks for contacting support. How can I help?",
    },
  });

  return {
    conversationId,
    message: assistantMessage,
  };
}

export async function getConversations(userId: string) {
  return prisma.conversation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getConversation(conversationId: string) {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function deleteConversation(conversationId: string) {
  await prisma.message.deleteMany({
    where: { conversationId },
  });

  await prisma.conversation.delete({
    where: { id: conversationId },
  });
}
