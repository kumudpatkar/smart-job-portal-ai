import model from "./gemini.js";

export const generatePortfolio = async (resumeText) => {
  try {
    const prompt = `
You are a professional portfolio website generator.

Using the resume below, generate ONLY valid JSON.

{
  "hero":{
    "name":"",
    "title":"",
    "tagline":""
  },
  "about":"",
  "skills":[],
  "projects":[
    {
      "title":"",
      "description":"",
      "tech":[]
    }
  ],
  "education":[],
  "experience":[],
  "contact":{
    "email":"",
    "phone":"",
    "linkedin":"",
    "github":""
  }
}

Resume:

${resumeText}
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
      hero: {},
      about: "",
      skills: [],
      projects: [],
      education: [],
      experience: [],
      contact: {},
    };
  }
};