import model from "./gemini.js";

export const rewriteResume = async (
  resumeText,
  targetRole = "Software Engineer"
) => {
  try {

    const prompt = `
You are an expert ATS Resume Optimization AI used by professional recruiters.

Your task is to rewrite a candidate's resume for the target job role:

TARGET ROLE:
${targetRole}

Follow these strict rules:

1. Preserve all original facts.
2. Never create fake:
   - companies
   - projects
   - certifications
   - experience
   - skills
3. Improve ATS compatibility.
4. Add relevant keywords ONLY when they match existing skills or experience.
5. Rewrite weak sentences using strong action verbs.
6. Improve grammar and professional tone.
7. Make project descriptions impact-oriented.
8. Improve professional summary.
9. Organize sections in recruiter-friendly order.

Required Resume Structure:

PROFESSIONAL SUMMARY

TECHNICAL SKILLS

EXPERIENCE

PROJECTS

EDUCATION

CERTIFICATIONS

ACHIEVEMENTS

Formatting Rules:

- Plain text only.
- No markdown symbols.
- No explanations.
- No comments.
- Return ONLY the final rewritten resume.

Candidate Resume:

${resumeText}

`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const rewritten =
      response.text()?.trim() ||
      "";

    if (!rewritten) {
      throw new Error(
        "Empty response received from Gemini"
      );
    }

    return rewritten;


  } catch (error) {

    console.error(
      "Resume Rewrite AI Error:",
      error.message
    );

    throw new Error(
      "AI resume rewriting failed"
    );

  }
};