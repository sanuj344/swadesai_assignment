import { AgentInput, AgentResponse } from "./types";
import { getUserInvoices } from "../tools/billing.tools";
import { generateText } from "ai";
import { model } from "../llm";

export async function billingAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const invoices = await getUserInvoices(input.userId);

  const prompt = `
You are a billing assistant.

Invoices:
${JSON.stringify(invoices, null, 2)}

User question:
${input.message}

Explain politely.
`;

  const { text } = await generateText({
    model,
    prompt,
  });

  return { text };
}
