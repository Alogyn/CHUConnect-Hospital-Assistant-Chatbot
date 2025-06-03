import React from "react";
import { Box, Typography } from "@mui/material";

const ChatBubble = ({ text, isUser }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      mb: 1,
    }}
  >
    <Box
      sx={{
        bgcolor: isUser ? "#3376b1" : "#f2f5f9",
        color: isUser ? "#fff" : "#333",
        px: 2, py: 1,
        borderRadius: 3,
        maxWidth: 350,
        wordBreak: "break-word",
        boxShadow: 2,
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  </Box>
);

export default ChatBubble;
