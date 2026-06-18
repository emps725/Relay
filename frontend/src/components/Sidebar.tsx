import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getConversations } from "../services/messageService";

type Conversation = {
  _id: string;
  username: string;
};

function Sidebar() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const loadConversations = async () => {
      const data = await getConversations();
      setConversations(data.data);
    };

    loadConversations();
  }, []);
  return (
    <div className="w-64 h-screen border-r flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Relay</h1>

      <Link to="/home">Home</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/search">Search</Link>
      <Link to="/settings">Settings</Link>

      <hr className="my-4" />

      <h2>Your Chats</h2>
      {conversations.map((user) => (
        <button
          className="w-full text-left cursor-pointer"
          key={user._id}
          onClick={() => navigate(`/chat/${user._id}`)}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
