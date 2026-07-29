import model from "./gemini.js";

export const checkATS = async (
  resumeText,
  jobRole
) => {

  try {

    const prompt = `
You are an expert ATS (Applicant Tracking System).

Analyze this resume for the role:

${jobRole}

Resume:

${resumeText}

Return ONLY valid JSON.

{
 "score":0,
 "matchingSkills":[],
 "missingSkills":[],
 "suggestions":[],
 "feedback":""
}

No markdown.
No explanation.
Only JSON.
`;

    const result =
      await model.generateContent(prompt);


    const response =
      result.response.text();


    const cleaned =
      response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    const parsed =
      JSON.parse(cleaned);


    return {

      score: parsed.score || 0,

      matchingSkills:
        parsed.matchingSkills || [],

      missingSkills:
        parsed.missingSkills || [],

      suggestions:
        parsed.suggestions || [],

      feedback:
        parsed.feedback || ""

    };


  } catch(error){

    console.log(
      "ATS Error:",
      error.message
    );


    return {

      score:0,

      matchingSkills:[],

      missingSkills:[],

      suggestions:[
        "Unable to analyze ATS score"
      ],

      feedback:
        "Gemini ATS analysis failed"

    };

  }

};