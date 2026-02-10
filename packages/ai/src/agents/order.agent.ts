import { AgentInput, AgentResponse } from "./types";
import { getUserOrders } from "../tools/order.tools";

export async function orderAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const orders = await getUserOrders(input.userId);

  if (!orders.length) {
    return { text: "I couldn't find any orders for your account." };
  }

  const latest = orders[0];

  return {
    text: `Your latest order is ${latest.status}. Tracking: ${latest.trackingNumber}`,
  };
}
