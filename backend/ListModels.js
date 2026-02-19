import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function listModels() {
  try {
    const response = await ai.models.list();

    console.log("\nFULL RESPONSE:\n");
    console.log(response);

  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
