import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import KioskLayout from "./KioskLayout"; // Ton layout avec logo/bg
import ChatBubble from "../ChatBubble";   // Les bulles (voir plus haut)
import ChatIcon from "@mui/icons-material/Chat";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour 👋, posez-moi votre question sur l’hôpital !", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Remplace cette fonction : elle fait l'échange avec Rasa et NON Django
  const sendMessageToRasa = async (message) => {
    try {
      const res = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "kiosk_user", // ou user_id, peu importe pour une borne
          message: message
        })
      });
      const data = await res.json();
      // Rasa peut renvoyer plusieurs messages, prends tous les "text"
      return data.filter(m => m.text).map(m => m.text);
    } catch {
      return ["Erreur de connexion au bot Rasa."];
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setLoading(true);

    const replies = await sendMessageToRasa(input);
    setMessages((prev) => [
      ...prev,
      ...replies.map(r => ({ text: r, isUser: false }))
    ]);
    setLoading(false);
  };

  return (
    <KioskLayout>
      <Box sx={{
        display: "flex", flexDirection: "column", alignItems: "center",
        bgcolor: "#fff", borderRadius: 4, boxShadow: 4, p: 2, mt: 2, minHeight: 440
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ChatIcon sx={{ fontSize: 36, color: "#3376b1" }} />
          <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>Chatbot hospitalier</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 320,
            overflowY: "auto",
            bgcolor: "#f7fafd",
            borderRadius: 3,
            p: 2,
            mb: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} text={msg.text} isUser={msg.isUser} />
          ))}
          <div ref={chatEndRef} />
        </Box>
        <form style={{ display: "flex", width: "100%", gap: 8 }} onSubmit={handleSend}>
          <TextField
            variant="outlined"
            placeholder="Votre question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            disabled={loading}
            autoFocus
            sx={{ bgcolor: "#f7fafd" }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !input.trim()}
            sx={{ minWidth: 100, fontWeight: "bold" }}
          >
            {loading ? <CircularProgress size={22} /> : "Envoyer"}
          </Button>
        </form>
      </Box>
    </KioskLayout>
  );
};

export default ChatbotPage;
