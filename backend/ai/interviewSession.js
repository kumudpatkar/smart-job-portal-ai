import model from "./gemini.js";

export const generateNextQuestion = async (
history,
previousAnswer
)=>{

try{

const prompt=`

You are an experienced software engineering interviewer.

Conversation:

${history}

Candidate Answer:

${previousAnswer}

1. Evaluate candidate answer.

2. Ask ONE NEW interview question.

Return JSON ONLY.

{
"feedback":"",
"score":8,
"nextQuestion":""
}

`;

const result=await model.generateContent(prompt);

const response=result.response.text();

const cleaned=response
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

return JSON.parse(cleaned);

}catch(error){

console.log(error);

return{

feedback:"Unable to evaluate",

score:0,

nextQuestion:"Explain OOP."

};

}

};