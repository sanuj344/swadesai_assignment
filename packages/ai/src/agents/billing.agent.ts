import { AgentInput, AgentResponse } from "./types";
import { getUserInvoices } from "../tools/billing.tools";

export async function billingAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const invoices = await getUserInvoices(input.userId);

  if (!invoices.length) {
    return { text: "No invoices found." };
  }

  const latest = invoices[0];

  return {
    text: `Your latest invoice of $${latest.amount} is ${latest.status}.`,
  };
}
