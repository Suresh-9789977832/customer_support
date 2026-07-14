const askDeepSeek = async (question, context) => {
  try {
    const API_KEY = process.env.HF_TOKEN;

    if (!API_KEY) {
      throw new Error("HF_TOKEN is missing in environment variables");
    }

    const systemPrompt = `
You are a helpful AI assistant.

Answer the user's question only using the provided context.
If the answer is not available in the context, say:
"I couldn't find the answer in the uploaded document."

Context:
${context}
`;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to get response from DeepSeek"
      );
    }

    return data.choices?.[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("DeepSeek Error:", error);
    throw error;
  }
};

export default askDeepSeek;