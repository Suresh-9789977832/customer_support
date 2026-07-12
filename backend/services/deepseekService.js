// services/questionGenerator.js

import askDeepSeek from "./askDeepSeek.js";

const generateQuestions = async (skill) => {
  const prompt = `
Generate 10 multiple choice questions for ${skill}.

Return ONLY valid JSON.

Format:

[
  {
    "q":"Question",
    "options":["A","B","C","D"],
    "correct":0,
    "explain":"Explanation"
  }
]

Rules:
- 4 options
- correct must be index number (0-3)
- No markdown
- No extra text
`;

  const response = await askDeepSeek(prompt, "");

  try {
    return JSON.parse(response);
  } catch (err) {
    throw new Error("Invalid AI response");
  }
};

export default generateQuestions;