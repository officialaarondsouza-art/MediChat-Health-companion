import { useEffect, useState } from "react";
import axios from "../api/axios";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface HistoryItem {
  message?: string;
  response?: string;
  userMessage?: string;
  botResponse?: string;
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/chat/history");

        const formatted = (res.data as HistoryItem[]).flatMap((chat) => {
          const userText = chat.message ?? chat.userMessage;
          const botText = chat.response ?? chat.botResponse;
          const pair: Message[] = [];

          if (userText) pair.push({ role: "user", text: userText });
          if (botText) pair.push({ role: "bot", text: botText });

          return pair;
        });

        setMessages(formatted);
      } catch (err) {
        console.log("No history yet");
      }
    };

    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/chat", { message: input });

      const botMsg: Message = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "AI server not responding." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3">AI Health Assistant</h2>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto border rounded p-3 mb-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">AI is thinking...</div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Describe your symptoms..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
