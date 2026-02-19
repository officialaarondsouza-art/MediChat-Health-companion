import { getGeminiResponse } from "../services/geminiService.js";
import prisma from "../prisma/client.js";

/* ---------------- CHAT WITH AI ---------------- */

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id || "guest";

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await getGeminiResponse(message);


    // save to DB
    await prisma.chatHistory.create({
      data: {
        userId,
        message,
        response: reply
      }
    });

    res.json({ reply });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ reply: "AI server error" });
  }
};


/* ---------------- GET HISTORY ---------------- */

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user?.id || "guest";

    const history = await prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" }
    });

    res.json(history);

  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ error: "Failed to load history" });
  }
};
