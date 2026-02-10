import { AgentInput, AgentResponse } from "../agents/types";
import { supportAgent } from "../agents/support.agent";
import { orderAgent } from "../agents/order.agent";
import { billingAgent } from "../agents/billing.agent";

export type AgentType = "support" | "order" | "billing" | "fallback";

function detectIntent(message: string): AgentType {
  const text = message.toLowerCase();

  if (
    text.includes("refund") ||
    text.includes("invoice") ||
    text.includes("payment") ||
    text.includes("bill")
  ) {
    return "billing";
  }

  if (
    text.includes("order") ||
    text.includes("track") ||
    text.includes("delivery")
  ) {
    return "order";
  }

  if (text.trim().length === 0) {
    return "fallback";
  }

  return "support";
}

export async function routerAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const intent = detectIntent(input.message);

  switch (intent) {
    case "billing":
      return billingAgent(input);

    case "order":
      return orderAgent(input);

    case "support":
      return supportAgent(input);

    default:
      return {
        text: "I'm not sure how to help with that. Let me connect you to support.",
      };
  }
}
