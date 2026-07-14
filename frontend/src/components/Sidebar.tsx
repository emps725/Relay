import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getConversations } from "../services/messageService";
import { getUserById } from "../services/userService";

type Conversation = {
  _id: string;
  username: string;
};

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const myId = payload?._id;
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const cached = sessionStorage.getItem("conversations");

    return cached ? JSON.parse(cached) : [];
  });

  const [me, setMe] = useState(() => {
    const cached = sessionStorage.getItem("currentUser");

    return cached
      ? JSON.parse(cached)
      : {
          username: "",
          avatar: "",
          bio: "",
        };
  });

  useEffect(() => {
    const loadMe = async () => {
      if (!myId) return;

      const data = await getUserById(myId);

      setMe(data.data);

      sessionStorage.setItem("currentUser", JSON.stringify(data.data));
    };

    if (!me.username) {
      loadMe();
    }
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getConversations();

      setConversations(data.data);

      sessionStorage.setItem("conversations", JSON.stringify(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (conversations.length === 0) {
      loadConversations();
    }
  }, []);
  return (
    <div className="w-64 h-screen border-r flex flex-col p-4">
      <div className="flex items-center gap-3 pb-4 cursor-pointer">
        <img
          src={me.avatar}
          alt={me.username}
          className="w-12 h-12 rounded-sm object-cover"
        />

        <div>
          <p className="font-semibold">@{me.username}</p>
        </div>
      </div>

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
