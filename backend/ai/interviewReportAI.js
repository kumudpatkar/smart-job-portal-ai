import model from "./gemini.js";

export const generateInterviewReport = async (interviewData) => {
  try {
    const prompt = `
You are an Expert Technical Interview Evaluator.

Analyze this interview.

${JSON.stringify(interviewData)}

Return ONLY valid JSON.

{
  "overallScore":90,
  "technicalScore":88,
  "communicationScore":92,
  "confidenceScore":89,
  "problemSolvingScore":90,
  "strengths":[
    "Good DSA",
    "Excellent Communication"
  ],
  "weaknesses":[
    "Needs better optimization"
  ],
  "learningResources":[
    "LeetCode",
    "System Design"
  ],
  "feedback":"Excellent interview performance."
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {

    console.log(error);

    return {
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
      problemSolvingScore: 0,
      strengths: [],
      weaknesses: [],
      learningResources: [],
      feedback: "Unable to generate report."
    };
  }
};