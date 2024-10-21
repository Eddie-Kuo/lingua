import { openai } from "@/utils/gpt";

export const sendMessage = async (message: string) => {
  // 1. send the message to chatgpt to translate

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "" },
        { role: "user", content: "" },
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

    // const translateMessage = async (message: string, targetLanguage: string) => {
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `You are a helpful assistant that translates English to ${targetLanguage}.`
    //       },
    //       {
    //         role: "user",
    //         content: message
    //       }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 150
    //   });

    //   const translatedMessage = response.choices[0].message.content;
    //   if (!translatedMessage) {
    //     throw new Error("Failed to translate message");
    //   }

    //   return translatedMessage;
    // };

    // Note: You'll need to specify the target language when calling this function
    // const translatedMessage = await translateMessage(message, "Spanish"); // Replace "Spanish" with the desired language
    // return translatedMessage;
  } catch (error) {}

  // 2. take the translated message and send to database
};
