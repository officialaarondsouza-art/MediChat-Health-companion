import { getGeminiResponse } from "../services/geminiService.js";

function parseMedicalResponse(text) {
  const result = {
    condition: "",
    severity: "",
    doctor: "",
    advice: ""
  };

  const lines = text.split("\n");

  for (let line of lines) {
    line = line.trim();

    if (line.toLowerCase().startsWith("condition"))
      result.condition = line.split(":")[1]?.trim();

    else if (line.toLowerCase().startsWith("severity"))
      result.severity = line.split(":")[1]?.trim();

    else if (line.toLowerCase().startsWith("doctor"))
      result.doctor = line.split(":")[1]?.trim();

    else if (line.toLowerCase().startsWith("advice"))
      result.advice = line.split(":")[1]?.trim();
  }

  return result;
}

export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    const prompt = `
You are a medical triage assistant.

Return response STRICTLY in this format:

Condition: <condition>
Severity: Low | Medium | High
Doctor: Yes | No
Advice: <short advice>

Symptoms: ${symptoms}
`;

    const aiReply = await getGeminiResponse(prompt);

    console.log("Gemini reply:", aiReply);

    const structured = parseMedicalResponse(aiReply);

    res.json(structured);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking symptoms" });
  }
};
