import { useNavigate } from "react-router-dom";

type Props = {
  userId: string;
  username: string;
};

function UserCard({ userId, username }: Props) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border"></div>

        <span className="font-medium">@{username}</span>
      </div>

      <button
        onClick={() => navigate(`/chat/${userId}`)}
        className="border px-4 py-2 rounded-xl"
      >
        Message
      </button>
    </div>
  );
}

export default UserCard;
