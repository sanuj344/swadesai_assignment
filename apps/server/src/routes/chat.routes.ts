import { Hono } from "hono";
import * as chatController from "../controllers/chat.controller";

export const chatRoutes = new Hono();

chatRoutes.post("/messages", chatController.sendMessage);
chatRoutes.get("/conversations", chatController.getConversations);
chatRoutes.get("/conversations/:id", chatController.getConversation);
chatRoutes.delete("/conversations/:id", chatController.deleteConversation);
