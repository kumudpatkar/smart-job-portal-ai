import model from "./gemini.js";

export const predictSalary = async (
  role,
  experience,
  skills
) => {
  try {

    const prompt = `
You are an AI Salary Prediction Expert.

Predict an expected annual salary in INR.

Job Role:
${role}

Experience:
${experience} years

Skills:
${skills}

Return ONLY valid JSON.

{
  "role": "${role}",
  "experience": ${experience},
  "estimatedSalary": 1200000,
  "salaryRange": "10 LPA - 14 LPA",
  "reason": "..."
}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(error);

    return {
      role,
      experience,
      estimatedSalary: 0,
      salaryRange: "Unknown",
      reason: "Unable to predict salary."
    };

  }
};