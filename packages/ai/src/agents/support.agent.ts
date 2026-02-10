import { AgentInput, AgentResponse } from "./types";
import { getConversationHistory } from "../tools/support.tools";

export async function supportAgent(
  input: AgentInput
): Promise<AgentResponse> {
  const history = await getConversationHistory(input.conversationId);

  // Later AI will use history
  return {
    text: `I can help with general support. You said: "${input.message}"`,
  };
}
