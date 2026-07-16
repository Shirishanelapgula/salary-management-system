import { gemini } from "../config/gemini.js";

export class GeminiService {
  async test() {
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Reply with exactly: Gemini connection successful.",
    });

    return response.text;
  }
}

export const geminiService = new GeminiService();