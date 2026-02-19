import express from "express";
import { chatWithAI, getChatHistory } from "../controllers/chatController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, chatWithAI);
router.get("/history", authenticate, getChatHistory);

export default router;
