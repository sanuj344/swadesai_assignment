import { prisma } from "@repo/db";

interface SendMessageInput {
  conversationId?: string;
  userId: string;
  message: string;
}

export async function sendMessage(input: SendMessageInput) {
  let conversationId = input.conversationId;

  // ✅ ALWAYS ensure user exists FIRST
  await prisma.user.upsert({
    where: { id: input.userId },
    update: {},
    create: {
      id: input.userId,
      email: `${input.userId}@example.com`,
    },
  });

  // ✅ NOW create conversation safely
  if (!conversationId) {
    const conversation = await prisma.conversation.create({
      data: {
        userId: input.userId,
      },
    });

    conversationId = conversation.id;
  }

  // ✅ store user message
  await prisma.message.create({
    data: {
      conversationId,
      role: "user",
      content: input.message,
    },
  });

  // ✅ assistant reply
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
  return await prisma.conversation.findMany({
    where: { userId },
    include: { messages: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getConversation(id: string) {
  return await prisma.conversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
}

export async function deleteConversation(id: string) {
  await prisma.message.deleteMany({
    where: { conversationId: id },
  });

  await prisma.conversation.delete({
    where: { id },
  });
}
