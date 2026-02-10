import { prisma } from "@repo/db";
import { routerAgent } from "@repo/ai/router/router.agent";

interface SendMessageInput {
  conversationId?: string;
  userId: string;
  message: string;
}

export async function sendMessage(input: SendMessageInput) {
  let conversationId = input.conversationId;

  // ✅ 1. Ensure user exists
  await prisma.user.upsert({
    where: { id: input.userId },
    update: {},
    create: {
      id: input.userId,
      email: `${input.userId}@example.com`,
    },
  });

  // ✅ 2. Create conversation if not provided
  if (!conversationId) {
    const conversation = await prisma.conversation.create({
      data: {
        userId: input.userId,
      },
    });

    conversationId = conversation.id;
  }

  // ✅ 3. Save user message
  await prisma.message.create({
    data: {
      conversationId,
      role: "user",
      content: input.message,
    },
  });

  // ✅ 4. Ask router which agent should respond
  const agentResponse = await routerAgent({
    userId: input.userId,
    conversationId,
    message: input.message,
  });

  // ✅ 5. Save assistant response
  const assistantMessage = await prisma.message.create({
    data: {
      conversationId,
      role: "assistant",
      content: agentResponse.text,
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
    orderBy: { createdAt: "desc" },
  });
}

export async function getConversation(id: string) {
  return await prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
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
