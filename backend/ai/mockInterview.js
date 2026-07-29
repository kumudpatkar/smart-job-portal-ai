import model from "./gemini.js";

export const askInterviewQuestion = async (
    history,
    answer
) => {

    try {

        const prompt = `
You are an experienced technical interviewer.

Previous conversation:

${history}

Candidate Answer:

${answer}

First, evaluate the answer.

Then ask ONE next interview question.

Return ONLY JSON.

{
 "feedback":"Good explanation...",
 "score":8,
 "nextQuestion":"Explain dependency injection."
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
            feedback:"Unable to evaluate.",
            score:0,
            nextQuestion:"Tell me about yourself."
        };

    }

};