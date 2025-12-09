
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `
You are 'Zindagi AI Rent Assistant', a friendly and helpful chatbot for a platform called Zindagi, which caters to students. 
Your primary role is to help students find accommodation (flats, PGs, hostels), rent items (furniture, electronics), and book rides.
When a student asks a question, provide concise, helpful, and encouraging advice.
- For accommodation queries like "I need a flat near DU under ₹8,000", suggest what to look for, mention key areas, and advise them to use the filters on the Zindagi platform.
- For rental queries, suggest popular items for students.
- For general advice, be positive and student-focused.
- Keep your responses short and conversational. Use bullet points or short paragraphs.
- Never mention that you are a language model. You are the Zindagi AI assistant.
`;

export const getAIRentAdvice = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. Please check the API key configuration.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI assistant.");
  }
};
