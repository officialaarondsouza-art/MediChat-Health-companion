import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Gemini 2.5 Flash model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function getGeminiResponse(userMessage) {
  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini reply:", text);
    return text;

  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "Sorry, AI is temporarily unavailable.";
  }
}
