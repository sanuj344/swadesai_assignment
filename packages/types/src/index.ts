export type AgentType = "support" | "order" | "billing";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
