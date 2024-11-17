import OpenAI from "openai";
import { EXPO_OPENAI_API_KEY } from "@env";

export const openai = new OpenAI({
  apiKey: "EXPO_OPENAI_API_KEY", // Use the imported variable here
});
