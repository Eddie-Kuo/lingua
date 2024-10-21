import { openai } from "@/utils/gpt";

export const sendMessage = async (message: string, targetLanguage: string) => {
  // 1. send the message to chatgpt to translate
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: `You are a native ${targetLanguage} speaker with an extensive knowledge of colloquialisms, idioms, and current slang. Your task is to translate messages into ${targetLanguage} in a way that sounds completely natural and authentic.`,
        },
        {
          role: "user",
          content: `Translate the following message into ${targetLanguage}: "${message}". 
          
          Guidelines:
          1. Feel free to completely rephrase the sentence if necessary.
          2. Use native slang, idioms, or expressions where appropriate.
          3. Adjust the tone and style to match how a native speaker would naturally express this idea.
          4. While you have the freedom to make significant changes, ensure that the core meaning and intent of the original message is preserved.
          5. If the original message contains any cultural references, adapt them to equivalent references in the target language's culture if possible.

          Your goal is to make the translation sound as if it was originally conceived and expressed by a native ${targetLanguage} speaker.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "translatedMessage",
          schema: {
            type: "object",
            properties: {
              translatedMessage: {
                description: "The translated message",
                type: "string",
              },
            },
            additionalProperties: false,
          },
        },
      },
    });

    const translatedMessage = response.choices[0].message.content;
    if (translatedMessage) {
      throw new Error("Error translating message");
    }

    return translatedMessage;
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ sendMessage ~ error:", error.message);
      throw new Error(error.message);
    }
  }
};
