export type UnreadCardType = {
  id: string;
  size: "small" | "medium" | "large";
  name: string;
  messages: string[];
  unreadCount: number;
};
