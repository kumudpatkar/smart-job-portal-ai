import model from "./gemini.js";

export const generateInterviewQuestions = async (resume, job) => {
  try {

    const prompt = `
You are an experienced technical interviewer.

Generate interview questions based on the candidate resume and job.

Resume:

${resume}

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${job.skills.join(", ")}

Return ONLY valid JSON.

{
  "technical":[
    "",
    "",
    "",
    "",
    ""
  ],
  "behavioral":[
    "",
    "",
    ""
  ],
  "hr":[
    "",
    "",
    ""
  ],
  "coding":[
    "",
    "",
    ""
  ]
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
      technical: [],
      behavioral: [],
      hr: [],
      coding: [],
    };

  }
};