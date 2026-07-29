import model from "./gemini.js";

export const evaluateVideoAnswer = async (
    question,
    answer
) => {

    try {

        const prompt = `
You are an experienced HR interviewer.

Interview Question:

${question}

Candidate Answer:

${answer}

Evaluate the answer.

Return ONLY JSON.

{
"technicalScore":85,
"communicationScore":80,
"confidenceScore":78,
"overallScore":81,
"strengths":[
"",
""
],
"improvements":[
"",
""
],
"feedback":""
}
`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        const cleaned = response
            .replace(/```json/g,"")
            .replace(/```/g,"")
            .trim();

        return JSON.parse(cleaned);

    } catch(error){

        console.log(error);

        return {
            technicalScore:0,
            communicationScore:0,
            confidenceScore:0,
            overallScore:0,
            strengths:[],
            improvements:[],
            feedback:"Unable to evaluate."
        };

    }

};