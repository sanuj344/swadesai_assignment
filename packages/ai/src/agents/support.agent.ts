import { AgentInput, AgentResponse } from "./types";
import { getConversationHistory } from "../tools/support.tools";
import { generateText } from "ai";
import { model } from "../llm";

export async function supportAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const history = await getConversationHistory(input.conversationId);

  const prompt = `
You are a helpful customer support assistant.

Conversation history:
${history.map((m) => `${m.role}: ${m.content}`).join("\n")}

User question:
${input.message}
`;

  const { text } = await generateText({
    model,
    prompt,
  });

  return { text };
}
