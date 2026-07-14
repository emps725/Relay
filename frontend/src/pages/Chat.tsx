import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getConversation, sendMessage } from "../services/messageService";
import { getUserById } from "../services/userService";
import ProfileModal from "../components/ProfileModal";
import { AnimatePresence } from "framer-motion";

type Message = {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
};

function Chat() {
  const { userId } = useParams();

  const token = localStorage.getItem("accessToken");

  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const myId = payload?._id;

  const [user, setUser] = useState({
    username: "",
    avatar: "",
    bio: "",
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadConversation = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const userData = await getUserById(userId);
      setUser(userData.data);
      const convoData = await getConversation(userId);
      setMessages(convoData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversation();
  }, [userId]);

  const handleSend = async () => {
    if (!content.trim() || !userId) return;

    try {
      const response = await sendMessage(userId, content);

      setMessages((prev) => [...prev, response.data]);

      setContent("");

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <div
            className="border-b p-4 flex items-center gap-3 cursor-pointer"
            onClick={() => setProfileOpen(true)}
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-bold">@{user.username}</h2>

              <p className="text-sm text-gray-500">
                {user.bio || "No bio yet."}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {messages.length === 0 && (
                  <p>Start your conversation with @{user.username}</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`max-w-md rounded-xl p-3 border ${
                      msg.sender === myId ? "self-end" : "self-start"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="p-4">
            <div className="flex items-center gap-3 border rounded-2xl px-4 py-2">
              <button>+</button>

              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type a message"
              />

              <button onClick={handleSend}>→</button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {profileOpen && userId && (
          <ProfileModal userId={userId} onClose={() => setProfileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Chat;
