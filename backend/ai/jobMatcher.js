import model from "./gemini.js";

export const matchResumeWithJob = async (resume, job) => {
  try {
    const prompt = `
You are an expert ATS (Applicant Tracking System).

Compare the candidate resume with the job description.

Return ONLY valid JSON.

Resume:

${resume}

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${job.requirements.join(", ")}
Return JSON in this format:

{
  "score": 90,
  "matchingSkills": [],
  "missingSkills": [],
  "recommendation": "",
  "confidence": "High"
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
      score: 0,
      matchingSkills: [],
      missingSkills: [],
      recommendation: "Unable to analyze resume.",
      confidence: "Low",
    };
  }
};