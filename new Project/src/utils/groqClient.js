import Groq from "groq-sdk";
import { CBSE_VIII_QUESTIONS, NEET_QUESTIONS } from './fallbackData';
export const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY || "YOUR_GROQ_API_KEY",
    dangerouslyAllowBrowser: true // This is needed to run groq-sdk in the browser
});

export const fetchQuestionsFromGroq = async (moduleName) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an educational assistant. Generate exactly 20 important study questions for the specified topic. Return only a JSON array of objects, where each object has 'id' (a unique string) and 'text' (the question string). Do not include any markdown formatting, only valid JSON."
                },
                {
                    role: "user",
                    content: `Topic: ${moduleName}`
                }
            ],
            model: "llama3-8b-8192",
            temperature: 0.5,
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(response.choices[0]?.message?.content || "{}");
        // Sometimes the API might return the array directly or wrapped in a key
        const questionsArray = Array.isArray(data) ? data : data.questions || Object.values(data)[0] || [];

        if (Array.isArray(questionsArray) && questionsArray.length > 0) {
            return questionsArray.map((q, index) => ({
                id: q.id || `${moduleName}-groq-${index}`,
                text: q.text || q,
                module: moduleName
            }));
        }

        throw new Error("Failed to parse valid JSON array from Groq response.");
    } catch (error) {
        console.error("Error fetching questions from Groq:", error);

        // Fallback to real web data if API fails or is not configured
        if (moduleName === 'VIII CBSE') {
            return CBSE_VIII_QUESTIONS;
        } else if (moduleName === 'NEET') {
            return NEET_QUESTIONS;
        }

        return Array.from({ length: 20 }, (_, i) => ({
            id: `${moduleName}-fallback-${i + 1}`,
            text: `(Fallback) Sample question ${i + 1} for ${moduleName}`,
            module: moduleName
        }));
    }
};
