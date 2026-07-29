import model from "./gemini.js";

export const generateCoverLetter = async (resume, job) => {
  try {

    const prompt = `
You are a professional HR recruiter.

Write a professional cover letter.

Candidate Resume:

${resume}

Job Title:
${job.title}

Company:
${job.company?.name || "Company"}

Job Description:
${job.description}

Skills Required:
${job.skills.join(", ")}

Instructions:

- Professional
- ATS Friendly
- Around 300-400 words
- Personalized
- Do not invent fake experience

Return ONLY the cover letter.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.log(error);

    return "Unable to generate cover letter.";

  }
};