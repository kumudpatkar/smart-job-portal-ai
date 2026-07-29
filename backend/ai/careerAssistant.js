import model from "./gemini.js";

export const askCareerAssistant = async (resumeText, question) => {
  try {

    const prompt = `
You are an AI Career Assistant.

Candidate Resume:

${resumeText}

User Question:

${question}

Answer in a professional, friendly and detailed way.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.log(error);

    return "Sorry, I couldn't answer your question.";

  }
};