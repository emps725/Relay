import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getConversation, sendMessage } from "../services/messageService";
import { getUserById } from "../services/userService";

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

  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadConversation = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const userData = await getUserById(userId);
      setUsername(userData.data.username);
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
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="border-b p-4">
          <h2 className="font-bold">@{username}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {messages.length === 0 && (
                <p>Start your conversation with @{username}</p>
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
  );
}

export default Chat;
