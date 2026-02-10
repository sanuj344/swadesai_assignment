import { AgentInput, AgentResponse } from "./types";
import { getUserOrders } from "../tools/order.tools";
import { generateText } from "ai";
import { model } from "../llm";

export async function orderAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const orders = await getUserOrders(input.userId);

  const prompt = `
You are an order support specialist.

Orders:
${JSON.stringify(orders, null, 2)}

User question:
${input.message}

Answer clearly using the data.
`;

  const { text } = await generateText({
    model,
    prompt,
  });

  return { text };
}
