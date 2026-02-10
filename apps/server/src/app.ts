import { Hono } from "hono";
import { chatRoutes } from "./routes/chat.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = new Hono();

app.use("*", errorMiddleware);

app.route("/api/chat", chatRoutes);
