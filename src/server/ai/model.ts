import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";

const genAI = new GoogleGenerativeAI(import.meta.env.API_KEY_GEMINI);

export const model = genAI.getGenerativeModel({ model: MODEL_NAME });
