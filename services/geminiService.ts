
import { GoogleGenAI } from "@google/genai";
import { Tone } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLinkedInPost(topic: string, tone: Tone): Promise<string> {
  const prompt = `
    You are an expert LinkedIn copywriter specializing in creating engaging and professional posts that increase visibility and engagement for professionals.

    Your task is to write a compelling LinkedIn post based on the provided topic and tone.

    **Topic:**
    ${topic}

    **Tone:**
    ${tone}

    **Instructions:**
    1.  **Hook:** Start with a strong, attention-grabbing first line to stop the scroll.
    2.  **Body:** Provide value, insights, or a relatable story. Use short paragraphs (2-3 sentences max) and bullet points or numbered lists if appropriate to make the content easy to scan.
    3.  **Call-to-Action (CTA):** End with a question or a clear CTA to encourage comments and discussion.
    4.  **Hashtags:** Include 3-5 relevant, niche, and popular hashtags at the end. Do not use more than 5.
    5.  **Formatting:** Use emojis thoughtfully to add personality and break up text, but only if it fits the selected tone.
    6.  **Length:** The ideal post length is between 150 and 250 words.
    7.  **Tone Adherence:** Strictly embody the chosen tone throughout the post.
        *   **Professional:** Formal, data-driven, focus on business value and industry insights.
        *   **Casual:** Conversational, relatable, use of "I" and contractions.
        *   **Witty:** Clever, humorous, and sharp with a unique perspective.
        *   **Inspirational:** Motivational, storytelling-focused, and uplifting.
        *   **Thoughtful:** Deeper, reflective, and thought-provoking.

    Generate the LinkedIn post now. Do not include any preamble or explanation, just the post content itself.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
