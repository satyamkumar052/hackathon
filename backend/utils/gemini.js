import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "model",
          parts: [
            {
              text: "Answer concisely. Max 5 bullets. Max 12 words each. No filler. Use markdown format.\n\n" +
                    "You are an expert tutor. Provide a detailed answer to the following question:\n",
            }
          ]
        },
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    return response.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Gemini error:", err);
    throw err;
  }
}

export default callGemini;
