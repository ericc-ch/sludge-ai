import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: MODEL_NAME });
