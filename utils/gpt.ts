import OpenAI from "openai";

const openaiAPIKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

console.log(openaiAPIKey);

export const openai = new OpenAI({
  apiKey: openaiAPIKey,
});
