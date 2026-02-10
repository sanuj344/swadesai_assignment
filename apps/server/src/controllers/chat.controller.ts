import { Context } from "hono";
import * as chatService from "../services/chat.service";

export async function sendMessage(c: Context) {
  const body = await c.req.json();
  const { conversationId, userId, message } = body;

  const result = await chatService.sendMessage({
    conversationId,
    userId,
    message,
  });

  return c.json(result);
}

export async function getConversations(c: Context) {
  const userId = c.req.query("userId")!;
  const conversations = await chatService.getConversations(userId);
  return c.json(conversations);
}

export async function getConversation(c: Context) {
  const id = c.req.param("id");
  const conversation = await chatService.getConversation(id);
  return c.json(conversation);
}

export async function deleteConversation(c: Context) {
  const id = c.req.param("id");
  await chatService.deleteConversation(id);
  return c.json({ success: true });
}
