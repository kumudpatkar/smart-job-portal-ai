import axios from "axios";
import { PDFParse } from "pdf-parse";
import model from "./gemini.js";

// ===========================================
// Parse Resume using Gemini AI
// ===========================================
export const parseResume = async (resumeUrl) => {
  try {
    // Download PDF
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    // Extract text
    const parser = new PDFParse({
      data: Buffer.from(response.data),
    });

    const pdfData = await parser.getText();

    const extractedText = pdfData.text;

    // Gemini Prompt
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "summary":"",
  "skills":[],
  "education":[],
  "experience":[],
  "projects":[],
  "certifications":[],
  "atsScore":0,
  "missingSkills":[],
  "suggestions":[]
}

Resume:

${extractedText}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanText);

    await parser.destroy();

    return {
      extractedText,
      ...parsedData,
    };
  } catch (error) {
    console.error(error);

    return {
      extractedText: "",
      summary: "",
      skills: [],
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      atsScore: 0,
      missingSkills: [],
      suggestions: [],
    };
  }
};