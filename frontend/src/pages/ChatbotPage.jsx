import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { t, i18n } = useTranslation();

  const sendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    try {
      const res = await axios.post("/api/chatbot/ask/", {
        message: input,
        sender: "visiteur",
        language: i18n.language,
      });
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: res.data.rasa_response?.text || JSON.stringify(res.data.rasa_response) }
      ]);
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: "Erreur de connexion avec le serveur." }
      ]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h2 className="text-2xl mb-4 font-bold text-center">{t('chatbot')}</h2>
      <div className="border p-4 h-80 overflow-y-scroll bg-gray-100 rounded-lg mb-3">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === "user" ? "text-right mb-2" : "text-left mb-2"}>
            <span className={msg.from === "user" ? "inline-block bg-blue-200 px-4 py-2 rounded-xl" : "inline-block bg-green-200 px-4 py-2 rounded-xl"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder={t('chatbot') + "..."}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-6 rounded-r font-bold hover:bg-blue-700 transition">Envoyer</button>
      </div>
    </div>
  );
}
