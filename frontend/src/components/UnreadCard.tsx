import type { UnreadCardType } from "../types/unreadCard";

type Props = {
  card: UnreadCardType;
};
const sizeClasses = {
  small: "h-32",
  medium: "h-48",
  large: "h-64",
};
function UnreadCard({ card }: Props) {
  return (
    <div
      className={`break-inside-avoid mb-6 border rounded-3xl p-4 ${sizeClasses[card.size]}`}
    >
      <h3>{card.name}</h3>

      {card.messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}

      <p>{card.unreadCount} unread</p>
    </div>
  );
}

export default UnreadCard;
